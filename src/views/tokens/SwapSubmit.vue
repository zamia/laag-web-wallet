<script setup>
import { useStorageStore } from '@/composables'
import { OrcaSwap } from '@/models'
import SwapPreview from '@/components/SwapPreview.vue'

const props = defineProps(["fromToken", "toToken", "swapAmount"])
const { fromToken, toToken, swapAmount } = props;

const { store } = useStorageStore();
const keypairs = store.keypairs;

const enableTx = true;
const txId = ref("");
const txUrl = computed(() => `https://solscan.io/tx/${txId.value}`);

const sendingStatus = ref("loading");
const loading = computed(() => sendingStatus.value == "loading");
const sendingSuccess = computed(() => sendingStatus.value == "success");
const sendingError = computed(() => sendingStatus.value == "error");

const swapTx = async () => {
  try {
    const orca = new OrcaSwap(fromToken, toToken);
    const result = await orca.swapToken(swapAmount, keypairs);
    sendingStatus.value = 'success'
    return result;
  } catch (e) {
    console.log(`swap error: ${e.message}`);
    sendingStatus.value = 'error'
    return null;
  }
};

onMounted(async () => {
  if (enableTx) {
    const result = await swapTx();
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
  <div v-if="loading" class="swap-info">
    <VanLoading type="spinner" size="64" class="swap-info__icon"></VanLoading>
    <div class="swap-info__desc"> Sending transaction ... </div>
  </div>
  <div v-if="sendingSuccess" class="swap-info">
    <VanIcon name="passed" size="64" class="swap-info__icon"></VanIcon>
    <div class="swap-info__desc"> Send Transaction Success! </div>
  </div>
  <div v-if="sendingError" class="swap-info">
    <VanIcon name="fail" size="64" class="swap-info__icon"></VanIcon>
    <div class="swap-info__desc"> Error Happening, please try again... </div>
  </div>

  <div class="preview">
    <SwapPreview :fromToken="fromToken" :toToken="toToken" :amount="swapAmount"></SwapPreview>
  </div>

  <div class="cmds">
    <VanButton block tag="a" :href="txUrl" :disabled="loading" class="cmds__item" target="_blank">View Transaction
    </VanButton>
    <VanButton block to="/tokens" :disabled="loading" class="cmds__item">Goto Homepage</VanButton>
  </div>

</template>

<style scoped lang="scss">
.swap-info {
  text-align: center;
  margin: 3rem auto 4rem;

  .swap-info__icon {
    margin-bottom: 2rem;
    color: $color-main;
  }

  .swap-info__desc {
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
