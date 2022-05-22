import { defineStore } from "pinia";

export const usePhraseStore = defineStore({
  id: "phrase",

  state: () => ({
    phrase: "",
    publicKey: "",
    secretKey: [],
    keypairs: null,
  }),

  getters: {
    getPhraseArray: (state) => state.phrase.trim().split(" "),
  },

  actions: {
    setPhrase(newPhrase) {},
  },
});

export const useAmountStore = defineStore({
  id: "amountStore",

  state: () => ({
    amounts: {
      SOL: 0,
      USDC: 0,
    },
  }),

  getters: {
    getTokenAmount: (state) => {
      return (sym) => state.amounts[sym];
    },
  },

  actions: {
    setTokenAmount(tokenSymbol, newAmount) {
      this.amounts[tokenSymbol] = newAmount;
    },
  },
});
