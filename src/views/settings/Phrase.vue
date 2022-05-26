<script setup>
import { usePhraseStore } from '@/store.js'
import CopyLink from '@/components/CopyLink.vue'

const store = usePhraseStore();
const coveredPhrase = store.phrase.replaceAll(/\S/ig, '*');
const showPhrase = ref(coveredPhrase);

const onMouseDown = () => {
  showPhrase.value = store.phrase;
}
const onMouseUp = () => {
  showPhrase.value = coveredPhrase;
}
</script>

<template>
  <Header></Header>
  <Title title="Your Recovery Phrase">
    Recovery phrase is your backup of your wallet
  </Title>

  <div class="phrase">
    Your recovery phrase:
    <div class="phrase__content"> {{ showPhrase }} </div>
    <CopyLink :value="store.phrase" class="phrase__cmd"></CopyLink>

    <div>
      <VanButton class="phrase__commands" type="primary" round @mousedown="onMouseDown" @mouseup="onMouseUp"
        @touchstart="onMouseDown" @touchend="onMouseUp" @mouseleave="onMouseUp">Hold to Show</VanButton>
    </div>
  </div>

  <div class="note note--first">
    <div class="note__title">Write down your recovery phrase.</div>
    <div class="note__desc">
      your recovery phrase is your backup of your wallet, if you lose your recovery phrase, you maybe lost your
      access to your wallet.
    </div>
  </div>
  <div class="note note--last">
    <div class="note__title">Never show recovery phrase to anyone.</div>
    <div class="note__desc">
      Anybody could access your wallet with your recovery phrase.
    </div>
  </div>

</template>

<style scoped lang="scss">
.phrase {
  text-align: center;

  .phrase__content {
    margin: 1rem 0 1rem;
    background-color: $bg-light;
    border: 1px solid $bg-light;
    border-radius: 1rem;
    padding: 2rem;
  }

  .phrase__cmd {
    color: $color-main;
  }

  .phrase__commands {
    margin-top: 2rem;
    min-width: 10rem;
  }
}

.note {
  margin-bottom: 1rem;
  font-size: 0.8rem;
  line-height: 1.2rem;

  &.note--first {
    margin-top: 3rem;
  }

  &.note--last {
    margin-bottom: 3rem;
  }

  .note__title {
    color: $color-warn;
  }

  .note__desc {
    color: $color-gray;
  }
}
</style>