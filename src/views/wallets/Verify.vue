<script setup>
import { ref, onMounted, computed } from "vue";
import { usePhraseStore } from "@/store.js";
import RadioGroup from '@/components/RadioGroup.vue';

let user_choices_q1 = ref("");
let user_choices_q2 = ref("");

let store = usePhraseStore();
const words = store.getPhraseArray;

const first = 2;
const second = 6;
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
    Confirm phrase in the last step
  </Title>

  <div class="question">
    <div class="question__title">
      Please select the <span>3rd&nbsp;</span>word:
    </div>
    <div class="question__options">
      <RadioGroup v-model="user_choices_q1" :options="q1_answers"></RadioGroup>
    </div>
  </div>

  <div class="question question--last">
    <div class="question__title">
      Please select the <span>7th&nbsp;</span>word:
    </div>
    <div class="question__options">
      <RadioGroup v-model="user_choices_q2" :options="q2_answers"></RadioGroup>
    </div>
  </div>

  <div class="commands">
    <VanButton type="primary" :disabled="!select_correct" block to="/wallets/done">Continue</VanButton>
  </div>
</template>

<style scoped lang="scss">
.question {
  margin-bottom: 2rem;
  padding: 16px 10px;
  background-color: $bg-light;
  border-radius: 10px;

  &.question--last {
    margin-bottom: 5rem;
  }

  .question__title {
    margin-bottom: 0.5rem;

    span {
      color: $color-main;
    }
  }
}
</style>
