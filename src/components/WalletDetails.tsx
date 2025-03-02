import React, { useEffect, useState } from 'react';
import { Wallet, ExternalLink, RefreshCw } from 'lucide-react';
import { useAppStore } from '../store';
import { getNetworkInfo } from '../utils/metamask';

const WalletDetails: React.FC = () => {
  const { walletInfo, darkMode } = useAppStore();
  const [networkInfo, setNetworkInfo] = useState<{ chainId: number; name: string } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  useEffect(() => {
    if (walletInfo?.type === 'metamask') {
      fetchNetworkInfo();
    }
  }, [walletInfo]);
  
  const fetchNetworkInfo = async () => {
    if (walletInfo?.type !== 'metamask') return;
    
    setIsLoading(true);
    try {
      const info = await getNetworkInfo();
      setNetworkInfo(info);
    } catch (error) {
      console.error('Error fetching network info:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  if (!walletInfo) return null;
  
  const getWalletExplorerUrl = () => {
    if (walletInfo.type === 'near') {
      return `https://explorer.near.org/accounts/${walletInfo.address}`;
    } else if (walletInfo.type === 'metamask') {
      // Default to Ethereum mainnet, but could be adjusted based on network info
      return `https://etherscan.io/address/${walletInfo.address}`;
    }
    return '#';
  };
  
  const getNetworkName = () => {
    if (walletInfo.type === 'near') {
      return 'NEAR Mainnet';
    } else if (walletInfo.type === 'metamask' && networkInfo) {
      return networkInfo.name === 'homestead' ? 'Ethereum Mainnet' : networkInfo.name;
    }
    return 'Unknown Network';
  };
  
  const formatAddress = (address: string): string => {
    if (walletInfo.type === 'metamask') {
      return `${address.substring(0, 8)}...${address.substring(address.length - 8)}`;
    }
    return address;
  };
  
  return (
    <div className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg shadow-md p-6`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-700'}`}>Wallet Details</h2>
        {walletInfo.type === 'metamask' && (
          <button 
            onClick={fetchNetworkInfo}
            className={`${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'}`}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        )}
      </div>
      
      <div className="space-y-4">
        <div className={`flex items-center justify-between p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
          <div className="flex items-center">
            <Wallet className={`h-5 w-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Wallet Type</span>
          </div>
          <span className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>
            {walletInfo.type === 'near' ? 'NEAR Wallet' : 'MetaMask'}
          </span>
        </div>
        
        <div className={`flex items-center justify-between p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
          <div className="flex items-center">
            <svg className={`h-5 w-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 9L12 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M3 12C3 4.5885 4.5885 3 12 3C19.4115 3 21 4.5885 21 12C21 19.4115 19.4115 21 12 21C4.5885 21 3 19.4115 3 12Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Network</span>
          </div>
          <span className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-900'}`}>{getNetworkName()}</span>
        </div>
        
        <div className={`flex items-center justify-between p-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg`}>
          <div className="flex items-center">
            <svg className={`h-5 w-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L12 2L9 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 2V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 10L4 14L8 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 14H15C16.3261 14 17.5979 14.5268 18.5355 15.4645C19.4732 16.4021 20 17.6739 20 19V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Address</span>
          </div>
          <div className="flex items-center">
            <span className={`text-sm ${darkMode ? 'text-gray-200' : 'text-gray-900'} mr-2`}>{formatAddress(walletInfo.address)}</span>
            <a 
              href={getWalletExplorerUrl()} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'}`}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletDetails;