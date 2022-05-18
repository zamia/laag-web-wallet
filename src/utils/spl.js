import { getAssociatedTokenAddress, getAccount } from "@solana/spl-token";

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
