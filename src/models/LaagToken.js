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
    return LaagToken.PresetTokenList.find((e) => e.symbol == sym);
  }

  static getPrice(sym) {
    return LaagToken.getToken(sym).price;
  }

  static getIcon(sym) {
    return LaagToken.getToken(sym).icon;
  }
}
