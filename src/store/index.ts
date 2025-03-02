import { create } from 'zustand';
import { Protocol, Asset, Portfolio, RiskProfile, OptimizationResult, WalletType, WalletInfo } from '../types';
import { fetchProtocols, fetchUserAssets, fetchUserPortfolio, optimizePortfolio } from '../utils/api';
import { getAccountId, isSignedIn } from '../utils/near';
import { isConnectedToMetaMask, getConnectedAccount } from '../utils/metamask';

interface AppState {
  // Authentication
  isAuthenticated: boolean;
  accountId: string | null;
  walletInfo: WalletInfo | null;
  
  // Data
  protocols: Protocol[];
  assets: Asset[];
  portfolio: Portfolio | null;
  riskProfile: RiskProfile | null;
  optimizationResult: OptimizationResult | null;
  
  // UI state
  isLoading: boolean;
  activeTab: string;
  darkMode: boolean;
  
  // Actions
  checkAuth: () => Promise<void>;
  setWalletInfo: (info: WalletInfo | null) => void;
  fetchProtocols: () => Promise<void>;
  fetchUserAssets: () => Promise<void>;
  fetchUserPortfolio: () => Promise<void>;
  setRiskProfile: (profile: RiskProfile) => void;
  optimizePortfolio: (riskLevel: number) => Promise<void>;
  setActiveTab: (tab: string) => void;
  toggleDarkMode: () => void;
}

const defaultRiskProfiles: RiskProfile[] = [
  {
    id: 'conservative',
    name: 'Conservative',
    description: 'Low risk, stable returns',
    riskLevel: 2,
    expectedReturn: 5,
    maxDrawdown: 5
  },
  {
    id: 'balanced',
    name: 'Balanced',
    description: 'Moderate risk and returns',
    riskLevel: 5,
    expectedReturn: 10,
    maxDrawdown: 15
  },
  {
    id: 'aggressive',
    name: 'Aggressive',
    description: 'High risk, high potential returns',
    riskLevel: 8,
    expectedReturn: 18,
    maxDrawdown: 30
  }
];

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  isAuthenticated: false,
  accountId: null,
  walletInfo: null,
  protocols: [],
  assets: [],
  portfolio: null,
  riskProfile: defaultRiskProfiles[1], // Default to balanced
  optimizationResult: null,
  isLoading: false,
  activeTab: 'dashboard',
  darkMode: false,
  
  // Actions
  checkAuth: async () => {
    try {
      // Check NEAR wallet first
      const nearAuthenticated = await isSignedIn();
      const nearAccountId = nearAuthenticated ? await getAccountId() : null;
      
      // Check MetaMask
      const metamaskConnected = await isConnectedToMetaMask();
      const metamaskAccount = metamaskConnected ? await getConnectedAccount() : null;
      
      // Determine which wallet to use
      if (nearAuthenticated && nearAccountId) {
        set({ 
          isAuthenticated: true, 
          accountId: nearAccountId,
          walletInfo: {
            type: 'near',
            address: nearAccountId,
            isConnected: true
          }
        });
        
        // Load user data
        get().fetchProtocols();
        get().fetchUserAssets();
        get().fetchUserPortfolio();
      } else if (metamaskConnected && metamaskAccount) {
        set({ 
          isAuthenticated: true, 
          accountId: metamaskAccount,
          walletInfo: {
            type: 'metamask',
            address: metamaskAccount,
            isConnected: true
          }
        });
        
        // Load user data
        get().fetchProtocols();
        get().fetchUserAssets();
        get().fetchUserPortfolio();
      } else {
        set({ 
          isAuthenticated: false, 
          accountId: null,
          walletInfo: null
        });
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      set({ 
        isAuthenticated: false, 
        accountId: null,
        walletInfo: null
      });
    }
  },
  
  setWalletInfo: (info: WalletInfo | null) => {
    set({ 
      walletInfo: info,
      isAuthenticated: info !== null && info.isConnected,
      accountId: info?.address || null
    });
    
    if (info && info.isConnected) {
      // Load user data
      get().fetchProtocols();
      get().fetchUserAssets();
      get().fetchUserPortfolio();
    }
  },
  
  fetchProtocols: async () => {
    set({ isLoading: true });
    try {
      const protocols = await fetchProtocols();
      set({ protocols });
    } catch (error) {
      console.error('Error fetching protocols:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  
  fetchUserAssets: async () => {
    const { accountId } = get();
    if (!accountId) return;
    
    set({ isLoading: true });
    try {
      const assets = await fetchUserAssets(accountId);
      set({ assets });
    } catch (error) {
      console.error('Error fetching user assets:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  
  fetchUserPortfolio: async () => {
    const { accountId } = get();
    if (!accountId) return;
    
    set({ isLoading: true });
    try {
      const portfolio = await fetchUserPortfolio(accountId);
      set({ portfolio });
    } catch (error) {
      console.error('Error fetching user portfolio:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  
  setRiskProfile: (profile: RiskProfile) => {
    set({ riskProfile: profile });
  },
  
  optimizePortfolio: async (riskLevel: number) => {
    const { accountId } = get();
    if (!accountId) return;
    
    set({ isLoading: true });
    try {
      const result = await optimizePortfolio(accountId, riskLevel);
      set({ optimizationResult: result });
    } catch (error) {
      console.error('Error optimizing portfolio:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  
  setActiveTab: (tab: string) => {
    set({ activeTab: tab });
  },
  
  toggleDarkMode: () => {
    const newDarkMode = !get().darkMode;
    set({ darkMode: newDarkMode });
    
    // Apply dark mode to document
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}));