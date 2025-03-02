export interface Protocol {
  id: string;
  name: string;
  icon: string;
  description: string;
  apy: number;
  tvl: number;
  risk: 'low' | 'medium' | 'high';
  type: 'lending' | 'staking' | 'yield-farming';
}

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  icon: string;
  balance: number;
  price: number;
  change24h: number;
}

export interface Portfolio {
  totalValue: number;
  assets: {
    protocolId: string;
    assetId: string;
    amount: number;
    value: number;
    apy: number;
  }[];
}

export interface RiskProfile {
  id: string;
  name: string;
  description: string;
  riskLevel: number; // 1-10
  expectedReturn: number;
  maxDrawdown: number;
}

export interface OptimizationResult {
  expectedApy: number;
  expectedRisk: number;
  allocations: {
    protocolId: string;
    assetId: string;
    percentage: number;
    expectedApy: number;
  }[];
}

export interface User {
  accountId: string;
  portfolio: Portfolio;
  riskProfile: RiskProfile;
}

export type WalletType = 'near' | 'metamask';

export interface WalletInfo {
  type: WalletType;
  address: string;
  isConnected: boolean;
}

// Add TypeScript definitions for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (request: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, listener: (...args: any[]) => void) => void;
      removeListener: (eventName: string, listener: (...args: any[]) => void) => void;
      selectedAddress?: string;
      chainId?: string;
    };
  }
}