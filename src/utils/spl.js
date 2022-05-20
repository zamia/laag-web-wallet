import {
  getAssociatedTokenAddress,
  getAccount,
  createAssociatedTokenAccountInstruction,
  createTransferCheckedInstruction,
  TokenAccountNotFoundError,
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
import {
  USDCMintAddress,
  TokensPerUSDC,
  DecimalsOfUSDC,
} from "@/utils/constants.js";

export async function getSplTokenAmount(
  connection,
  wallet_address,
  mint_address
) {
  const ata_addr = await getAssociatedTokenAddress(
    mint_address,
    wallet_address
  );
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

export async function sendSol(from, to, amount, keypairs) {
  const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
  const transaction = new Transaction();
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: new PublicKey(from),
      toPubkey: new PublicKey(to),
      lamports: amount * LAMPORTS_PER_SOL,
    })
  );
  const result = await sendAndConfirmTransaction(connection, transaction, [
    keypairs,
  ]);
  console.log(result);
  return result;
}

export async function sendUSDC(from, to, amount, keypairs) {
  const tokenAmount = amount * TokensPerUSDC;
  const fromKey = new PublicKey(from);
  const toKey = new PublicKey(to);
  const mint = new PublicKey(USDCMintAddress);

  const fromTokenKey = await getAssociatedTokenAddress(mint, fromKey);
  const toTokenKey = await getAssociatedTokenAddress(mint, toKey);

  const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
  const transaction = new Transaction();

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
      transaction.add(
        createAssociatedTokenAccountInstruction(
          fromKey,
          toTokenKey,
          toKey,
          mint
        )
      );
    } else {
      console.log(`get to account error: ${e.message} `);
      return false;
    }
  }

  transaction.add(
    createTransferCheckedInstruction(
      fromTokenKey,
      mint,
      toTokenKey,
      fromKey,
      tokenAmount,
      DecimalsOfUSDC
    )
  );

  console.log(`prepare to send transaction`);
  const result = await sendAndConfirmTransaction(connection, transaction, [
    keypairs,
  ]);

  console.log(result);

  return result;
}
