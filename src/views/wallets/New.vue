<script setup>
import * as bip39 from 'bip39'
import { usePhraseStore } from '@/store.js'
import PhraseCard from '@/components/PhraseCard.vue'

const store = usePhraseStore()
const phraseArray = computed(() => store.phrase.split(' '))

onMounted(() => {
  if (!store.phrase || store.phrase == "") {
    store.phrase = bip39.generateMnemonic();
    console.log(`phrase: ${store.phrase}`);
  }
})
</script>

<template>
  <Header>Create New Wallet</Header>
  <Title title="Writedown Recovery Phrase">
    Recovery phrase is the backup of wallet
  </Title>

  <div class="phrase">
    <div class="phrase__content">
      <PhraseCard :phraseArray="phraseArray"></PhraseCard>
    </div>
    <CopyLink :value="store.phrase" class="phrase__cmd"></CopyLink>
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

  <div class="commands">
    <VanButton type="primary" round block to="/wallets/verify">Continue</VanButton>
  </div>
</template>

<style scoped lang="scss">
.phrase {
  .phrase__content {
    margin: 1rem 0 1rem;
    border: 1px solid $bg-light;
    background-color: $bg-light;
    border-radius: 1rem;
  }

  .phrase__cmd {
    color: $color-main;
  }
}

.note {
  margin-bottom: 1rem;

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