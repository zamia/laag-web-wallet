<script setup>
import { copyText } from "vue3-clipboard";
import { Toast } from "vant";
import { ClipboardPaste24Regular } from "@vicons/fluent";

const props = defineProps(["modelValue"]);
const emit = defineEmits(['update:modelValue'])

const onClick = async (value) => {
  if (navigator.clipboard.readText) {
    const text = await navigator.clipboard.readText();
    if (text != "") {
      Toast("Paste success");
      emit("update:modelValue", text);
      return;
    }
  }
  Toast("Paste Failed, Please input mannually.");
  return;
}
</script>

<template>
  <a class="copy-link" @click="onClick(props.value)">
    <XIcon size="24">
      <ClipboardPaste24Regular />
    </XIcon>
    <span>Tap to paste</span>
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