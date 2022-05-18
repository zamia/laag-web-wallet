<script setup>
import { Icon } from 'vant';
import { RouterLink } from 'vue-router';

</script>

<template>
  <div class="topnav">
    <router-link to="/home" class="topnav__left">
      <Icon name="scan"></Icon>
    </router-link>
    <router-link to="/home" class="topnav__right">
      <Icon name="setting-o"></Icon>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.topnav {
  clear: both;
  min-height: 2rem;

  .topnav__left {
    float: left
  }

  .topnav__right {
    float: right
  }
}
</style>