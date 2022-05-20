<script setup>
import { PresetTokenList, formatMoney, isValidAddress } from '@/utils'

const tokens = PresetTokenList;
const tokenSelectedIndex = ref(0);
const tokenSelected = computed(() => tokens[tokenSelectedIndex.value]);

/* for token select model*/
console.log(tokenSelected.value);
const tokenModelShow = ref(false);
const tokenModelOptions = tokens.map((t) => ({ symbol: t.symbol, name: `${t.symbol} - ${t.name}` }));
const tokenModelOnSelect = (item) => {
  tokenSelectedIndex.value = tokens.findIndex((t) => t.symbol == item.symbol);
  tokenModelShow.value = false;
  console.log(tokenSelected);
}

const currentAmount = ref(0);
const currentTotal = computed(() => Number(currentAmount.value) * Number(tokenSelected.value.price))

const recipientAddress = ref("");

const isSendReady = computed(() => Number(currentAmount.value) > 0.0 && isValidAddress(recipientAddress.value));


const router = useRouter();
const previewTx = () => {
  router.push({
    path: "/tokens/preview",
    query: {
      token: tokenSelected.value.symbol,
      amount: currentAmount.value,
      recipient: recipientAddress.value,
    }
  })
}

</script>

<template>
  <Header>Send Token</Header>
  <div class="choose-token">
    <div>Sending Token:</div>
    <IconLink href="" :icon="tokenSelected.icon" icon-size="3rem">
      <span class="token-name">{{ tokenSelected.symbol }}</span>
      <span class="token-desc">{{ tokenSelected.name }}</span>
    </IconLink>
    <a class="choose-token__select" @click="tokenModelShow = true">
      <VanIcon name="arrow-down"></VanIcon>
    </a>
    <VanActionSheet v-model:show="tokenModelShow" :actions="tokenModelOptions" @select="tokenModelOnSelect"
      cancel-text="Cancel" description="Select Sending Token" close-on-click-action>
    </VanActionSheet>
  </div>
  <div class="amount">
    <span>Enter Amount:</span>
    <VanCellGroup class="amount__input">
      <VanField v-model="currentAmount" type="number" input-align="center" :border="false"></VanField>
    </VanCellGroup>
    <div class="amount__desc">$ {{ formatMoney(currentTotal) }} <span></span></div>
  </div>
  <div class="recipient">
    <span>Enter Recipient Address:</span>
    <VanCellGroup class="recipient__input">
      <VanField v-model="recipientAddress" type="textarea" input-align="center" rows="1" autoresize></VanField>
    </VanCellGroup>
  </div>
  <div class="cmds">
    <VanButton type="primary" block :disabled="!isSendReady" @click="previewTx">Send</VanButton>
  </div>
  <div class="note">
    <span>Note:</span>
    <ul>
      <li>Please make sure the recepient address is correct, Or you may lose your money. </li>
      <li>You could also transfer a small amount of money to test recipient address is correct.</li>
    </ul>
  </div>

</template>

<style scoped lang="scss">
.choose-token {
  text-align: center;
  margin-top: 2rem;
  position: relative;

  .choose-token__select {
    position: absolute;
    top: 2rem;
    right: 50%;
    margin-right: -100px;
    width: 3rem;
    height: 3rem;
    padding: 1rem;
  }
}

.amount {
  margin-top: 3rem;
  text-align: center;

  .amount__input {
    margin: 1rem 0;
  }
}

.recipient {
  margin-top: 3rem;
  text-align: center;

  .recipient__input {
    margin-top: 1rem;
  }
}

.cmds {
  margin-top: 3rem;
}

.note {
  margin-top: 3rem;
  color: $color-gray;

  ul {
    padding-left: 1rem;

    li {
      list-style-type: disc;
      margin-bottom: 0.5rem;
    }
  }
}

.token-name {
  font-size: 1.2rem;
}

.token-desc {
  padding-left: 0.5rem;
  color: $color-gray;
}
</style>
