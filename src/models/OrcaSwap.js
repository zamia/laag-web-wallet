import { getOrca, OrcaPoolConfig } from "@orca-so/sdk";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import Decimal from "decimal.js";

export const SupportedPairs = ["SOL", "USDC"];
export class OrcaSwap {
  constructor(fromToken, toToken) {
    this.fromToken = fromToken;
    this.toToken = toToken;

    const pool = OrcaSwap.getPool(fromToken, toToken);
    const tokenA = pool.getTokenA();
    const tokenB = pool.getTokenB();

    this.pool = pool;
    this.fromPoolToken = fromToken == tokenA.tag ? tokenA : tokenB;
    this.toPoolToken = fromToken == tokenA.tag ? tokenB : tokenA;
  }

  static getPool(fromToken, toToken) {
    if (!SupportedPairs.includes(fromToken) || !SupportedPairs.includes(toToken)) {
      return null;
    }
    const connection = new Connection(clusterApiUrl("mainnet-beta"), "singleGossip");
    const orca = getOrca(connection);
    const orcaPool = orca.getPool(OrcaPoolConfig.SOL_USDC);
    console.log(`orca pool: ${orcaPool}`);
    return orcaPool;
  }

  async getMinOutputAmount(amount) {
    const poolAmount = new Decimal(amount);

    const quote = await this.pool.getQuote(this.fromPoolToken, poolAmount);
    const outputAmount = quote.getMinOutputAmount();
    return outputAmount;
  }

  async swapToken(amount, keypairs) {
    const poolAmount = new Decimal(amount);
    const outputAmount = await this.getMinOutputAmount(amount);

    const swapPayload = await this.pool.swap(keypairs, this.fromPoolToken, poolAmount, outputAmount);
    const swapTxId = await swapPayload.execute();

    return swapTxId;
  }
}

export async function swapToken(fromToken, toToken, amount, keypairs) {
  const connection = new Connection(clusterApiUrl("mainnet-beta"), "singleGossip");
  const orca = getOrca(connection);

  // test swap 0.05 sol for USDC
  try {
    const orcaPool = orca.getPool(OrcaPoolConfig.SOL_USDC);
    const solToken = orcaPool.getTokenA();
    const solamount = new Decimal(0.05);
    const quote = await orcaPool.getQuote(soltoken, solamount);
    const usdcAmount = quote.getMinOutputAmount();
    console.log(`usdc amount minimum output: ${usdcAmount.toNumber()}`);

    const swapPayload = await orcaPool.swap(keypair, solToken, solAmount, usdcAmount);
    const swapTxId = await swapPayload.execute();
    console.log(`swap tx id: ${swapTxId}`);
  } catch (e) {
    console.log(`error found: ${e.message}`);
  }
}
