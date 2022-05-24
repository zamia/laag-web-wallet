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
      <div>Receiving</div>
      <TokenSelect v-model="tokenSelectedIndex"></TokenSelect>
    </div>
    <div class="address">
      <div>Your Wallet Address for {{ tokenSelected.symbol }}</div>
      <div class="address__qrcode">
        <VueQrcode :value="store.publicKey" :options="{ width: 200 }"></VueQrcode>
      </div>
      <div class="address__input">
        {{ store.publicKey }}
      </div>
      <CopyLink :value="store.publicKey" class="address__cmd"></CopyLink>
    </div>
    <div class="share">
      <VanIcon name="share"></VanIcon>
      <span>Share</span>
    </div>
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

  .address__qrcode canvas {
    margin-top: 1rem;
    border: 2px solid $color-light;
  }

  .address__input {
    margin-top: 1rem;
    word-wrap: break-word;
    background-color: $color-light;
    padding: 1rem;
    border: 2px solid $color-light;
  }

  .address__cmd {
    display: block;
    margin-top: 1rem;
    color: $color-main;
  }
}

.share {
  margin-top: 3rem;
  color: $color-main;

  span {
    margin-left: .5rem;
  }
}
</style>