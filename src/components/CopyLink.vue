<script setup>
import { copyText } from "vue3-clipboard";
import { Toast } from "vant";
import { DocumentCopy24Regular } from "@vicons/fluent";

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
    <XIcon size="24">
      <DocumentCopy24Regular />
    </XIcon>
    <span>Copy to clipboard</span>
  </a>
</template>

<style scoped lang="scss">
.copy-link {
  display: flex;
  justify-content: center;
  align-items: center;

  .xicon {
    margin-right: 0.5rem;
  }

}
</style>