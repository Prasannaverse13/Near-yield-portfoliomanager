import React, { useEffect } from 'react';
import { useAppStore } from '../store';
import ProtocolList from '../components/ProtocolList';
import { Brain } from 'lucide-react';

const Protocols: React.FC = () => {
  const { fetchProtocols, setActiveTab } = useAppStore();
  
  useEffect(() => {
    setActiveTab('protocols');
    fetchProtocols();
  }, [fetchProtocols, setActiveTab]);
  
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Supported Protocols</h1>
      
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <Brain className="h-5 w-5 text-indigo-600 mr-2" />
            <h2 className="text-lg font-semibold text-gray-700">AI Agent Protocol Analysis</h2>
          </div>
          <p className="text-gray-600 mb-4">
            NEAR Protocol has a growing ecosystem of DeFi protocols that offer various yield-generating opportunities. Our AI agent continuously analyzes these protocols to find the optimal allocation strategy based on your risk profile.
          </p>
          <p className="text-gray-600">
            Below is a list of supported protocols that our AI agent can interact with. We continuously monitor these protocols for the best yield opportunities.
          </p>
        </div>
        
        <ProtocolList />
      </div>
    </div>
  );
};

export default Protocols;