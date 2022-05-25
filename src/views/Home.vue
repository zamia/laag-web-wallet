<script setup>
import { GlobeAfrica } from '@vicons/fa';
</script>

<template>
  <div class="welcome">
    <div class="logo">
      <XIcon size="64">
        <GlobeAfrica />
      </XIcon>
    </div>
    <div class="brand">LaaG Wallet</div>
    <div class="slogon">Connect Crypto World to Reality</div>
  </div>

  <div class="actions">
    <VanButton type="primary" round block to="/wallets/new">Create New Wallet</VanButton>
    <VanButton type="default" round block to="/wallets/import">Import existing Wallet</VanButton>
  </div>
</template>

<style scoped lang="scss">
.welcome {
  margin-top: 5rem;
  margin-bottom: 8rem;
  padding: 2rem;

  .logo,
  .brand,
  .slogon {
    display: flex;
    justify-content: center;
  }

  .logo {
    .xicon {
      color: $color-main;
    }
  }

  .brand {
    font-size: 2rem;
    line-height: 4rem;
    color: $text-white;
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