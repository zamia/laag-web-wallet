<script setup>
import { PresetTokenList, formatMoney, isValidAddress } from '@/utils'
import { Connection, clusterApiUrl } from '@solana/web3.js'

const tokenSelectedIndex = ref(0);
const currentAmount = ref(0);
const recipientAddress = ref("");

const tokenSelected = computed(() => PresetTokenList[tokenSelectedIndex.value]);
const currentTotal = computed(() => Number(currentAmount.value) * Number(tokenSelected.value.price))
const isSendReady = computed(() => Number(currentAmount.value) > 0.0 && isValidAddress(recipientAddress.value));

const router = useRouter();
const executeSendTx = () => {
  router.push({
    name: "SendSubmit",
    params: {
      token: tokenSelected.value.symbol,
      amount: currentAmount.value,
      recipient: recipientAddress.value,
    }
  })
};

const previewModalShowing = ref(false);

onMounted(async () => {
  const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
  const blockhash = (await connection.getLatestBlockhash()).blockhash;
  console.log(`last blockhash: ${blockhash}`);
});

</script>

<template>
  <Header>Send Token</Header>
  <div class="choose-token">
    <TokenSelect v-model="tokenSelectedIndex"></TokenSelect>
  </div>

  <div class="amount">
    <span>Enter Amount:</span>
    <div class="amount__block">
      <VanField v-model="currentAmount" type="number" input-align="center" class="amount__input amount-input"
        title="amount" placeholder="0.00">
      </VanField>
      <div class="amount__desc">$ {{ formatMoney(currentTotal) }} <span></span></div>
    </div>
  </div>
  <div class="recipient">
    <span>Enter Recipient Address:</span>
    <div class="recipient__input">
      <VanField v-model="recipientAddress" type="textarea" input-align="center" rows="1" autoresize>
      </VanField>
    </div>
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
        <VanButton type="primary" block @click="executeSendTx()">Confirm Send</VanButton>
      </div>
    </div>
  </VanActionSheet>

</template>

<style scoped lang="scss">
.choose-token {
  margin-top: 1rem;
  text-align: center;

  .choose-token__title {
    margin-bottom: 0.5rem;
  }
}

.amount {
  margin-top: 3rem;
  text-align: center;

  &__block {
    background-color: $bg-light;
    border-radius: 1rem;
  }

  &__input {
    margin: 1rem 0 0;
  }

  &__desc {
    padding-bottom: 1rem;
  }

  .van-field {
    border-radius: 999px;
    background: none;
  }
}

.amount-input {
  font-size: 2rem;
  color: $color-main;

  .van-field__control,
  input,
  input:focus {
    color: $color-main;
  }
}

.recipient {
  margin-top: 3rem;
  text-align: center;

  .recipient__input {
    margin-top: 1rem;
  }

  .van-field {
    border-radius: 1rem;
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
