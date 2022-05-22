<script setup>
import { PresetTokenList, formatMoney, isValidAddress } from '@/utils'
import SendPreview from '@/components/SendPreview.vue'

const tokenSelectedIndex = ref(0);
const currentAmount = ref(0);
const recipientAddress = ref("");

const tokenSelected = computed(() => PresetTokenList[tokenSelectedIndex.value]);
const currentTotal = computed(() => Number(currentAmount.value) * Number(tokenSelected.value.price))
const isSendReady = computed(() => Number(currentAmount.value) > 0.0 && isValidAddress(recipientAddress.value));

const router = useRouter();
const finishSendTx = () => {
  router.push({
    path: "/tokens/send-submit",
    query: {
      token: tokenSelected.value.symbol,
      amount: currentAmount.value,
      recipient: recipientAddress.value,
    }
  })
}

const previewModalShowing = ref(false);

</script>

<template>
  <Header>Send Token</Header>
  <div class="choose-token">
    <div class="choose-token__title">Sending Token:</div>
    <TokenSelect v-model="tokenSelectedIndex"></TokenSelect>
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
    <VanButton type="primary" block :disabled="!isSendReady" @click="previewModalShowing = true">Send</VanButton>
  </div>
  <div class="note">
    <span>Note:</span>
    <ul>
      <li>Please make sure the recepient address is correct, Or you may lose your money. </li>
      <li>You could also transfer a small amount of money to test recipient address is correct.</li>
    </ul>
  </div>

  <VanActionSheet v-model:show="previewModalShowing" title="Preview Send Transaction" class="review-modal">
    <div class="review-modal__content">
      <SendPreview :token="tokenSelected.symbol" :amount="currentAmount" :recipient="recipientAddress" />
      <div class="review-modal__cmd">
        <VanButton type="primary" block @click="finishSendTx" :loading="sending">Confirm Send</VanButton>
      </div>
    </div>
  </VanActionSheet>

</template>

<style scoped lang="scss">
.choose-token {
  margin-top: 3rem;
  text-align: center;

  .choose-token__title {
    margin-bottom: 0.5rem;
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

.review-modal {
  .review-modal__content {
    padding: 2rem;
  }
}
</style>
