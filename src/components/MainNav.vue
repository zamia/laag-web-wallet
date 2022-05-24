<script setup>
import IconLink from './IconLink.vue'
const props = defineProps(["activeItem"]);

const isActive = item => props.activeItem == item;
</script>
<template>
  <div class="main-nav">
    <IconLink href="/tokens" icon="paid" icon-size="1.5rem" text="Assets" :active="isActive('tokens')"
      class="main-nav__item"></IconLink>
    <IconLink href="/swap" icon="exchange" icon-size="1.5rem" text="Swap" :active="isActive('swap')"
      class="main-nav__item"></IconLink>
    <IconLink href="/services" icon="shop-o" icon-size="1.5rem" text="Service" :active="isActive('service')"
      class="main-nav__item"></IconLink>
  </div>
</template>

<style scoped lang="scss">
.main-nav {
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem 0;

  .main-nav__item {
    flex: 0 0 34%;
  }
}
</style>