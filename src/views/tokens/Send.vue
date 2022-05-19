<script setup>
import { useToken } from "@/composables"
import { Button } from 'vant'
import IconSol from '@/assets/icon-sol.png'
import IconUsdc from '@/assets/icon-usdc.png'
import { Header } from '@/components'

const sol_token = useToken('SOL', "Solana", IconSol);
const usdc_token = useToken('USDC', "USD Coin", IconUsdc);
const tokens = [sol_token, usdc_token];

</script>

<template>
  <Header>Send Token</Header>
  <div class="choose-token">
    <span>Sending Token:</span>
  </div>
  <div class="choose-amount">
    <span>Enter Amount:</span>
  </div>
  <div class="choose-recipient">
    <span>Enter Recipient:</span>
  </div>
  <div class="cmds">
    <Button type="primary">Send</Button>
    Gtest Good
    Gtest Good
    Gtest Good
  </div>
  <div class="note">
    <span>Note:</span>
    <ul>
      <li>* Please make sure the recepient address is correct, Or you may lose your money. </li>
      <li>* You could also transfer a small amount of money to test recipient address is correct.</li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
</style>
