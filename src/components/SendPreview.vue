<script setup>
import { shortAddress, formatAmount } from '@/utils';
import { buildSendTransaction } from '@/utils';
import { usePhraseStore } from '@/store';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

const store = usePhraseStore();
const props = defineProps(["token", "amount", "recipient"]);
const estimated_fee = ref(0.0);

watchEffect(async () => {
  const { fee } = await buildSendTransaction(props.token, store.publicKey, props.recipient, props.amount);
  console.log(`estimated tx fee: ${fee}`);
  estimated_fee.value = fee / LAMPORTS_PER_SOL;
});

</script>
<template>
  <div class="send-prereview">
    <div class="review-item">
      <div class="review-item__desc">Sending Amount</div>
      <div class="review-item__content">{{ props.amount }} {{ props.token }}</div>
    </div>
    <div class="review-item">
      <div class="review-item__desc">Estimated Fee</div>
      <div class="review-item__content">{{ formatAmount(estimated_fee) }} SOL</div>
    </div>
    <div class="review-item">
      <div class="review-item__desc">Recipient Address</div>
      <div class="address review-item__content">{{ shortAddress(props.recipient) }}</div>
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