<script setup>
import { ref, onMounted, computed } from 'vue'
import { useToken, useStorageStore } from '@/composables'
import { PublicKey, clusterApiUrl, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { USDCMintAddress, getSplTokenAmount, formatMoney, formatAmount } from '@/utils';
import { TopNav, MainNav, IconLink } from '@/components';

import IconSol from '@/assets/icon-sol.png'
import IconUsdc from '@/assets/icon-usdc.png'

const { store } = useStorageStore();
const pubkey = new PublicKey(store.publicKey);
const usdc_mint = new PublicKey(USDCMintAddress);
console.log(`pubkey: ${pubkey}`);

const sol_token = useToken('SOL', "Solana", IconSol);
const usdc_token = useToken('USDC', "USD Coin", IconUsdc);
const tokens = [sol_token, usdc_token];
const assets_total = computed(() => sol_token.total.value + usdc_token.total.value);

const view_activity_url = `https://solscan.io/account/${store.publicKey}`;

onMounted(async () => {
  //get&set token price
  sol_token.price.value = 56.03;
  usdc_token.price.value = 1.00;

  let connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

  // get sol amount
  const lamports = await connection.getBalance(pubkey)
  sol_token.amount.value = lamports / LAMPORTS_PER_SOL;

  // get usdc amount
  const amount = await getSplTokenAmount(connection, pubkey, usdc_mint);
  usdc_token.amount.value = Number(amount) / 1e6;
})

</script>

<template>
  <TopNav></TopNav>
  <div class="total">
    <div class="total__desc">Total Assets</div>
    <div class="total__amount">
      <span class="unit">$</span>{{ formatMoney(assets_total) }}
    </div>
  </div>
  <div class="cmds">
    <IconLink href="/tokens/send" icon="share-o" text="Send" class="cmds__item" />
    <IconLink href="/tokens/receive" icon="down" text="Receive" class="cmds__item" />
    <IconLink href="/tokens/swap" icon="exchange" text="Swap" class="cmds__item" />
  </div>
  <div class="tokens">
    <div class="tokens__title">Token List</div>
    <div v-for="token in tokens" class="tokens__item token" :id="token.symbol">
      <div class="token__icon">
        <img :src="token.icon" :title="token.name" />
      </div>
      <div class="token__name">
        <span class="symbol">{{ token.symbol }}</span>
        <span>{{ token.name }}</span>
      </div>
      <div class="token__value">
        <span class="money">$ {{ formatMoney(token.total.value) }}</span>
        <span>{{ formatAmount(token.amount.value) }}</span>
      </div>
    </div>
  </div>
  <div class="activity">
    <a :href="view_activity_url" target="_blank">View Activity</a>
  </div>
  <MainNav></MainNav>
</template>

<style scoped lang="scss">
.tokens {
  margin-top: 5rem;

  .tokens__title {
    font-size: 1.2rem;
    color: $color-main;
  }

  .tokens__item {
    margin: 1rem 0;
  }
}

.token {
  display: flex;

  img {
    width: 3rem;
    height: 3rem;
  }

  .token__icon {
    flex: 0 0 20%;
  }

  .token__name {
    flex: 0 0 30%;

    >span {
      display: block;
      text-align: left;
    }
  }

  .token__value {
    flex: 0 0 45%;

    >span {
      display: block;
      text-align: right;
    }
  }
}

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

.activity {
  color: $color-main;
  margin-top: 5rem;
  text-align: center;
}

.symbol {
  font-size: 1.2rem;
}

.money {
  color: $color-main;
  font-size: 1.2rem;
}
</style>