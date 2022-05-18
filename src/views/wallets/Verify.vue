<script setup>
import { Button, Icon, Radio, RadioGroup } from 'vant';
import { Header, Title } from '@/components'
import { ref, onMounted, computed } from "vue";
import { usePhraseStore } from "@/store.js"

let user_choices_q1 = ref("");
let user_choices_q2 = ref("");

let store = usePhraseStore();
const words = store.getPhraseArray;

const first = 1;
const second = 2;
const q1_answer = words[first];
const q2_answer = words[second];
const q1_answers = words.select_three(first).shuffle();
const q2_answers = words.select_three(second).shuffle();

onMounted(() => {
})

const select_correct = computed(() => {
  return user_choices_q1.value == q1_answer
    && user_choices_q2.value == q2_answer
})

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
      <RadioGroup v-model="user_choices_q1" direction="horizontal">
        <div v-for="w in q1_answers" :key="w">
          <Radio :name="w">{{ w }}</Radio>
        </div>
      </RadioGroup>
    </div>
  </div>

  <div class="question question--last">
    <div class="question__title">
      please select the 7th word of recovery phrase:
    </div>
    <div class="question__options">
      <RadioGroup v-model="user_choices_q2" direction="horizontal">
        <div v-for="w in q2_answers" :key="w">
          <Radio :name="w">{{ w }}</Radio>
        </div>
      </RadioGroup>
    </div>
  </div>

  <div class="commands">
    <Button type="primary" :disabled="!select_correct" block to="/wallets/done">Continue</Button>
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
