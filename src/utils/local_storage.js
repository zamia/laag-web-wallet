export const saveToStorage = (store) => {
  localStorage.laagPhrase = store.phrase;
  localStorage.laagPublicKey = store.publicKey;
  localStorage.laagSecretKey = store.secretKey;
};
