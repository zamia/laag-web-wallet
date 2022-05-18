<script setup>
import IconLink from '@/components/IconLink.vue'
</script>
<template>
  <div class="main-nav">
    <IconLink href="/home" icon="paid" icon-size="1.5rem" text="Assets" class="main-nav__item"></IconLink>
    <IconLink href="/home" icon="exchange" icon-size="1.5rem" text="Swap" class="main-nav__item"></IconLink>
    <IconLink href="/home" icon="shop-o" icon-size="1.5rem" text="Service" class="main-nav__item"></IconLink>
  </div>
</template>

<style scoped lang="scss">
.main-nav {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem 0;

  .main-nav__item {
    flex: 0 0 34%;
  }
}
</style>