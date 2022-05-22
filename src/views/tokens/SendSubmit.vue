<script setup>
const props = defineProps(["token", "amount", "recipient"])
const sending = ref(false);

const sendTx = async (event) => {
  sending.value = true;

  let result;

  switch (token.value) {
    case "SOL":
      result = await sendSol(store.publicKey, recipient.value, amount.value, keypairs);
      break;
    case "USDC":
      result = await sendUSDC(store.publicKey, recipient.value, amount.value, keypairs);
      break;
    default:
      console.log("Laag Wallet doesn't support this token");
  }

  if (result) {
    sending.value = false;
    console.log("sending tx success");
  } else {
    sending.value = false;
    console.log("sending tx error");
  }
};
</script>

<template>
  <div>reci: {{ props.recipient }}</div>
</template>

<style scoped lang="scss">
</style>