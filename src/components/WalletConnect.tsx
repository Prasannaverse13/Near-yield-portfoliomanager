import React, { useState, useEffect } from 'react';
import { Wallet, LogOut, AlertTriangle } from 'lucide-react';
import { useAppStore } from '../store';
import { signIn, signOut } from '../utils/near';
import { connectMetaMask, disconnectMetaMask, isMetaMaskInstalled } from '../utils/metamask';
import { WalletType } from '../types';

const WalletConnect: React.FC = () => {
  const { isAuthenticated, accountId, walletInfo, setWalletInfo, checkAuth, darkMode } = useAppStore();
  const [showWalletOptions, setShowWalletOptions] = useState<boolean>(false);
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  const handleConnectWallet = async (walletType: WalletType) => {
    if (walletType === 'near') {
      await signIn();
    } else if (walletType === 'metamask') {
      const address = await connectMetaMask();
      if (address) {
        setWalletInfo({
          type: 'metamask',
          address,
          isConnected: true
        });
      }
    }
    setShowWalletOptions(false);
  };
  
  const handleDisconnectWallet = async () => {
    if (walletInfo?.type === 'near') {
      await signOut();
    } else if (walletInfo?.type === 'metamask') {
      disconnectMetaMask();
      setWalletInfo(null);
    }
  };
  
  const formatAddress = (address: string | null, type: WalletType): string => {
    if (!address) return '';
    
    if (type === 'metamask') {
      return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }
    
    return address;
  };
  
  return (
    <div className="relative">
      {isAuthenticated && accountId ? (
        <div className="flex items-center">
          <div className="mr-4 flex items-center">
            <Wallet className="h-5 w-5 mr-2" />
            <span className="text-sm font-medium truncate max-w-[150px]">
              {formatAddress(accountId, walletInfo?.type || 'near')}
              {walletInfo?.type === 'metamask' && (
                <span className="ml-1 text-xs bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded">
                  MetaMask
                </span>
              )}
              {walletInfo?.type === 'near' && (
                <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                  NEAR
                </span>
              )}
            </span>
          </div>
          
          <button
            onClick={handleDisconnectWallet}
            className={`flex items-center ${darkMode ? 'bg-indigo-800 hover:bg-indigo-900' : 'bg-indigo-700 hover:bg-indigo-800'} px-4 py-2 rounded-md text-sm font-medium text-white`}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Disconnect
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setShowWalletOptions(!showWalletOptions)}
            className={`flex items-center ${darkMode ? 'bg-indigo-800 hover:bg-indigo-900' : 'bg-indigo-700 hover:bg-indigo-800'} px-4 py-2 rounded-md text-sm font-medium text-white`}
          >
            <Wallet className="h-4 w-4 mr-2" />
            Connect Wallet
          </button>
          
          {showWalletOptions && (
            <div className={`absolute right-0 mt-2 w-64 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-md shadow-lg z-10`}>
              <div className="p-4">
                <h3 className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Select Wallet</h3>
                
                <button
                  onClick={() => handleConnectWallet('near')}
                  className={`w-full flex items-center justify-between p-3 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} mb-2`}
                >
                  <div className="flex items-center">
                    <img 
                      src="https://near.org/wp-content/uploads/2021/09/brand-icon.png" 
                      alt="NEAR Wallet" 
                      className="w-6 h-6 mr-3"
                    />
                    <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>NEAR Wallet</span>
                  </div>
                </button>
                
                <button
                  onClick={() => handleConnectWallet('metamask')}
                  disabled={!isMetaMaskInstalled()}
                  className={`w-full flex items-center justify-between p-3 rounded-md ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <div className="flex items-center">
                    <img 
                      src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" 
                      alt="MetaMask" 
                      className="w-6 h-6 mr-3"
                    />
                    <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>MetaMask</span>
                  </div>
                </button>
                
                {!isMetaMaskInstalled() && (
                  <div className={`mt-2 flex items-start p-2 ${darkMode ? 'bg-yellow-900' : 'bg-yellow-50'} rounded-md`}>
                    <AlertTriangle className={`h-4 w-4 ${darkMode ? 'text-yellow-400' : 'text-yellow-500'} mr-2 mt-0.5 flex-shrink-0`} />
                    <p className={`text-xs ${darkMode ? 'text-yellow-300' : 'text-yellow-700'}`}>
                      MetaMask is not installed. Please install the MetaMask extension to use this feature.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WalletConnect;