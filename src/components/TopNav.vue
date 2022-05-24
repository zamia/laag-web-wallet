<script setup>
import { ScanDash24Regular, Settings24Regular } from '@vicons/fluent';
</script>

<template>
  <div class="topnav">
    <router-link to="/tokens" class="topnav__left">
      <XIcon size="30">
        <ScanDash24Regular />
      </XIcon>
    </router-link>
    <router-link to="/settings" class="topnav__right">
      <XIcon size="30">
        <Settings24Regular />
      </XIcon>
    </router-link>
  </div>
</template>

<style scoped lang="scss">
.topnav {
  min-height: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;

  .topnav__left {
    flex: 1 1 50%;
    text-align: left;
    margin-left: 1rem;
    margin-top: 1rem;
  }

  .topnav__right {
    flex: 1 1 50%;
    text-align: right;
    margin-right: 1rem;
    margin-top: 1rem;
  }

  .xicon {
    color: $text-white;
  }
}
</style>