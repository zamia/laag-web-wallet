<script setup>
/*
import { useStorageStore } from '@/composables';
import { Connection, PublicKey } from '@solana/web3.js';
import { getOrca, OrcaPoolConfig } from '@orca-so/sdk';

const store = useStorageStore();
const keypair = store.keypairs;
const pubkey = new PublicKey(store.publicKey);

const connection = new Connection(clusterApiUrl('mainnet-beta'), "singleGossip");
const orca = getOrca(connection);

// test swap 0.1 sol for USDC
try {
  const orcaPool = orca.getPool(OrcaPoolConfig.SOL_USDC);
  const solToken = orcaPool.getTokenA();
  const solAmount = new Decimal(0.1);
  const quote = await orcaPool.getQuote(solToken, solAmount);
  const usdcAmount = quote.getMinOutputAmount();
  console.log(`usdc amount minimum output: ${usdcAmount.toNumber()}`);

  const swapPayload = await orcaPool.swap(keypair, solToken, solAmount, usdcAmount);
  const swapTxId = await swapPayload.execute();
  console.log(`swap tx id: ${swapTxId}`);
} catch (e) {
  console.log(`error found: ${e.message}`);
}
*/
</script>
<template>

</template>
<style scoped lang="scss">
</style>