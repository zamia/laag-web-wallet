<script setup>
import { shortAddress, sendSol, sendUSDC } from '@/utils';
import { useStorageStore } from '@/composables';

const router = useRouter();

const props = defineProps(["token", "amount", "recipient"]);
const token = props["token"];
const amount = props["amount"];
const recipient = props["recipient"];
const fee = ref(0.00005);


const { store } = useStorageStore();
const keypairs = store.keypairs;

const sending = ref(false);

const sendTx = async (event) => {
  sending.value = true;

  let result;

  switch (token) {
    case "SOL":
      result = await sendSol(store.publicKey, recipient, amount, keypairs);
      console.log(result);
      break;
    case "USDC":
      result = await sendUSDC(store.publicKey, recipient, amount, keypairs);
      console.log(result);
      break;
    default:
      console.log("Laag Wallet doesn't support this token");
  }

  if (result) {
    sending.value = false;
    router.push("/tokens/send/sucess");
  } else {
    sending.value = false;
    console.log("sending tx error");
  }
};
</script>
<template>
  <Header>Send Token</Header>
  <Title title="Review Transaction">Review Transaction Detail Information</Title>
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
  <div class="cmds">
    <VanButton type="primary" block @click="sendTx" :loading="sending">Send Transaction</VanButton>
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

.cmds {
  margin-top: 5rem;
}
</style>