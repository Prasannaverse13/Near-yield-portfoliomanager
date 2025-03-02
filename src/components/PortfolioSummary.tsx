import React from 'react';
import { ArrowUpRight, ArrowDownRight, DollarSign } from 'lucide-react';
import { useAppStore } from '../store';

const PortfolioSummary: React.FC = () => {
  const { portfolio, assets, darkMode } = useAppStore();
  
  if (!portfolio) {
    return (
      <div className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg shadow-md p-6 animate-pulse`}>
        <div className={`h-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-1/4 mb-4`}></div>
        <div className={`h-10 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-1/2 mb-6`}></div>
        <div className="grid grid-cols-3 gap-4">
          <div className={`h-24 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
          <div className={`h-24 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
          <div className={`h-24 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
        </div>
      </div>
    );
  }
  
  // Calculate portfolio metrics
  const totalValue = portfolio.totalValue;
  const totalApy = portfolio.assets.reduce(
    (sum, asset) => sum + (asset.value / totalValue) * asset.apy,
    0
  );
  
  // Calculate 24h change
  const totalChange24h = assets.reduce(
    (sum, asset) => {
      const assetInPortfolio = portfolio.assets.find(a => a.assetId === asset.id);
      if (assetInPortfolio) {
        return sum + (asset.change24h * assetInPortfolio.value / totalValue);
      }
      return sum;
    },
    0
  );
  
  const isPositiveChange = totalChange24h >= 0;
  
  return (
    <div className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg shadow-md p-6`}>
      <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-700'} mb-2`}>Portfolio Summary</h2>
      
      <div className="mb-6">
        <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        <div className="flex items-center mt-1">
          {isPositiveChange ? (
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={`text-sm font-medium ${isPositiveChange ? 'text-green-500' : 'text-red-500'}`}>
            {Math.abs(totalChange24h).toFixed(2)}% (24h)
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={`${darkMode ? 'bg-indigo-900' : 'bg-indigo-50'} rounded-lg p-4`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-sm font-medium ${darkMode ? 'text-indigo-200' : 'text-indigo-700'}`}>Average APY</h3>
            <span className={`${darkMode ? 'bg-indigo-800 text-indigo-200' : 'bg-indigo-100 text-indigo-800'} text-xs font-medium px-2 py-1 rounded`}>Yield</span>
          </div>
          <p className={`text-2xl font-bold ${darkMode ? 'text-indigo-100' : 'text-indigo-900'}`}>{totalApy.toFixed(2)}%</p>
        </div>
        
        <div className={`${darkMode ? 'bg-green-900' : 'bg-green-50'} rounded-lg p-4`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-sm font-medium ${darkMode ? 'text-green-200' : 'text-green-700'}`}>Protocols</h3>
            <span className={`${darkMode ? 'bg-green-800 text-green-200' : 'bg-green-100 text-green-800'} text-xs font-medium px-2 py-1 rounded`}>Active</span>
          </div>
          <p className={`text-2xl font-bold ${darkMode ? 'text-green-100' : 'text-green-900'}`}>{new Set(portfolio.assets.map(a => a.protocolId)).size}</p>
        </div>
        
        <div className={`${darkMode ? 'bg-purple-900' : 'bg-purple-50'} rounded-lg p-4`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className={`text-sm font-medium ${darkMode ? 'text-purple-200' : 'text-purple-700'}`}>Assets</h3>
            <span className={`${darkMode ? 'bg-purple-800 text-purple-200' : 'bg-purple-100 text-purple-800'} text-xs font-medium px-2 py-1 rounded`}>Deployed</span>
          </div>
          <p className={`text-2xl font-bold ${darkMode ? 'text-purple-100' : 'text-purple-900'}`}>{new Set(portfolio.assets.map(a => a.assetId)).size}</p>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;