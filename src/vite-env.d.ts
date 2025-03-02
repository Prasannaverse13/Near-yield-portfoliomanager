/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NEAR_NETWORK_ID: string;
  readonly VITE_NEAR_NODE_URL: string;
  readonly VITE_NEAR_WALLET_URL: string;
  readonly VITE_NEAR_HELPER_URL: string;
  readonly VITE_NEAR_EXPLORER_URL: string;
  readonly VITE_NEAR_CONTRACT_ID: string;
  readonly VITE_NEAR_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    request: (request: { method: string; params?: any[] }) => Promise<any>;
    on: (eventName: string, listener: (...args: any[]) => void) => void;
    removeListener: (eventName: string, listener: (...args: any[]) => void) => void;
    selectedAddress?: string;
    chainId?: string;
  };
  global?: any;
  process?: any;
  Buffer?: any;
}