<script setup>
import Header from '@/components/Header.vue'
import { Button, Icon, Loading } from 'vant'
import { ref, onMounted } from 'vue'
import { usePhraseStore } from "@/store.js"
import * as bip39 from '@scure/bip39'
import { Keypair } from '@solana/web3.js'
import { Buffer } from 'buffer'
import { derivePathByApi } from '@/utils/misc.js'
import { saveToStorage } from '@/utils/local_storage.js'

let loading = ref(true);
let error = ref(false);

const store = usePhraseStore();
const phrase = store.phrase;

onMounted(async () => {
  if (!phrase || phrase == "") {
    error.value = true;
    return;
  }

  const seed = bip39.mnemonicToSeedSync(phrase)
  const seedHex = Buffer.from(seed).toString('hex');
  console.log(`bip39 seed: ${seedHex}`);

  const path = "m/44'/501'/0'/0'";
  // const derivedSeedHex = ed.derivePath(path, seedHex).key.toString('hex');
  const derivedSeedHex = await derivePathByApi(path, seedHex);

  const derivedSeed = Buffer.from(derivedSeedHex, 'hex');
  const keypairs = Keypair.fromSeed(derivedSeed);
  store.publicKey = keypairs.publicKey;
  store.secretKey = keypairs.secretKey;
  console.log(`pub: ${store.publibKey}, \nsec: ${store.secretKey}`);

  // store to localStorage
  saveToStorage(store);

  loading.value = false;
})



</script>

<template>
  <Header>Create New Wallet</Header>

  <div class="loading" v-if="loading">
    <div class="icon">
      <Loading loading></Loading>
    </div>
    <div>Creating New Wallet...</div>

    <div v-if="error" class="error-message">
      Error: Getting recovery phrase failed. <br />Please go back to try again.
    </div>
  </div>

  <div v-else>
    <div class="notify">
      <div class="notify__sign">
        <Icon name="passed" size="64"></Icon>
      </div>
      <div class="notify__content">
        Successfully Created new wallet!
      </div>
      <div class="notify__cmd">
        <a class='link-cmd' @click="this.$router.push('/assets')">View My Assets</a>
      </div>
    </div>
    <div class="hr"></div>
    <div class="pincode">
      <div class="pincode__title">
        Pin Code
      </div>
      <div class="pincode__content">
        It’s highly recommended that setting your pin code now to increase security level to protect your assets.
      </div>
      <div class="pincode__cmd">
        <a class='link-cmd' @click="this.$router.push('/settings/pincode')">Set Pin Code Now</a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loading {
  margin-top: 10rem;
  text-align: center;

  .icon {
    margin-bottom: 1rem;
  }
}

.notify {
  text-align: center;
  margin-top: 5rem;
  margin-bottom: 5rem;
  line-height: 2rem;

  .notify__sign {
    margin-bottom: 1rem;

    i {
      color: $color-main;
    }
  }
}

.hr {
  border-top: 1px solid $color-light;
}

.pincode {
  text-align: center;
  margin-top: 5rem;

  .pincode__title {
    margin-bottom: 2rem;
  }

  .pincode__cmd {
    margin-top: 2rem;
  }
}
</style>