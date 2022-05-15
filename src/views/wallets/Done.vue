<script setup>
import Header from '@/components/Header.vue'
import { Button, Icon, Loading } from 'vant'
import { ref, onMounted } from 'vue'
import { usePhraseStore } from "@/store.js"
import * as bip39 from '@scure/bip39'
import * as ed from 'ed25519-hd-key'
import { Keypair } from '@solana/web3.js'

let loading = ref(true);
let error = ref(false);

const store = usePhraseStore();
// const phrase = store.phrase;
const phrase = "that grit custom whip poet fit evidence mean plastic amazing neither rack";
// pubkey: 8HiU76FpDvRUbULvkiPNYYkMGU6eGNiFYNo8rt9jvnTV

onMounted(() => {
  if (!phrase || phrase == "") {
    error.value = true;
    return;
  }

  const seed = bip39.mnemonicToSeedSync(phrase);
  console.log(`bip32 seed: ${seed}`);
  const path = "m/44'/501'/0'/0'";

  const derivedSeed = ed.derivePath(path, seed.toString('hex')).key;
  const keypairs = Keypair.fromSeed(derivedSeed);
  store.publibKey = keypairs.publibKey;
  store.secretKey = keypairs.secretKey;

  /*
    const hdNode = HDNode.fromMnemonic(phrase).derivePath(path);
    const key = hdNode.privateKey.slice(2)
    const key_array = Uint8Array.from(Buffer.from(key, 'hex'));
    console.log(`ethers privateKey: ${hdNode.privateKey}`);
    console.log(`ethers seed: ${key_array}`);
    const keypairs = Keypair.fromSecretKey(key_array);
    store.publibKey = keypairs.publicKey;
    store.secretKey = keypairs.secretKey;
  */

  console.log(`pub: ${store.publibKey}, \nsec: ${store.secretKey}`);
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