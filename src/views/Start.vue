<script setup>
import { LaagWallet } from '@/models/LaagWallet.js'
import { useRouter } from 'vue-router'
import { usePhraseStore } from '@/store.js'

const router = useRouter();
const store = usePhraseStore();
const wallet = LaagWallet.loadFromStorage();
console.log(wallet);

if (wallet && wallet.phrase && LaagWallet.isValidPhrase(wallet.phrase)) {
  wallet.syncToStore(store);
  router.push("/assets")
} else {
  router.push("/home")
}
</script>

<template>
</template>