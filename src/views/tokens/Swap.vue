<script setup>
import { useAmountStore } from '@/store.js';
import { LaagToken } from '@/models/'
import { formatAmount, formatMoney } from '@/utils';
import SwapPreview from '@/components/SwapPreview.vue'

const amountStore = useAmountStore();

const swapPair = ref(['SOL', 'USDC']);
const swapAmount = ref(0.0);

const fromToken = computed(() => swapPair.value.at(0));
const toToken = computed(() => swapPair.value.at(1));
const fromTokenOwnedAmount = computed(() => amountStore.getTokenAmount(fromToken.value));
const convertRate = computed(() => LaagToken.getPrice(fromToken.value) / LaagToken.getPrice(toToken.value));
const convertAmount = computed(() => swapAmount.value * convertRate.value);

const isReady = computed(() => swapAmount.value > 0);

const switchToken = () => {
  swapPair.value.push(swapPair.value.shift());
}

const previewModalShowing = ref(false);

const router = useRouter();
const executeSwapTx = () => {
  router.push({
    name: "SwapSubmit",
    params: {
      fromToken: fromToken.value,
      toToken: toToken.value,
      swapAmount: swapAmount.value,
    }
  });
}

</script>
<template>
  <TopNav></TopNav>
  <div class="header">Swap Token</div>
  <div class="token token--first">
    <div class="token__desc">I have {{ fromTokenOwnedAmount }} {{ fromToken }} in Wallet</div>
    <img class="token__icon" :src="LaagToken.getIcon(fromToken)" />
    <div class="token__name">{{ fromToken }}</div>
    <div class="token__amount">
      <VanField v-model="swapAmount" type="number" name="number" input-align="right"></VanField>
      <span>$ {{ formatMoney(swapAmount * LaagToken.getPrice(fromToken)) }}</span>
    </div>
  </div>

  <div class="switch">
    <VanButton @click="switchToken()" class="switch__button">
      <VanIcon name="exchange" size="24"></VanIcon>
    </VanButton>
  </div>

  <div class="token token--last">
    <div class="token__desc">I want {{ toToken }} in Wallet</div>
    <img :src="LaagToken.getIcon(toToken)" class="token__icon" />
    <div class="token__name">{{ toToken }}</div>
    <div class="token__amount token__amount--last">
      <div>{{ formatAmount(convertAmount) }}</div>
      <div>$ {{ formatMoney(convertAmount * LaagToken.getPrice(toToken)) }}</div>
    </div>
  </div>

  <div class="cmds">
    <VanButton block type="primary" :disabled="!isReady" @click="previewModalShowing = true"> Swap Token</VanButton>
  </div>
  <ul class="notes">
    <li>Swap fee is estimated and based on our 3rd party API</li>
    <li>We swap token through 3rd party API, LaaG Wallet didn’t charge any extra fees.</li>
  </ul>

  <MainNav active="swap"></MainNav>

  <VanActionSheet v-model:show="previewModalShowing" title="Preview Swap Transaction" class="review-modal">
    <div class="review-modal__content">
      <SwapPreview :fromToken="fromToken" :toToken="toToken" :amount="swapAmount"></SwapPreview>
      <div class="review-modal__cmd">
        <VanButton type="primary" block @click="executeSwapTx()">Confirm Send</VanButton>
      </div>
    </div>
  </VanActionSheet>
</template>
<style scoped lang="scss">
.header {
  text-align: center;
  margin-top: 2rem;
  color: $color-main;
  font-size: 1.2rem;
}

.switch {
  text-align: center;

  .switch__button {
    width: 2rem;
    height: 2rem;
    padding: 1.5rem;
    border-radius: 999px;
    border: 1px solid $bg-lightest;
  }

  i {
    transform: rotate(90deg);
    color: $color-main;
  }
}

.token {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  border: 1px solid $bg-lighter;
  border-radius: 1rem;
  padding: 1rem 0.5rem;

  &.token--first {
    margin-top: 2rem;
    margin-bottom: -0.5rem;
  }

  &.token--last {
    margin-bottom: 2rem;
    margin-top: -0.5rem;
  }


  .token__desc {
    flex: 0 0 100%;
    color: $color-gray;
    margin-bottom: 0.5rem;
  }

  img.token__icon {
    flex: initial;
    width: 3rem;
    height: 3rem;
  }

  .token__name {
    flex: initial;
    line-height: 3rem;
    margin-left: 1rem;
  }

  .token__amount {
    flex: 1 1 40%;
    margin-left: 1rem;
    text-align: right;

    >span {
      line-height: 2rem;
      padding-right: 2rem;
    }

    &.token__amount--last {
      padding-right: 1rem;
    }

    .van-field {
      border-radius: 999px;
      padding-right: 2rem;
    }
  }
}

.cmds {
  margin-top: 2rem;
}

ul.notes {
  margin-top: 2rem;
  color: $color-gray;
  padding-left: 1rem;
  line-height: 1.2rem;
  font-size: 0.8rem;

  li {
    list-style-type: disc;
  }
}

.review-modal {
  .review-modal__content {
    padding: 2rem;
  }
}
</style>