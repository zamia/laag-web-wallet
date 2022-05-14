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
  font-size: 18px;
  color: $color-main;
  margin: 1rem 0 2rem;

  .title__desc {
    font-size: 14px;
    color: $color-light;
  }
}
</style>