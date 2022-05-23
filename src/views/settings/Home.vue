<script setup>
import { Dialog } from 'vant';
import { usePhraseStore } from '@/store';
import { useRouter } from 'vue-router'
import { LaagWallet } from '@/models';

const router = useRouter();

const handleLogout = () => {
  //clear store
  const store = usePhraseStore();
  store.$reset();
  // clear storage
  LaagWallet.clearStorage();

  router.push("/");
}

const onLogout = () => {
  Dialog.confirm({
    title: 'Are you sure to log out?',
    message: "Make sure you already noted down your recovery phrase, OR you will lose your access to your wallet.",
  }).then(() => {
    console.log("logout clicked: confirmed")
    handleLogout();
  }).catch((e) => {
    console.log(`logout clicked: canceled, ${e.message}`)
  });
}
</script>

<template>
  <Header>Settings</Header>
  <div class="group group--first">
    <div class="group__title">Security</div>
    <VanCellGroup>
      <VanCell title="Set or Change Pincode" is-link to="/settings" label="change your pincode to improve security">
      </VanCell>
    </VanCellGroup>
  </div>
  <div class="group">
    <div class="group__title">Network</div>
    <VanCellGroup>
      <VanCell title="Change Network" is-link to="/settings" label="change network between: mainnet, devnet or testnet">
      </VanCell>
    </VanCellGroup>
  </div>

  <div class="group">
    <div class="group__title">Wallet Management</div>
    <VanCellGroup>
      <VanCell title="View Recovery Phrase" is-link to="/settings/phrase" label="Show your recovery phrase again">
      </VanCell>
      <VanCell title="Log Out" is-link @click="onLogout"
        label="Erase all your local data and then you could create new wallet or import wallet">
      </VanCell>
    </VanCellGroup>
  </div>



</template>

<style scoped lang="scss">
.group {
  margin-top: 2rem;

  &.group--first {
    margin-top: 2rem;
  }

  .group__title {
    color: $color-gray;
    padding-left: 1rem;
    margin: 1rem 0;
  }
}
</style>