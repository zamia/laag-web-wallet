<script setup>
import { ref } from 'vue'
import { PresetTokenList } from '@/utils'

const tokens = PresetTokenList;
const props = defineProps(["modelValue"]);
const emit = defineEmits(['update:modelValue'])

const tokenSelectedIndex = ref(props.modelValue);
const tokenSelected = computed(() => tokens[tokenSelectedIndex.value]);

const tokenModalShow = ref(false);
const tokenModalOptions = computed(() =>
  tokens.map((t) => ({ symbol: t.symbol, name: `${t.symbol} - ${t.name}` }))
);

const tokenModalOnSelect = (item) => {
  tokenSelectedIndex.value = tokens.findIndex((t) => t.symbol == item.symbol);
  tokenModalShow.value = false;
  emit('update:modelValue', tokenSelectedIndex.value);
}

</script>

<template>
  <div class="token-select">
    <IconLink href="" :icon="tokenSelected.icon" icon-size="3rem">
      <span class="token-select__name">{{ tokenSelected.symbol }}</span>
      <span class="token-select__desc">{{ tokenSelected.name }}</span>
    </IconLink>
    <a class="token-select__arrow" @click="tokenModalShow = true">
      <VanIcon name="arrow-down"></VanIcon>
    </a>
    <VanActionSheet v-model:show="tokenModalShow" :actions="tokenModalOptions" @select="tokenModalOnSelect"
      cancel-text="Cancel" description="Select Token" close-on-click-action>
    </VanActionSheet>
  </div>
</template>

<style scoped lang="scss">
.token-select {
  position: relative;

  .token-select__arrow {
    position: absolute;
    top: 0;
    right: 50%;
    margin-right: -100px;
    width: 3rem;
    height: 3rem;
    padding: 1rem;
  }

  .token-select__name {
    font-size: 1.2rem;
  }

  .token-select__desc {
    padding-left: 0.5rem;
    color: $color-gray;
  }
}

.token-select .icon-link {

  .icon-link__icon {

    padding: 0;
  }
}
</style>