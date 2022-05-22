<script setup>
import { useStorageStore } from '@/composables'
import { PublicKey, clusterApiUrl, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { USDCMintAddress, PresetTokenList, getSplTokenAmount, formatMoney, formatAmount } from '@/utils';
import { useAmountStore } from '@/store.js';

const amountStore = useAmountStore();
const { store } = useStorageStore();
const pubkey = new PublicKey(store.publicKey);
const usdc_mint = new PublicKey(USDCMintAddress);
console.log(`pubkey: ${pubkey}`);

//TODO: get&set token price
const tokens = reactive(PresetTokenList);
const assets_total = computed(() => tokens.reduce((sum, token) => sum + token.total, 0));

const view_activity_url = `https://solscan.io/account/${store.publicKey}`;

onMounted(() => {
  let connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');

  tokens.forEach(async function (token) {
    switch (token.symbol) {
      case 'SOL':
        // get sol amount
        const lamports = await connection.getBalance(pubkey)
        token.amount = lamports / LAMPORTS_PER_SOL;
        token.price = 56.30;
        token.total = Number(token.amount) * Number(token.price);

        // TODO: set store

        break;

      case 'USDC':
        // get usdc amount
        const token_amount = await getSplTokenAmount(connection, pubkey, usdc_mint);
        token.amount = Number(token_amount) / 1e6;
        token.price = 1.0001;
        token.total = Number(token.amount) * Number(token.price);
        break;
    }

    amountStore.setTokenAmount(token.symbol, token.amount);
  });
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
    <div v-for="token in tokens" class="tokens__item token" :key="token.symbol">
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