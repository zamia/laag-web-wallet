<script setup>
import { Button, Icon, Radio, RadioGroup } from 'vant';
import Header from '@/components/Header.vue';
import Title from '@/components/Title.vue';
import { ref } from "vue";

let random_word_1 = ref("");
let random_word_2 = ref("");

</script>

<template>

  <Header>Create New Wallet</Header>
  <Title title="Confirm Recovery Phrase">
    Recovery phrase is your backup of your wallet
  </Title>

  <div class="question">
    <div class="question__title">
      please select the 3rd word of recovery phrase:
    </div>
    <div class="question__options">
      <RadioGroup v-model="random_word_1" direction="horizontal">
        <Radio name="first">first</Radio>
        <Radio name="second">second</Radio>
        <Radio name="third">third</Radio>
      </RadioGroup>
    </div>
  </div>

  <div class="question question--last">
    <div class="question__title">
      please select the 7th word of recovery phrase:
    </div>
    <div class="question__options">
      <RadioGroup v-model="random_word_2" direction="horizontal">
        <Radio name="first">first</Radio>
        <Radio name="second">second</Radio>
        <Radio name="third">third</Radio>
      </RadioGroup>
    </div>
  </div>

  <div class="commands">
    <Button type="primary" block to="/wallets/done">Continue</Button>
  </div>
</template>

<style scoped lang="scss">
.question {
  margin-bottom: 2rem;

  &.question--last {
    margin-bottom: 5rem;
  }

  .question__title {
    margin-bottom: 0.5rem;
  }
}
</style>
