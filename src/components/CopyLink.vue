<script setup>
import { copyText } from "vue3-clipboard";
import { Toast } from "vant";

const props = defineProps(["value"]);

const onClick = (value) => {
  copyText(value, undefined, (error, e) => {
    if (error) {
      Toast("Copy Failed");
    } else {
      Toast("Copy Success!");
    }
  });
}
</script>

<template>
  <a class="copy-link" @click="onClick(props.value)">
    <VanIcon name="records"></VanIcon> <span>Copy to clipboard</span>
  </a>
</template>

<style scoped lang="scss">
</style>