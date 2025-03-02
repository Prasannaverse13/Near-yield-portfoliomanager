import React, { useEffect } from 'react';
import { useAppStore } from '../store';
import PortfolioSummary from '../components/PortfolioSummary';
import AssetList from '../components/AssetList';
import ProtocolList from '../components/ProtocolList';
import WalletDetails from '../components/WalletDetails';
import { Brain } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { 
    isAuthenticated, 
    fetchProtocols, 
    fetchUserAssets, 
    fetchUserPortfolio,
    setActiveTab,
    walletInfo,
    darkMode
  } = useAppStore();
  
  useEffect(() => {
    setActiveTab('dashboard');
    
    if (isAuthenticated) {
      fetchProtocols();
      fetchUserAssets();
      fetchUserPortfolio();
    }
  }, [isAuthenticated, fetchProtocols, fetchUserAssets, fetchUserPortfolio, setActiveTab]);
  
  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Welcome to NEAR Yield Optimizer</h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
            Connect your wallet to start optimizing your DeFi portfolio.
          </p>
          <div className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg shadow-md p-8 max-w-2xl mx-auto`}>
            <div className="flex items-center justify-center mb-4">
              <Brain className={`h-8 w-8 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-2`} />
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>AI Agent for DeFi Optimization</h2>
            </div>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-6`}>
              Our platform uses an advanced AI agent to analyze NEAR DeFi protocols and find the optimal allocation strategy based on your risk profile.
            </p>
            <ul className="space-y-3 text-left mb-6">
              <li className="flex items-start">
                <span className={`${darkMode ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800'} rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5`}>1</span>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Connect your wallet (NEAR or MetaMask)</span>
              </li>
              <li className="flex items-start">
                <span className={`${darkMode ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800'} rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5`}>2</span>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Set your risk preferences</span>
              </li>
              <li className="flex items-start">
                <span className={`${darkMode ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800'} rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5`}>3</span>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Let our AI agent find the best yield opportunities</span>
              </li>
              <li className="flex items-start">
                <span className={`${darkMode ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800'} rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5`}>4</span>
                <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>Execute the optimal strategy with one click</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Dashboard</h1>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PortfolioSummary />
          </div>
          <div className="lg:col-span-1">
            <WalletDetails />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AssetList />
          <ProtocolList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;