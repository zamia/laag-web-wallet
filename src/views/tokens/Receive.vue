<script setup>
import { PresetTokenList } from '@/utils'
import { useStorageStore } from '@/composables'
import VueQrcode from '@chenfengyuan/vue-qrcode';

const tokenSelectedIndex = ref(0);
const tokenSelected = computed(() => PresetTokenList.at(tokenSelectedIndex.value))
const { store } = useStorageStore();

</script>
<template>
  <Header>Receive Token</Header>
  <div class="receive">
    <div class="token">
      <TokenSelect v-model="tokenSelectedIndex"></TokenSelect>
    </div>
    <div class="address">
      <span>Your Wallet Address for {{ tokenSelected.symbol }}</span>
      <div class="address__qrcode">
        <VueQrcode :value="store.publicKey" :options="{ width: 200 }"></VueQrcode>
      </div>
      <div class="address__input">
        {{ store.publicKey }}
      </div>
      <CopyLink :value="store.publicKey" class="address__cmd"></CopyLink>
    </div>
    <VanButton class="share">
      <VanIcon name="share"></VanIcon>
      <span>Share</span>
    </VanButton>
  </div>
</template>
<style scoped lang="scss">
.receive {
  text-align: center
}

.token {
  margin-top: 2rem;
}

.address {
  margin-top: 2rem;

  >span {
    color: $text-default;
  }

  .address__qrcode canvas {
    margin-top: 1rem;
    border: 1px solid $bg-light;
    background-color: $bg-light;
    border-radius: 1rem;
  }

  .address__input {
    margin-top: 1rem;
    word-wrap: break-word;
    background-color: $bg-light;
    padding: 1rem;
    border: 2px solid $bg-light;
    border-radius: 1rem;
  }

  .address__cmd {
    margin-top: 1rem;
    color: $color-main;
  }
}

.share {
  margin-top: 3rem;
  color: $color-main;
  min-width: 10rem;

  span {
    margin-left: .5rem;
  }
}
</style>