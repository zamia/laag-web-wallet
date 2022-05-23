<script setup>
import { LaagToken } from '@/models'
import { formatAmount } from '@/utils';

const props = defineProps(["fromToken", "toToken", "amount"]);
const fromToken = toRef(props, "fromToken")
const toToken = toRef(props, "toToken")
const amount = toRef(props, "amount")

const convertRate = computed(() => LaagToken.getPrice(fromToken.value) / LaagToken.getPrice(toToken.value));
const convertAmount = computed(() => amount.value * convertRate.value);

</script>
<template>
  <div class="swap-review">
    <Title title="Review Swap Transaction">review swap transaction detail info</Title>
    <div class="review-item">
      <div class="review-item__desc">Exchanging</div>
      <div class="review-item__content">{{ formatAmount(amount) }} {{ fromToken }}</div>
    </div>
    <div class="review-item">
      <div class="review-item__desc">Receiving</div>
      <div class="review-item__content">{{ formatAmount(convertAmount) }} {{ toToken }}</div>
    </div>
    <hr />
    <div class="review-item">
      <div class="review-item__desc">Convert Rate</div>
      <div class="review-item__content"> 1 {{ fromToken }} = {{ formatAmount(convertRate) }} {{ toToken }}</div>
    </div>
    <div class="review-item">
      <div class="review-item__desc">Estimated Fee</div>
      <div class="review-item__content">0.000005 SOL</div>
    </div>
    <div class="note">
      * network fee is estimated and charged by Solona blockchain
    </div>
  </div>
</template>
<style scoped lang="scss">
.swap-review {
  hr {
    margin: 1rem 0;
  }
}

.review-item {
  display: flex;
  margin-bottom: 1rem;

  .review-item__desc {
    color: $color-gray;
    flex: 0 0 40%;
  }

  .review-item__content {
    flex: 0 0 60%;
    color: $color-main;
    text-align: right;
  }
}

.note {
  color: $color-gray;
  margin: 2rem 0;
}
</style>