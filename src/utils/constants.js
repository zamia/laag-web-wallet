import IconSol from "@/assets/icon-sol.png";
import IconUsdc from "@/assets/icon-usdc.png";

export const USDCMintAddress = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
export const DecimalsOfUSDC = 6;
export const TokensPerUSDC = 10 ** DecimalsOfUSDC;

export const PresetTokenList = [
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
