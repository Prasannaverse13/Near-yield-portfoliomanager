import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';

// Check if MetaMask is installed
export const isMetaMaskInstalled = (): boolean => {
  return typeof window !== 'undefined' && window.ethereum !== undefined;
};

// Get Ethereum provider
export const getProvider = (): Web3Provider | null => {
  if (!isMetaMaskInstalled()) {
    return null;
  }
  
  return new ethers.providers.Web3Provider(window.ethereum);
};

// Connect to MetaMask
export const connectMetaMask = async (): Promise<string | null> => {
  try {
    if (!isMetaMaskInstalled()) {
      alert('MetaMask is not installed. Please install MetaMask to use this feature.');
      return null;
    }
    
    const provider = getProvider();
    if (!provider) return null;
    
    // Request account access
    const accounts = await provider.send('eth_requestAccounts', []);
    
    if (accounts.length === 0) {
      console.error('No accounts found');
      return null;
    }
    
    return accounts[0];
  } catch (error) {
    console.error('Error connecting to MetaMask:', error);
    return null;
  }
};

// Disconnect from MetaMask
export const disconnectMetaMask = (): void => {
  // MetaMask doesn't have a disconnect method
  // We can just clear our local state
  console.log('Disconnected from MetaMask');
};

// Get connected account
export const getConnectedAccount = async (): Promise<string | null> => {
  try {
    if (!isMetaMaskInstalled()) {
      return null;
    }
    
    const provider = getProvider();
    if (!provider) return null;
    
    const accounts = await provider.listAccounts();
    
    if (accounts.length === 0) {
      return null;
    }
    
    return accounts[0];
  } catch (error) {
    console.error('Error getting connected account:', error);
    return null;
  }
};

// Check if connected to MetaMask
export const isConnectedToMetaMask = async (): Promise<boolean> => {
  const account = await getConnectedAccount();
  return account !== null;
};

// Get network information
export const getNetworkInfo = async (): Promise<{ chainId: number; name: string } | null> => {
  try {
    if (!isMetaMaskInstalled()) {
      return null;
    }
    
    const provider = getProvider();
    if (!provider) return null;
    
    const network = await provider.getNetwork();
    return {
      chainId: network.chainId,
      name: network.name
    };
  } catch (error) {
    console.error('Error getting network info:', error);
    return null;
  }
};

// Sign a message with MetaMask
export const signMessage = async (message: string): Promise<string | null> => {
  try {
    if (!isMetaMaskInstalled()) {
      return null;
    }
    
    const provider = getProvider();
    if (!provider) return null;
    
    const signer = provider.getSigner();
    const signature = await signer.signMessage(message);
    
    return signature;
  } catch (error) {
    console.error('Error signing message:', error);
    return null;
  }
};

// Add event listeners for account and chain changes
export const addMetaMaskEventListeners = (
  onAccountsChanged: (accounts: string[]) => void,
  onChainChanged: (chainId: string) => void
): void => {
  if (!isMetaMaskInstalled()) {
    return;
  }
  
  window.ethereum.on('accountsChanged', onAccountsChanged);
  window.ethereum.on('chainChanged', onChainChanged);
};

// Remove event listeners
export const removeMetaMaskEventListeners = (
  onAccountsChanged: (accounts: string[]) => void,
  onChainChanged: (chainId: string) => void
): void => {
  if (!isMetaMaskInstalled()) {
    return;
  }
  
  window.ethereum.removeListener('accountsChanged', onAccountsChanged);
  window.ethereum.removeListener('chainChanged', onChainChanged);
};