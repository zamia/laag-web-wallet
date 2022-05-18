<script setup>
import { Icon } from 'vant'
const props = defineProps(["href", "icon", "text", "icon-size"])

let icon_size = props["iconSize"]
if (!icon_size) {
  icon_size = "1.3rem";
}
</script>
<template>
  <router-link :to="props.href" class="icon-link">
    <Icon :name="props.icon" :size="icon_size" class="icon-link__icon"></Icon>
    <span class="icon-link__text">{{ props.text }}</span>
  </router-link>
</template>
<style scoped lang="scss">
.icon-link {
  text-align: center;
  display: block;

  .icon-link__icon {
    display: block;
    padding: 0.5rem;
  }

  .icon-link__text {
    display: block;
    color: $color-main;
  }
}
</style>