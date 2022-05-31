import {
  getAssociatedTokenAddress,
  getAccount,
  createAssociatedTokenAccountInstruction,
  createTransferCheckedInstruction,
  TokenAccountNotFoundError,
  getMinimumBalanceForRentExemptAccount,
} from "@solana/spl-token";
import {
  Connection,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
  PublicKey,
} from "@solana/web3.js";
import { USDCMintAddress, TokensPerUSDC, DecimalsOfUSDC } from "@/utils/constants.js";

export async function getSplTokenAmount(connection, wallet_address, mint_address) {
  const ata_addr = await getAssociatedTokenAddress(mint_address, wallet_address);
  console.log(`ata addr: ${ata_addr.toString()}`);

  let amount = 0;

  try {
    const ata = await getAccount(connection, ata_addr);
    console.log(`usdc_ata: ${ata.amount}`);
    amount = ata.amount;
  } catch (e) {
    console.log(e.message);
  }

  return amount;
}

export function formatMoney(amount) {
  return Number(amount).toLocaleString(undefined, { minimumFractionDigits: 4 });
}
export function formatAmount(amount) {
  return Number(amount).toLocaleString(undefined, { minimumFractionDigits: 6 });
}

export function isValidAddress(addr) {
  return addr && addr != "" && addr.length == 44;
}
export function shortAddress(addr) {
  if (addr) {
    const s = `${addr.slice(0, 4)}....${addr.slice(-4)}`;
    return s;
  } else {
    return addr;
  }
}

export async function buildSendTransaction(token, from, to, amount) {
  const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");

  let transaction = null;
  let needNewAta = false;
  let fee = 0;

  switch (token) {
    case "SOL":
      transaction = buildSolSendTx(from, to, amount).transaction;
      break;
    case "USDC":
      const tx = await buildUsdcSendTx(from, to, amount);
      transaction = tx.transaction;
      needNewAta = tx.needNewAta;
      break;

    default:
      return {};
  }

  const blockhash = (await connection.getLatestBlockhash("finalized")).blockhash;
  transaction.recentBlockhash = blockhash;
  transaction.feePayer = new PublicKey(from);
  console.log(`recent blockhash: ${blockhash}`);

  fee += await transaction.getEstimatedFee(connection);
  console.log(`estimated fee: ${fee}`);

  // if need new ATA
  if (needNewAta) {
    const ata_fee = await getMinimumBalanceForRentExemptAccount(connection);
    console.log(`estimated ata fee: ${ata_fee}`);
    fee += ata_fee;
  }

  return { transaction, fee };
}

function buildSolSendTx(from, to, amount) {
  const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
  const transaction = new Transaction();

  transaction.add(
    SystemProgram.transfer({
      fromPubkey: new PublicKey(from),
      toPubkey: new PublicKey(to),
      lamports: amount * LAMPORTS_PER_SOL,
    })
  );

  // const result = await sendAndConfirmTransaction(connection, transaction, [keypairs]);
  return { transaction };
}
async function buildUsdcSendTx(from, to, amount) {
  const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
  const transaction = new Transaction();
  let needNewAta = false;

  const tokenAmount = Number(amount * TokensPerUSDC).toFixed(0);
  const fromKey = new PublicKey(from);
  const toKey = new PublicKey(to);
  const mint = new PublicKey(USDCMintAddress);

  const fromTokenKey = await getAssociatedTokenAddress(mint, fromKey);
  const toTokenKey = await getAssociatedTokenAddress(mint, toKey);

  try {
    const fromTokenAccount = await getAccount(connection, fromTokenKey);
    const from_balance = fromTokenAccount.amount;
    console.log(`from token account balance: ${from_balance}`);

    if (from_balance < tokenAmount) {
      console.log("from balance not enough");
      return false;
    }
  } catch (e) {
    console.log(`get from account error: ${e.message} `);
    return false;
  }

  try {
    const toTokenAcount = await getAccount(connection, toTokenKey);
    console.log(`toTokenAccount: ${toTokenAcount}`);
  } catch (e) {
    if (e instanceof TokenAccountNotFoundError) {
      console.log(`need create ata: ${toTokenKey}`);
      // create associated token account
      transaction.add(createAssociatedTokenAccountInstruction(fromKey, toTokenKey, toKey, mint));
      needNewAta = true;
    } else {
      console.log(`get to account error: ${e.message} `);
      return false;
    }
  }

  transaction.add(
    createTransferCheckedInstruction(fromTokenKey, mint, toTokenKey, fromKey, tokenAmount, DecimalsOfUSDC)
  );

  console.log(`prepare to send transaction`);
  // const result = await sendAndConfirmTransaction(connection, transaction, [keypairs]);
  return { transaction, needNewAta };
}
