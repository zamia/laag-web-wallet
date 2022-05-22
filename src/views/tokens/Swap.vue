<script setup>
import { useStorageStore } from '@/composables';
import { useAmountStore } from '@/store.js';
import { LaagToken } from '@/models/'

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

onMounted(async () => {

  const keypair = store.keypairs;
  console.log(`pubkey: ${keypair.publicKey}, seckey: ${keypair.secretKey}`);

})
</script>
<template>
  <Header>Swap Token</Header>
  <div class="token">
    <div class="token__desc">I have {{ fromTokenOwnedAmount }} {{ fromToken }} in Wallet></div>
    <div class="token_name">
      <img :src="LaagToken.getIcon(fromToken)" />
      <span>{{ fromToken }}</span>
    </div>
    <div class="token__amount">
      {{ swapAmount }}
    </div>
  </div>

  <div class="token">
    <div class="token__desc">I want {{ toToken }} in Wallet></div>
    <div class="token_name">
      <img :src="LaagToken.getIcon(toToken)" />
      <span>{{ toToken }}</span>
    </div>
    <div class="token__amount">
      {{ convertAmount }}
    </div>
  </div>

</template>
<style scoped lang="scss">
</style>