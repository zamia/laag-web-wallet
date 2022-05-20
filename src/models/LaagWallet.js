import * as bip39 from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";
import { Keypair } from "@solana/web3.js";
import axios from "axios";
import { Buffer } from "buffer";

export class LaagWallet {
  phrase = ""; //string
  publicKey = ""; //string
  secretKey = []; //Uint8Array
  keypairs = null; //web3.Keypair

  static PATH = "m/44'/501'/0'/0'";

  static async initWallet(phrase) {
    const wallet = new LaagWallet();

    if (!LaagWallet.isValidPhrase(phrase)) {
      return;
    }

    const seed = bip39.mnemonicToSeedSync(phrase);
    const seedHex = Buffer.from(seed).toString("hex");
    console.log(`bip39 seed: ${seedHex}`);

    const derivedSeedHex = await LaagWallet.derivePathByApi(
      LaagWallet.PATH,
      seedHex
    );
    const derivedSeed = Buffer.from(derivedSeedHex, "hex");
    console.log(`derivedSeedHex: ${derivedSeedHex}`);

    wallet.phrase = phrase;
    wallet.keypairs = Keypair.fromSeed(derivedSeed);
    wallet.publicKey = wallet.keypairs.publicKey;
    wallet.secretKey = wallet.keypairs.secretKey;

    console.log(wallet);
    return wallet;
  }

  get phraseArray() {
    this.phrase.split(" ");
  }

  static generatePhrase() {
    return bip39.generateMnemonic(wordlist);
  }
  static isValidPhrase(phrase) {
    return phrase != "" && phrase.split(" ").length == 12;
  }

  /*
  static derivePathByLib(path, seedHex) {
    return derivePath(path, seedHex).key.toString("hex");
  }
  */

  static async derivePathByApi(path, seedHex) {
    const derive_api_url =
      "https://avlln6i44ju56mpak27zkg7av40fgiog.lambda-url.us-west-1.on.aws/";

    const response = await axios.post(derive_api_url, {
      path: path,
      seedHex: seedHex,
    });

    console.log(response);
    console.log(response.data.derivedSeedHex);
    return response.data.derivedSeedHex;
  }

  syncToStore(store) {
    store.phrase = this.phrase;
    store.publicKey = this.publicKey;
    store.secretKey = this.secretKey;
    store.keypairs = this.keypairs;
  }

  saveToStorage() {
    localStorage.laagWallet = JSON.stringify({
      phrase: this.phrase,
      publicKey: this.publicKey,
      secretKey: Buffer.from(this.secretKey).toString("hex"),
    });
  }

  static loadFromStorage() {
    if (!localStorage.laagWallet) {
      return null;
    }

    let walletStorage = {};
    try {
      walletStorage = JSON.parse(localStorage.laagWallet);
    } catch (e) {
      console.log(e);
      return null;
    }

    const wallet = new LaagWallet();
    wallet.phrase = walletStorage.phrase;
    wallet.publicKey = walletStorage.publicKey;
    wallet.secretKey = Buffer.from(walletStorage.secretKey, "hex");
    wallet.keypairs = Keypair.fromSecretKey(wallet.secretKey);

    return wallet;
  }
}
