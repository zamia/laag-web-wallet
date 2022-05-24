<script setup>
defineProps(['title', 'description']);
</script>

<template>
  <h1 class="title">
    {{ title }}
    <div class="title__desc">
      <slot />
    </div>
  </h1>
</template>

<style scoped lang="scss">
.title {
  font-size: 1.2rem;
  color: $color-main;
  text-align: center;
  margin: 1rem 0 2rem;

  .title__desc {
    font-size: 1rem;
    color: $text-default;
    font-weight: normal;
    margin-top: 0.2rem;
  }
}
</style>