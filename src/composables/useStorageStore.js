import { LaagWallet } from "@/models";
import { usePhraseStore } from "@/store.js";

export function useStorageStore() {
  const store = usePhraseStore();

  // if the store if fullfilled, return store
  if (store.phrase && store.keypairs) {
    return { store };
  }

  // else load LocalStorage and store then to context
  const wallet = LaagWallet.loadFromStorage();
  if (wallet && wallet.phrase && LaagWallet.isValidPhrase(wallet.phrase)) {
    wallet.syncToStore(store);
  }
  return { store };
}
