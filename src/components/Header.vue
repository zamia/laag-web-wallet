<script setup>
import { Icon } from 'vant'
</script>

<template>
  <div class="header" @click="this.$router.back()">
    <Icon name="arrow-left"></Icon>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.header {
  font-size: 16px;
  text-align: center;
  position: relative;

  i {
    float: left;
    margin-right: 0.5rem;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>