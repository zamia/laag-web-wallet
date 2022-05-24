<script setup>
const props = defineProps(["phraseArray"]);
</script>

<template>
  <div class="phrase-card">
    <div class="phrase-card__item phrase-item clearfix" v-for="(p, index) in props.phraseArray" :key="index">
      <span class="phrase-item__index">{{ index + 1 }}</span>
      <span class="phrase-item__content">{{ p }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.phrase-card {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 1.2rem 0.7rem;

  .phrase-card__item {
    flex: 0 0 47%;
    margin-bottom: 0.5rem;
    border: 1px solid $bg-lightest;
    border-radius: 1rem;
    display: inline-block;
  }
}

.phrase-item {
  display: block;
  height: 2rem;
  line-height: 2rem;

  .phrase-item__index {
    float: left;
    width: 1rem;
    padding: 0 8px 0 10px;
    text-align: right;
    border-right: 1px solid $bg-lightest;
  }

  .phrase-item__content {
    padding: 5px 5px 5px 12px;
  }
}
</style>