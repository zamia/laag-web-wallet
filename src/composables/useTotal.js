import { ref, computed } from "vue";

export function useTotal() {
  const amount = ref(0);
  const price = ref(0);

  const total = computed(() => {
    const r = Number(amount.value) * Number(price.value);
    return r;
  });

  return { amount, price, total };
}
