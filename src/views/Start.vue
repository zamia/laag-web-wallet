<script setup>
import { LaagWallet } from '@/models'
import { useRouter } from 'vue-router'
import { useStorageStore } from '@/composables'

const router = useRouter();
const { store } = useStorageStore();
console.log(`store: ${store}`);

if (store && store.phrase && LaagWallet.isValidPhrase(store.phrase)) {
  router.push("/tokens")
} else {
  router.push("/home")
}
</script>

<template>
</template>