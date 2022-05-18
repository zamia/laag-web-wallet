<script setup>
import { ref, onMounted, computed } from 'vue'
import { Icon } from 'vant'
import { TopNav, MainNav, IconLink } from "@/components"
import { useToken, useStorageStore } from '@/composables'
import { PublicKey, clusterApiUrl, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { USDCMintAddress, getSplTokenAmount, formatMoney, formatAmount } from '@/utils';

import IconSol from '@/assets/icon-sol.png'
import IconUsdc from '@/assets/icon-usdc.png'

const { store } = useStorageStore();
const pubkey = new PublicKey(store.publicKey);
const usdc_mint = new PublicKey(USDCMintAddress);
console.log(`pubkey: ${pubkey}`);

const { amount: sol_amount, price: sol_price, total: sol_total } = useToken();
const { amount: usdc_amount, price: usdc_price, total: usdc_total } = useToken();
const assets_total = computed(() => sol_total.value + usdc_total.value);

const view_activity_url = `https://solscan.io/account/${store.publicKey}`;

const tokens = ref([
  {
    symbol: 'SOL',
    name: 'Solana',
    icon: IconSol,
    amount: sol_amount,
    total: sol_total,
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    icon: IconUsdc,
    amount: usdc_amount,
    total: usdc_total,
  }
])

onMounted(async () => {
  //get sol price
  sol_price.value = 56.03;

  // get usdc price
  usdc_price.value = 1.00;

  let connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

  // get sol amount
  const lamports = await connection.getBalance(pubkey)
  tokens.value[0].amount = lamports / LAMPORTS_PER_SOL;

  // get usdc amount
  const amount = await getSplTokenAmount(connection, pubkey, usdc_mint);
  tokens.value[1].amount = Number(amount) / 1e6;
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
    <IconLink href="/home" icon="share-o" text="Send" class="cmds__item" />
    <IconLink href="/home" icon="down" text="Receive" class="cmds__item" />
    <IconLink href="/home" icon="exchange" text="Swap" class="cmds__item" />
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
        <span class="money">$ {{ formatMoney(token.total) }}</span>
        <span>{{ formatAmount(token.amount) }}</span>
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