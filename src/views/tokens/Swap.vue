<script setup>
import { useStorageStore } from '@/composables';
import { useAmountStore } from '@/store.js';
import { LaagToken } from '@/models/'
import { formatAmount, formatMoney } from '@/utils';
import SwapPreview from '@/components/SwapPreview.vue'

const amountStore = useAmountStore();
const { store } = useStorageStore();
console.log(store);

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
  <Header>Swap Token</Header>
  <div class="token">
    <div class="token__desc">I have {{ fromTokenOwnedAmount }} {{ fromToken }} in Wallet</div>
    <img class="token__icon" :src="LaagToken.getIcon(fromToken)" />
    <div class="token__name">{{ fromToken }}</div>
    <div class="token__amount">
      <VanField v-model="swapAmount" type="number" name="number" input-align="right"></VanField>
      <span>$ {{ formatMoney(swapAmount * LaagToken.getPrice(fromToken)) }}</span>
    </div>
  </div>

  <div class="switch">
    <VanButton @click="switchToken()">
      <VanIcon name="exchange" size="32"></VanIcon>
    </VanButton>
  </div>

  <div class="token">
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
.switch {
  margin-top: 2rem;
  text-align: center;

  i {
    transform: rotate(90deg);
    color: $color-main;
  }
}

.token {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 2rem;

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
    flex: auto;
    text-align: right;

    >span {
      padding-right: 1rem;
    }

    &.token__amount--last {
      padding-right: 1rem;
    }
  }
}

.cmds {
  margin-top: 5rem;
}

ul.notes {
  margin-top: 2rem;
  color: $color-gray;
  padding-left: 1rem;

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