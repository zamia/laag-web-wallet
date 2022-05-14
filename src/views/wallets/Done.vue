<script setup>
import Header from '@/components/Header.vue';
import { Button, Icon } from 'vant'
</script>

<template>
  <Header>Create New Wallet</Header>

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
</template>

<style scoped lang="scss">
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