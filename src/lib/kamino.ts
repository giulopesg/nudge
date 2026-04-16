import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

const RPC_URL =
  process.env.NEXT_PUBLIC_HELIUS_RPC_URL ||
  'https://api.mainnet-beta.solana.com';

const KAMINO_MAIN_MARKET = '7u3HeHxYDLhnCoErrtycNokbQYbWGzLs6JSDqGAv5PfF';
const KLEND_PROGRAM_ID = 'KLend2g3cP87ez4uTnDRPws38SA1pjhBboGPMHFXnPg';

export type PositionStatus = 'safe' | 'attention' | 'danger';

export interface CollateralDetail {
  symbol: string;
  amount: number;
  valueUsd: number;
}

export interface KaminoPosition {
  totalCollateral: number;
  collateralDetails: CollateralDetail[];
  totalDebt: number;
  debtDetails: CollateralDetail[];
  healthFactor: number;
  loanToValue: number;
  status: PositionStatus;
  netValue: number;
  marginPercent: number;
}

export interface WalletBalance {
  solBalance: number;
  solValueUsd: number;
}

export interface PositionResponse {
  wallet: string;
  balance: WalletBalance;
  position: KaminoPosition | null;
  timestamp: string;
}

function getStatus(hf: number): PositionStatus {
  if (hf > 1.5) return 'safe';
  if (hf > 1.2) return 'attention';
  return 'danger';
}

/**
 * Fetch SOL balance for a wallet.
 */
export async function getWalletBalance(walletAddress: string): Promise<WalletBalance> {
  const connection = new Connection(RPC_URL, 'confirmed');
  const pubkey = new PublicKey(walletAddress);
  const lamports = await connection.getBalance(pubkey);
  const solBalance = lamports / LAMPORTS_PER_SOL;

  // Fetch SOL price from Jupiter
  let solPrice = 0;
  try {
    const res = await fetch(
      'https://api.jup.ag/price/v2?ids=So11111111111111111111111111111111111111112',
    );
    const data = await res.json();
    solPrice = Number(data.data?.['So11111111111111111111111111111111111111112']?.price ?? 0);
  } catch {
    solPrice = 0;
  }

  return {
    solBalance,
    solValueUsd: solBalance * solPrice,
  };
}

/**
 * Fetch Kamino lending obligation for a wallet using klend-sdk.
 * Falls back to null if no position found or SDK fails.
 */
export async function getKaminoPosition(
  walletAddress: string,
): Promise<KaminoPosition | null> {
  try {
    // Dynamic import to avoid client bundle issues
    const { KaminoMarket } = await import('@kamino-finance/klend-sdk');
    const { createSolanaRpc } = await import('@solana/kit');
    const { address } = await import('@solana/kit');

    const rpc = createSolanaRpc(RPC_URL);
    const market = await KaminoMarket.load(rpc, address(KAMINO_MAIN_MARKET), 400);

    if (!market) return null;

    const obligation = await market.getUserVanillaObligation(
      address(walletAddress),
    );

    if (!obligation) return null;

    const stats = obligation.refreshedStats;

    const totalCollateral = Number(stats.userTotalCollateralDeposit ?? 0);
    const totalDebt = Number(stats.userTotalBorrow ?? 0);
    const ltv = Number(stats.loanToValue ?? 0);
    const borrowUtil = Number(stats.borrowUtilization ?? 0);

    // HF = liquidation threshold / current borrow utilization
    const healthFactor = borrowUtil > 0 ? 1 / borrowUtil : 99;

    // Build collateral details
    const collateralDetails: CollateralDetail[] = [];
    for (const [reserveAddr, pos] of obligation.deposits) {
      const reserve = market.getReserveByAddress(reserveAddr);
      collateralDetails.push({
        symbol: reserve?.stats?.symbol ?? 'Unknown',
        amount: Number(pos.amount) / Number(pos.mintFactor),
        valueUsd: Number(pos.marketValueRefreshed),
      });
    }

    // Build debt details
    const debtDetails: CollateralDetail[] = [];
    for (const [reserveAddr, pos] of obligation.borrows) {
      const reserve = market.getReserveByAddress(reserveAddr);
      debtDetails.push({
        symbol: reserve?.stats?.symbol ?? 'Unknown',
        amount: Number(pos.amount) / Number(pos.mintFactor),
        valueUsd: Number(pos.marketValueRefreshed),
      });
    }

    const marginPercent =
      totalDebt > 0 ? ((totalCollateral - totalDebt) / totalDebt) * 100 : 100;

    return {
      totalCollateral,
      collateralDetails,
      totalDebt,
      debtDetails,
      healthFactor: Math.min(healthFactor, 99),
      loanToValue: ltv,
      status: getStatus(healthFactor),
      netValue: totalCollateral - totalDebt,
      marginPercent,
    };
  } catch (err) {
    console.error('Kamino SDK error:', err);
    return null;
  }
}

/**
 * Full position fetch — balance + Kamino position.
 */
export async function getFullPosition(
  walletAddress: string,
): Promise<PositionResponse> {
  const [balance, position] = await Promise.all([
    getWalletBalance(walletAddress),
    getKaminoPosition(walletAddress),
  ]);

  return {
    wallet: walletAddress,
    balance,
    position,
    timestamp: new Date().toISOString(),
  };
}
