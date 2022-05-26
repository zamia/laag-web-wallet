<script setup>
import { shortAddress } from '@/utils';

const props = defineProps(["token", "amount", "recipient"]);
const token = toRef(props, "token")
const amount = toRef(props, "amount")
const recipient = toRef(props, "recipient")
const fee = ref(0.00005);

</script>
<template>
  <div class="send-prereview">
    <div class="review-item">
      <div class="review-item__desc">Sending Amount</div>
      <div class="review-item__content">{{ amount }} {{ token }}</div>
    </div>
    <div class="review-item">
      <div class="review-item__desc">Estimated Fee</div>
      <div class="review-item__content">{{ fee }} SOL</div>
    </div>
    <div class="review-item">
      <div class="review-item__desc">Recipient Address</div>
      <div class="address review-item__content">{{ shortAddress(recipient) }}</div>
    </div>
    <div class="note">
      * network fee is estimated and charged by Solona blockchain
    </div>
  </div>
</template>
<style scoped lang="scss">
.review-item {
  display: flex;
  margin-bottom: 1rem;

  .review-item__desc {
    color: $color-gray;
    flex: 0 0 50%;
  }

  .review-item__content {
    flex: 0 0 50%;
    color: $color-main;
    text-align: right;
  }
}

.address {
  word-wrap: break-word;
}

.note {
  color: $color-gray;
  margin: 2rem 0;
}
</style>