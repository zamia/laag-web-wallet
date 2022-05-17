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
  actions: {},
});
