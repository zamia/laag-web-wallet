<script setup>
import { ref, onMounted } from 'vue'
import { usePhraseStore } from "@/store.js"
import { LaagWallet } from '@/models'
import { Loading, Icon } from 'vant'

let loading = ref(true);
let error = ref(false);

const store = usePhraseStore();
const phrase = store.phrase;
console.log(`Done: phrase: ${phrase}`);

onMounted(async () => {
  if (!LaagWallet.isValidPhrase(phrase)) {
    error.value = true;
    return;
  }

  const wallet = await LaagWallet.initWallet(phrase);

  // store to localStorage
  wallet.syncToStore(store);
  wallet.saveToStorage();

  loading.value = false;

  console.log(`wallet pubkey: ${wallet.publicKey}`)
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