<script setup>
import { Icon as VanIcon, Button as VanButton } from 'vant'
</script>

<template>
  <div class="welcome">
    <div class="logo">
      <VanIcon name="fire" class="text-purple-600" size="48"></VanIcon>
      <VanIcon name="fire" class="text-purple-600" size="48"></VanIcon>
      <VanIcon name="fire" class="text-purple-600" size="48"></VanIcon>
    </div>
    <div class="brand">LaaG Wallet</div>
    <div class="slogon">Connect Crypto World to Reality</div>
  </div>

  <div class="actions">
    <VanButton type="primary" block to="/wallets/new">Create New Wallet</VanButton>
    <VanButton type="default" block to="/wallets/import">Import existing Wallet</VanButton>
  </div>
</template>

<style scoped lang="scss">
.welcome {
  margin-top: 10rem;
  margin-bottom: 10rem;
  padding: 2rem;

  .logo,
  .brand,
  .slogon {
    display: flex;
    justify-content: center;
  }

  .brand {
    font-size: 2rem;
    line-height: 4rem;
    color: $color-black;
  }

  .slogon {
    color: $color-gray;
  }

}

.actions {
  button {
    margin-bottom: 1rem;
  }
}
</style>