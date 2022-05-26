<script setup>
import { Icon } from 'vant'

const props = defineProps(["href", "icon", "text", "icon-size", "icon-type", "active"])

let icon_size = props["iconSize"]
if (!icon_size) {
  icon_size = "1.3rem";
}
</script>
<template>
  <router-link :to="props.href" class="icon-link">
    <Icon :name="props.icon" :size="icon_size" :class="`icon-link__icon ${props['iconType']} ${props.active ? 'active'
    : ''}`"></Icon>
    <span class="icon-link__text">
      {{ props.text }}
      <slot></slot>
    </span>
  </router-link>
</template>
<style scoped lang="scss">
.icon-link {
  text-align: center;
  display: inline-block;

  .icon-link__icon {
    padding: 0.5rem;
    color: $text-secondary;

    &.active {
      border: 1px solid #9474FF;
      background-color: #9474FF;
      border-radius: 2rem;
      box-shadow: 0px 0px 20px 10px rgba(67, 41, 154, 0.3);
    }

    &.img {
      padding: 0;
    }
  }

  .icon-link__text {
    display: block;
    margin-top: 0.5rem;
    color: $text-secondary;
  }
}
</style>