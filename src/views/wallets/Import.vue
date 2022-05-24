<script setup>
import { ref, computed } from 'vue'
import { LaagWallet } from '@/models'
import { usePhraseStore } from '@/store.js'
import { useRouter } from 'vue-router'
import { Field, Button } from 'vant'
import PasteLink from '@/components/PasteLink.vue'

const router = useRouter();

const store = usePhraseStore();
let phrase = ref("");

let ready = computed(() => {
  return LaagWallet.isValidPhrase(phrase.value);
});

const importPhrase = async () => {
  console.log(`prepare to importPhrase`);
  store.phrase = phrase.value;
  router.push("/wallets/done");
}
</script>

<template>
  <Header>Import Existing Wallet</Header>

  <div class="phrase">
    Please enter your recovery phrase:
    <div class="phrase__content">
      <Field v-model="phrase" type="textarea" name="phrase" rows="5" autofocus autoresize class="phrase-input"
        placeholder="please enter your recovery phrase">
      </Field>
    </div>
    <div class="phrase__cmd">
      <PasteLink v-model="phrase"></PasteLink>
    </div>

    <div class="import">
      <Button type="primary" block :disabled="!ready" class="import__button" @click="importPhrase">Import</Button>
    </div>
  </div>


</template>

<style scoped lang="scss">
.phrase-input {
  border: 1px solid $bg-light;

  &.van-field {
    border-radius: 1rem;
  }

  textarea {
    padding: 1rem;
  }
}

.phrase {
  margin-top: 3rem;

  .phrase__content {
    margin-top: 1rem;
  }

  .phrase__cmd {
    text-align: center;
    margin-top: 1rem;
    color: $color-main;
  }
}

.import {
  text-align: center;
  margin-top: 4rem;
}
</style>