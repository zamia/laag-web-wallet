import { defineStore } from "pinia";

export const usePhraseStore = defineStore({
  id: "phrase",

  state: () => ({
    phrase: "",
    publibKey: "",
    secretKey: "",
  }),

  getters: {
    getPhraseArray: (state) => state.phrase.trim().split(" "),
  },
  actions: {},
});
