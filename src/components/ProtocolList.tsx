import React from 'react';
import { ExternalLink, TrendingUp, DollarSign, AlertTriangle } from 'lucide-react';
import { useAppStore } from '../store';
import { Protocol } from '../types';

const ProtocolList: React.FC = () => {
  const { protocols, isLoading, darkMode } = useAppStore();
  
  if (isLoading) {
    return (
      <div className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg shadow-md p-6 animate-pulse`}>
        <div className={`h-6 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded w-1/4 mb-4`}></div>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`h-20 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded`}></div>
          ))}
        </div>
      </div>
    );
  }
  
  const getRiskBadge = (risk: Protocol['risk']) => {
    const colors = {
      low: darkMode 
        ? 'bg-green-900 text-green-200' 
        : 'bg-green-100 text-green-800',
      medium: darkMode 
        ? 'bg-yellow-900 text-yellow-200' 
        : 'bg-yellow-100 text-yellow-800',
      high: darkMode 
        ? 'bg-red-900 text-red-200' 
        : 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`${colors[risk]} text-xs font-medium px-2 py-1 rounded`}>
        {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
      </span>
    );
  };
  
  const getTypeBadge = (type: Protocol['type']) => {
    const colors = {
      'lending': darkMode 
        ? 'bg-blue-900 text-blue-200' 
        : 'bg-blue-100 text-blue-800',
      'staking': darkMode 
        ? 'bg-purple-900 text-purple-200' 
        : 'bg-purple-100 text-purple-800',
      'yield-farming': darkMode 
        ? 'bg-indigo-900 text-indigo-200' 
        : 'bg-indigo-100 text-indigo-800'
    };
    
    const labels = {
      'lending': 'Lending',
      'staking': 'Staking',
      'yield-farming': 'Yield Farming'
    };
    
    return (
      <span className={`${colors[type]} text-xs font-medium px-2 py-1 rounded`}>
        {labels[type]}
      </span>
    );
  };
  
  return (
    <div className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg shadow-md p-6`}>
      <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-700'} mb-4`}>Supported Protocols</h2>
      
      <div className="space-y-4">
        {protocols.map((protocol) => (
          <div key={protocol.id} className={`${darkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-200 hover:bg-gray-50'} border rounded-lg p-4 hover:shadow-md transition-shadow`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={protocol.icon} alt={protocol.name} className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <h3 className={`text-md font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{protocol.name}</h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{protocol.description}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                {getRiskBadge(protocol.risk)}
                {getTypeBadge(protocol.type)}
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : ''}`}>{protocol.apy.toFixed(1)}% APY</span>
                </div>
                
                <div className="flex items-center">
                  <DollarSign className="h-4 w-4 text-blue-500 mr-1" />
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : ''}`}>${(protocol.tvl / 1000000).toFixed(1)}M TVL</span>
                </div>
              </div>
              
              <a
                href={`https://near.org/near/${protocol.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`${darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-800'} text-sm font-medium flex items-center`}
              >
                View Protocol <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProtocolList;