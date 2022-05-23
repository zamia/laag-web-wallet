<script setup>
import { useStorageStore } from '@/composables'
import { sendSol, sendUSDC } from '@/utils'

const props = defineProps(["token", "amount", "recipient"])
const { token, amount, recipient } = props;

const { store } = useStorageStore();
const keypairs = store.keypairs;

const enableTx = true;
const sendingStatus = ref("loading");
const txId = ref("");
const sendTxUrl = computed(() => `https://solscan.io/tx/${txId.value}`);


const loading = computed(() => sendingStatus.value == "loading");
const sendingSuccess = computed(() => sendingStatus.value == "success");
const sendingError = computed(() => sendingStatus.value == "error");

const sendTx = async () => {
  let result;

  switch (token) {
    case "SOL":
      result = await sendSol(store.publicKey, recipient, amount, keypairs);
      break;
    case "USDC":
      result = await sendUSDC(store.publicKey, recipient, amount, keypairs);
      break;
    default:
      console.log("Laag Wallet doesn't support this token");
  }

  return result;
};

onMounted(async () => {
  if (enableTx) {
    const result = await sendTx();
    if (result) {
      sendingStatus.value = 'success';
      txId.value = result.toString();
      console.log(`sending tx success, result: ${result}`);
    } else {
      sendingStatus.value = 'error';
      console.log("sending tx error");
    }
  }
})
</script>

<template>
  <Header>Send Token</Header>
  <div v-if="loading" class="send-info">
    <VanLoading type="spinner" size="64" class="send-info__icon"></VanLoading>
    <div class="send-info__desc"> Sending transaction ... </div>
  </div>
  <div v-if="sendingSuccess" class="send-info">
    <VanIcon name="passed" size="64" class="send-info__icon"></VanIcon>
    <div class="send-info__desc"> Send Transaction Success! </div>
  </div>
  <div v-if="sendingError" class="send-info">
    <VanIcon name="fail" size="64" class="send-info__icon"></VanIcon>
    <div class="send-info__desc"> Error Happening, please try again... </div>
  </div>

  <div class="preview">
    <SendPreview :token="token" :amount="amount" :recipient="recipient"></SendPreview>
  </div>

  <div class="cmds">
    <VanButton block tag="a" :href="sendTxUrl" :disabled="loading" class="cmds__item" target="_blank">View Transaction
    </VanButton>
    <VanButton block to="/tokens" :disabled="loading" class="cmds__item">Goto Homepage</VanButton>
  </div>

</template>

<style scoped lang="scss">
.send-info {
  text-align: center;
  margin: 3rem auto 4rem;

  .send-info__icon {
    margin-bottom: 2rem;
    color: $color-main;
  }

  .send-info__desc {
    color: $color-gray;
  }

}

.cmds {
  margin-top: 5rem;
  text-align: center;

  .cmds__item {
    border: 0;
    height: 2.5rem;
    color: $color-main;
  }
}
</style>