import { getOrca, OrcaPoolConfig } from "@orca-so/sdk";
import { Connection, clusterApiUrl } from "@solana/web3.js";

export class OrcaSwap {
  static SupportedPairs = ["SOL", "USDC"];

  constructor(fromToken, toToken) {
    this.fromToken = fromToken;
    this.toToken = toToken;

    const pool = OrcaSWap.getPool(fromToken, toToken);
    const tokenA = pool.getTokenA();
    const tokenB = pool.getTokenB();

    this.pool = pool;
    this.fromPoolToken = fromToken == tokenA.tag ? tokenA : TokenB;
    this.toPoolToken = fromToken == tokenA.tag ? tokenB : TokenA;
  }

  static getPool(fromToken, toToken) {
    if (!SupportedPairs.includes(fromToken) || !SupportedPairs.includes(toToken)) {
      return null;
    }
    const connection = new Connection(clusterApiUrl("mainnet-beta"), "singleGossip");
    const orca = getOrca(connection);
    const orcaPool = orca.getPool(OrcaPoolConfig.SOL_USDC);
    return orcaPool;
  }

  async getMinOutputAmount(amount) {
    const poolAmount = new Decimal(amount);

    const quote = await this.pool.getQuote(this.fromPoolToken, poolAmount);
    const outputAmount = quote.getMinOutputAmount();
    return outputAmount;
  }

  async swapToken(fromToken, toToken, amount, keypairs) {
    const poolAmount = new Decimal(amount);

    const quote = await this.getMinOutputAmount(amount);
    const outputAmount = quote.getMinOutputAmount();

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
