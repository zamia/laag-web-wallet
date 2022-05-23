import { PresetTokenList } from "@/utils";

export class LaagToken {
  static getToken(sym) {
    return PresetTokenList.find((e) => e.symbol == sym);
  }

  static getPrice(sym) {
    return LaagToken.getToken(sym).price;
  }

  static getIcon(sym) {
    return LaagToken.getToken(sym).icon;
  }
}
