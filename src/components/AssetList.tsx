import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useAppStore } from '../store';

const AssetList: React.FC = () => {
  const { assets, isLoading, darkMode } = useAppStore();
  
  if (isLoading) {
    return (
      <div className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg shadow-md p-6 animate-pulse`}>
        <div className={`h-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-1/4 mb-4`}></div>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`h-16 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg shadow-md p-6`}>
      <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-700'} mb-4`}>Your Assets</h2>
      
      <div className="space-y-4">
        {assets.map((asset) => {
          const isPositive = asset.change24h >= 0;
          const totalValue = asset.balance * asset.price;
          
          return (
            <div key={asset.id} className={`${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} border rounded-lg p-4 hover:shadow-md transition-shadow`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img src={asset.icon} alt={asset.symbol} className="w-8 h-8 rounded-full mr-3" />
                  <div>
                    <h3 className={`text-md font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{asset.name}</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{asset.symbol}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`text-md font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                  <div className="flex items-center justify-end mt-1">
                    {isPositive ? (
                      <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                    )}
                    <span className={`text-xs font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                      {Math.abs(asset.change24h).toFixed(2)}% (24h)
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-3 flex items-center justify-between text-sm text-gray-500">
                <span className={darkMode ? 'text-gray-400' : ''}>{asset.balance.toLocaleString('en-US', { maximumFractionDigits: 6 })} {asset.symbol}</span>
                <span className={darkMode ? 'text-gray-400' : ''}>${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssetList;