<script setup>
const props = defineProps(["active"]);
const activeItem = ref(props["active"]);

</script>
<template>
  <VanTabbar v-model="activeItem" safe-area-inset-bottom>
    <VanTabbarItem name="tokens" icon="paid" to="/tokens">Assets</VanTabbarItem>
    <VanTabbarItem name="swap" icon="exchange" to="/swap">Swap</VanTabbarItem>
    <VanTabbarItem name="services" icon="shop-o" to="/services">Services</VanTabbarItem>
  </VanTabbar>
</template>

<style scoped lang="scss">
</style>