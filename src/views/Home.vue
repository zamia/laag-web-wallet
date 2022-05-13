<script setup>
import { Button, Icon } from 'vant'
</script>

<template>
  <div class="welcome">
    <div class="logo">
      <Icon name="fire" class="text-purple-600" size="48"></Icon>
    </div>
    <div class="brand">LaaG Wallet</div>
    <div class="slogon">Connect Crypto World to Reality</div>
  </div>

  <div class="actions">
    <Button type="primary" block to="/wallets/new">Create New Wallet</Button>
    <Button type="default" block to="/wallets/import">Import existing Wallet</Button>
  </div>
</template>

<style lang="scss">
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