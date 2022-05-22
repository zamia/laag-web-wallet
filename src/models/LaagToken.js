import IconSol from "@/assets/icon-sol.png";
import IconUsdc from "@/assets/icon-usdc.png";

export class LaagToken {
  static PresetTokenList = [
    {
      symbol: "SOL",
      name: "Solana",
      icon: IconSol,
      price: 56.32,
      amount: 0,
      total: 0,
    },
    {
      symbol: "USDC",
      name: "USD Coin",
      icon: IconUsdc,
      price: 1.0,
      amount: 0,
      total: 0,
    },
  ];

  static getToken(sym) {
    return this.PresetTokenList.find((e) => e.symbol === sym);
  }

  static getPrice(sym) {
    return this.getToken(sym).price;
  }

  static getIcon(sym) {
    return this.getToken(sym).icon;
  }
}
