<script setup>
import { ref, onMounted, computed } from 'vue'
import { usePhraseStore } from '@/store.js'
import { Icon } from 'vant'
import { TopNav, MainNav, IconLink } from "@/components"
import { useToken, useStorageStore } from '@/composables'
import { PublicKey, clusterApiUrl, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getAccount, getAssociatedTokenAddress } from '@solana/spl-token'
import { USDCMintAddress } from '@/utils/constants.js';

const { store } = useStorageStore();
const pubkey = new PublicKey(store.publicKey);
const usdc_pubkey = new PublicKey(USDCMintAddress);
console.log(`pubkey: ${pubkey}`);

const { amount: sol_amount, price: sol_price, total: sol_total } = useToken();
const { amount: usdc_amount, price: usdc_price, total: usdc_total } = useToken();
const assets_total = computed(() => sol_total.value + usdc_total.value);

onMounted(async () => {
  sol_price.value = 56.03;
  usdc_price.value = 1.00;

  let connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

  // get sol amount
  const lamports = await connection.getBalance(pubkey)
  sol_amount.value = lamports / LAMPORTS_PER_SOL;

  // get usdc amount
  const usdc_ata_addr = await getAssociatedTokenAddress(usdc_pubkey, pubkey);
  console.log(`usdc ata addr: ${usdc_ata_addr.toString()}`);
  const usdc_ata = await getAccount(connection, usdc_ata_addr);
  console.log(`usdc_ata: ${usdc_ata.amount}`);
  usdc_amount.value = Number(usdc_ata.amount) / 1e6;
  //handle TokenAccountNotFoundError
})

</script>

<template>
  <TopNav></TopNav>
  <div class="total">
    <div class="total__desc">Total Assets</div>
    <div class="total__amount">
      <span class="unit">$</span>{{ assets_total }}
    </div>
  </div>
  <div class="cmds">
    <IconLink href="/home" icon="share-o" text="Send" class="cmds__item" />
    <IconLink href="/home" icon="down" text="Receive" class="cmds__item" />
    <IconLink href="/home" icon="exchange" text="Swap" class="cmds__item" />
  </div>
  <div class="tokens">

  </div>
  <MainNav></MainNav>
</template>

<style scoped lang="scss">
.total {
  margin: 2rem 0;

  .total__desc {
    color: $color-gray;
    text-align: center;
  }

  .total__amount {
    span {
      font-size: 1rem;
      margin-right: 0.5rem;
    }

    font-size: 2rem;
    color: $color-main;
    text-align: center;
  }
}

.cmds {
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;

  .cmds__item {
    flex: 0 0 25%;
    max-width: 25%;
  }
}
</style>