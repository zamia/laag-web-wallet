<script setup>
import Header from '@/components/Header.vue';
import Title from '@/components/Title.vue'
import { Button, Field } from 'vant'
import { ref } from 'vue'

let phrase = ref("");
</script>

<template>
  <Header>Import Existing Wallet</Header>

  <div class="phrase">
    Please enter your recovery phrase:
    <div class="phrase__content">
      <Field v-model="phrase" type="textarea" name="phrase" rows="5" autoresize class="phrase-input"
        placeholder="please enter your recovery phrase">
      </Field>
    </div>
    <div class="phrase__cmd">
      <a class='link-cmd'>tap to paste</a>
    </div>

    <div class="import">
      <Button type="primary" block class="import__button">Import</Button>
    </div>
  </div>


</template>

<style scoped lang="scss">
.phrase-input {
  border: 1px solid $color-light;

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
    margin-top: 0.5rem;
  }
}

.import {
  text-align: center;
  margin-top: 4rem;
}
</style>