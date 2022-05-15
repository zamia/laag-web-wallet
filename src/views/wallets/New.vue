<script setup>
import { Button, Icon } from 'vant'
import Header from '@/components/Header.vue'
import Title from '@/components/Title.vue'
import { ref, onMounted } from 'vue';
import * as bip39 from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english';
import { usePhraseStore } from '@/store.js'

const store = usePhraseStore()

onMounted(() => {
  if (!store.phrase || store.phrase == "") {
    store.phrase = bip39.generateMnemonic(wordlist);
    console.log(`phrase: ${store.phrase}`);
  }
})

</script>

<template>
  <Header>Create New Wallet</Header>
  <Title title="Writedown Recovery Phrase">
    Recovery phrase is your backup of your wallet
  </Title>

  <div class="phrase">
    Write down your recovery phrase:
    <div class="phrase__content">
      {{ store.phrase }}
    </div>
    <div class="phrase__cmd">
      <Icon name="records"></Icon> <span>Copy</span>
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

  <div class="commands">
    <Button type="primary" block to="/wallets/verify">Continue</Button>
  </div>
</template>

<style scoped lang="scss">
.phrase {
  .phrase__content {
    margin: 1rem 0 1rem;
    border: 1px solid $color-gray;
    background-color: $color-light;
    padding: 2rem;
  }

  .phrase__cmd {
    text-align: right;
  }
}

.note {
  margin-bottom: 1rem;

  &.note--first {
    margin-top: 5rem;
  }

  &.note--last {
    margin-bottom: 5rem;
  }

  .note__title {
    color: $color-black;
  }

  .note__desc {
    color: $color-gray;
  }
}
</style>