<script setup>
const props = defineProps(["options", "modelValue"]);
const selectedItem = ref("");
const emit = defineEmits(['update:modelValue'])

const selectItem = function (item) {
  console.log(`selected Item: ${item}`);
  selectedItem.value = item;
  emit("update:modelValue", selectedItem.value);
}
</script>

<template>
  <div class="radio-group">
    <div v-for="(item, index) in props.options" :key="index"
      :class="`radio-group__item ${selectedItem == item ? 'selected' : ''}`" @click="selectItem(item);">
      {{ item }}
    </div>
  </div>

</template>

<style scoped lang="scss">
.radio-group {
  display: flex;
  align-content: center;
  justify-content: space-between;
  align-items: center;

  .radio-group__item {
    flex: 0 0 25%;
    min-width: 70px;
    padding: 8px 10px;
    border: 1px solid $bg-lightest;
    border-radius: 2rem;
    text-align: center;

    line-height: 1rem;

    &.selected {
      background: $bg-lightest;
    }
  }
}
</style>