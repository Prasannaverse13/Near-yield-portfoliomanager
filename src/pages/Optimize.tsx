import React, { useEffect } from 'react';
import { useAppStore } from '../store';
import OptimizationForm from '../components/OptimizationForm';
import OptimizationResult from '../components/OptimizationResult';
import { Brain } from 'lucide-react';

const Optimize: React.FC = () => {
  const { 
    isAuthenticated, 
    optimizationResult,
    fetchProtocols,
    fetchUserAssets,
    setActiveTab
  } = useAppStore();
  
  useEffect(() => {
    setActiveTab('optimize');
    
    if (isAuthenticated) {
      fetchProtocols();
      fetchUserAssets();
    }
  }, [isAuthenticated, fetchProtocols, fetchUserAssets, setActiveTab]);
  
  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          <div className="flex items-center justify-center mb-4">
            <Brain className="h-8 w-8 text-indigo-600 mr-2" />
            <h1 className="text-2xl font-bold text-gray-900">AI Portfolio Optimization</h1>
          </div>
          <p className="text-lg text-gray-600">
            Connect your wallet to access our AI agent for portfolio optimization.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <Brain className="h-6 w-6 text-indigo-600 mr-2" />
        <h1 className="text-2xl font-bold text-gray-900">AI Portfolio Optimization</h1>
      </div>
      
      <div className="space-y-6">
        <OptimizationForm />
        {optimizationResult && <OptimizationResult />}
      </div>
    </div>
  );
};

export default Optimize;