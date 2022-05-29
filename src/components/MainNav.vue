<script setup>
const props = defineProps(["active"]);
const activeItem = ref(props["active"]);

</script>
<template>
  <VanTabbar v-model="activeItem" safe-area-inset-bottom class="main-nav">
    <VanTabbarItem name="tokens" icon="paid" to="/tokens">Assets</VanTabbarItem>
    <VanTabbarItem name="swap" icon="exchange" to="/swap">Swap</VanTabbarItem>
    <VanTabbarItem name="services" icon="shop-o" to="/services">Services</VanTabbarItem>
  </VanTabbar>
</template>

<style lang="scss">
.main-nav.van-tabbar {
  height: 60px;
  color: $text-default;

  .van-tabbar-item {
    .van-icon {
      padding: 5px;
    }

    &.van-tabbar-item--active .van-icon {
      color: $text-white;
      background-color: #9474FF;
      border-radius: 2rem;
      box-shadow: 0px 0px 20px 10px rgba(67, 41, 154, 0.3);
    }
  }
}
</style>
