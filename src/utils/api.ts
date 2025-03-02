import axios from 'axios';
import { Protocol, Asset, Portfolio, OptimizationResult } from '../types';

const API_BASE_URL = 'https://api.nearyieldoptimizer.near';
const INDEXER_API_KEY = 'FD0AC079D58448F38EA347A371C29F10';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-API-KEY': INDEXER_API_KEY
  }
});

// Fetch all supported protocols
export const fetchProtocols = async (): Promise<Protocol[]> => {
  // In a real app, this would call the actual API
  // For now, we'll return mock data
  return [
    {
      id: 'ref-finance',
      name: 'Ref Finance',
      icon: 'https://cryptologos.cc/logos/ref-finance-ref-logo.png',
      description: 'Leading AMM on NEAR Protocol',
      apy: 12.5,
      tvl: 45000000,
      risk: 'medium',
      type: 'yield-farming'
    },
    {
      id: 'burrow',
      name: 'Burrow',
      icon: 'https://cryptologos.cc/logos/burrow-brw-logo.png',
      description: 'Lending and borrowing protocol on NEAR',
      apy: 8.2,
      tvl: 32000000,
      risk: 'medium',
      type: 'lending'
    },
    {
      id: 'bastion',
      name: 'Bastion',
      icon: 'https://cryptologos.cc/logos/bastion-bstn-logo.png',
      description: 'Money market protocol on Aurora (NEAR)',
      apy: 9.7,
      tvl: 28000000,
      risk: 'medium',
      type: 'lending'
    },
    {
      id: 'meta-pool',
      name: 'Meta Pool',
      icon: 'https://cryptologos.cc/logos/meta-pool-meta-logo.png',
      description: 'Liquid staking for NEAR',
      apy: 5.8,
      tvl: 65000000,
      risk: 'low',
      type: 'staking'
    },
    {
      id: 'jumbo',
      name: 'Jumbo Exchange',
      icon: 'https://cryptologos.cc/logos/jumbo-exchange-jumbo-logo.png',
      description: 'DEX on NEAR Protocol',
      apy: 15.3,
      tvl: 18000000,
      risk: 'high',
      type: 'yield-farming'
    }
  ];
};

// Fetch user assets
export const fetchUserAssets = async (accountId: string): Promise<Asset[]> => {
  // In a real app, this would call the actual API
  // For now, we'll return mock data
  return [
    {
      id: 'near',
      symbol: 'NEAR',
      name: 'NEAR Protocol',
      icon: 'https://cryptologos.cc/logos/near-protocol-near-logo.png',
      balance: 120.5,
      price: 3.45,
      change24h: 2.3
    },
    {
      id: 'usn',
      symbol: 'USN',
      name: 'USN Stablecoin',
      icon: 'https://cryptologos.cc/logos/usn-usn-logo.png',
      balance: 500,
      price: 1.0,
      change24h: 0.01
    },
    {
      id: 'aurora',
      symbol: 'AURORA',
      name: 'Aurora',
      icon: 'https://cryptologos.cc/logos/aurora-aurora-logo.png',
      balance: 1000,
      price: 0.18,
      change24h: -1.2
    },
    {
      id: 'ref',
      symbol: 'REF',
      name: 'Ref Finance',
      icon: 'https://cryptologos.cc/logos/ref-finance-ref-logo.png',
      balance: 250,
      price: 0.42,
      change24h: 5.7
    }
  ];
};

// Fetch user portfolio
export const fetchUserPortfolio = async (accountId: string): Promise<Portfolio> => {
  // In a real app, this would call the actual API
  // For now, we'll return mock data
  return {
    totalValue: 2500,
    assets: [
      {
        protocolId: 'ref-finance',
        assetId: 'near',
        amount: 50,
        value: 172.5,
        apy: 12.5
      },
      {
        protocolId: 'burrow',
        assetId: 'usn',
        amount: 300,
        value: 300,
        apy: 8.2
      },
      {
        protocolId: 'meta-pool',
        assetId: 'near',
        amount: 70.5,
        value: 243.23,
        apy: 5.8
      }
    ]
  };
};

// Optimize portfolio based on risk profile
export const optimizePortfolio = async (
  accountId: string,
  riskLevel: number
): Promise<OptimizationResult> => {
  // In a real app, this would call the actual AI optimization API
  // For now, we'll return mock data
  return {
    expectedApy: 9.8,
    expectedRisk: 4.2,
    allocations: [
      {
        protocolId: 'meta-pool',
        assetId: 'near',
        percentage: 30,
        expectedApy: 5.8
      },
      {
        protocolId: 'burrow',
        assetId: 'usn',
        percentage: 25,
        expectedApy: 8.2
      },
      {
        protocolId: 'ref-finance',
        assetId: 'near',
        percentage: 20,
        expectedApy: 12.5
      },
      {
        protocolId: 'bastion',
        assetId: 'aurora',
        percentage: 15,
        expectedApy: 9.7
      },
      {
        protocolId: 'jumbo',
        assetId: 'ref',
        percentage: 10,
        expectedApy: 15.3
      }
    ]
  };
};

// Execute portfolio rebalancing
export const executeRebalance = async (
  accountId: string,
  allocations: any[]
): Promise<boolean> => {
  // In a real app, this would call the actual API to execute transactions
  // For now, we'll simulate success
  console.log('Executing rebalance for', accountId, 'with allocations:', allocations);
  return true;
};