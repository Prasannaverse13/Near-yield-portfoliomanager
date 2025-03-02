import { connect, keyStores, WalletConnection } from 'near-api-js';

// Ensure process is defined
if (typeof window !== 'undefined' && !window.process) {
  window.process = { 
    env: { NODE_ENV: 'production' },
    version: '',
    nextTick: (cb: Function) => setTimeout(cb, 0)
  } as any;
}

// Configuration for connecting to NEAR
const config = {
  networkId: 'mainnet',
  nodeUrl: 'https://rpc.mainnet.near.org',
  walletUrl: 'https://wallet.near.org',
  helperUrl: 'https://helper.mainnet.near.org',
  explorerUrl: 'https://explorer.near.org',
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  headers: { 'NEAR-API-KEY': 'FD0AC079D58448F38EA347A371C29F10' }
};

// Initialize connection to the NEAR blockchain
export async function initNear() {
  try {
    const near = await connect(config);
    const wallet = new WalletConnection(near, 'near-yield-optimizer');
    return { near, wallet };
  } catch (error) {
    console.error("Failed to initialize NEAR connection:", error);
    // Return a mock wallet for development purposes
    return {
      near: null,
      wallet: {
        isSignedIn: () => false,
        getAccountId: () => null,
        requestSignIn: () => console.log("Sign in requested"),
        signOut: () => console.log("Sign out requested"),
        account: () => ({
          functionCall: () => Promise.resolve({}),
          viewFunction: () => Promise.resolve({}),
        }),
      }
    };
  }
}

// Sign in with NEAR wallet
export async function signIn() {
  try {
    const { wallet } = await initNear();
    wallet.requestSignIn({
      contractId: 'app.nearyieldoptimizer.near',
      methodNames: ['optimize_portfolio', 'rebalance_portfolio']
    });
  } catch (error) {
    console.error("Error during sign in:", error);
  }
}

// Sign out from NEAR wallet
export async function signOut() {
  try {
    const { wallet } = await initNear();
    wallet.signOut();
    window.location.replace(window.location.origin + window.location.pathname);
  } catch (error) {
    console.error("Error during sign out:", error);
  }
}

// Get account ID if signed in
export async function getAccountId() {
  try {
    const { wallet } = await initNear();
    if (wallet.isSignedIn()) {
      return wallet.getAccountId();
    }
    return null;
  } catch (error) {
    console.error("Error getting account ID:", error);
    return null;
  }
}

// Check if user is signed in
export async function isSignedIn() {
  try {
    const { wallet } = await initNear();
    return wallet.isSignedIn();
  } catch (error) {
    console.error("Error checking sign in status:", error);
    return false;
  }
}

// Call a view method on a NEAR contract
export async function callViewMethod(contractId: string, method: string, args = {}) {
  try {
    const { near } = await initNear();
    if (!near) return null;
    
    const account = await near.account('dummy.near');
    
    return await account.viewFunction({
      contractId,
      methodName: method,
      args
    });
  } catch (error) {
    console.error(`Error calling view method ${method} on ${contractId}:`, error);
    return null;
  }
}

// Call a change method on a NEAR contract (requires signing)
export async function callChangeMethod(contractId: string, method: string, args = {}, gas = '300000000000000', deposit = '0') {
  try {
    const { wallet } = await initNear();
    
    if (!wallet.isSignedIn()) {
      throw new Error('User is not signed in');
    }
    
    return await wallet.account().functionCall({
      contractId,
      methodName: method,
      args,
      gas,
      attachedDeposit: deposit
    });
  } catch (error) {
    console.error(`Error calling change method ${method} on ${contractId}:`, error);
    throw error;
  }
}