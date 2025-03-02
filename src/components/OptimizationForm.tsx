import React, { useState } from 'react';
import { Sliders, TrendingUp, AlertTriangle, Check, Brain } from 'lucide-react';
import { useAppStore } from '../store';
import { RiskProfile } from '../types';

const OptimizationForm: React.FC = () => {
  const { riskProfile, setRiskProfile, optimizePortfolio, isLoading } = useAppStore();
  const [customRiskLevel, setCustomRiskLevel] = useState<number>(riskProfile?.riskLevel || 5);
  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  
  const riskProfiles: RiskProfile[] = [
    {
      id: 'conservative',
      name: 'Conservative',
      description: 'Low risk, stable returns',
      riskLevel: 2,
      expectedReturn: 5,
      maxDrawdown: 5
    },
    {
      id: 'balanced',
      name: 'Balanced',
      description: 'Moderate risk and returns',
      riskLevel: 5,
      expectedReturn: 10,
      maxDrawdown: 15
    },
    {
      id: 'aggressive',
      name: 'Aggressive',
      description: 'High risk, high potential returns',
      riskLevel: 8,
      expectedReturn: 18,
      maxDrawdown: 30
    }
  ];
  
  const handleProfileSelect = (profile: RiskProfile) => {
    setRiskProfile(profile);
    setCustomRiskLevel(profile.riskLevel);
  };
  
  const handleCustomRiskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setCustomRiskLevel(value);
    
    // Find closest profile or create custom
    const closestProfile = riskProfiles.reduce((prev, curr) => {
      return Math.abs(curr.riskLevel - value) < Math.abs(prev.riskLevel - value) ? curr : prev;
    });
    
    if (Math.abs(closestProfile.riskLevel - value) <= 1) {
      setRiskProfile(closestProfile);
    } else {
      setRiskProfile({
        id: 'custom',
        name: 'Custom',
        description: 'Personalized risk profile',
        riskLevel: value,
        expectedReturn: value * 2,
        maxDrawdown: value * 3
      });
    }
  };
  
  const handleOptimize = async () => {
    setIsOptimizing(true);
    await optimizePortfolio(customRiskLevel);
    setIsOptimizing(false);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Brain className="h-5 w-5 text-indigo-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-700">AI Agent Portfolio Optimization</h2>
      </div>
      
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-4">
          Our advanced AI agent will analyze market conditions and your risk tolerance to find the optimal allocation across NEAR DeFi protocols.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {riskProfiles.map((profile) => (
            <div
              key={profile.id}
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                riskProfile?.id === profile.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-indigo-300'
              }`}
              onClick={() => handleProfileSelect(profile)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium text-gray-900">{profile.name}</h3>
                {riskProfile?.id === profile.id && (
                  <Check className="h-4 w-4 text-indigo-600" />
                )}
              </div>
              <p className="text-sm text-gray-500 mb-3">{profile.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Risk Level: {profile.riskLevel}/10</span>
                <span className="text-gray-600">~{profile.expectedReturn}% Return</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fine-tune Risk Level: {customRiskLevel}/10
          </label>
          <input
            type="range"
            min="1"
            max="10"
            step="1"
            value={customRiskLevel}
            onChange={handleCustomRiskChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Conservative</span>
            <span>Balanced</span>
            <span>Aggressive</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between bg-indigo-50 p-4 rounded-lg mb-6">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-indigo-600 mr-2 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-indigo-900">AI Agent Risk Assessment</h4>
              <p className="text-xs text-indigo-700">
                Higher risk levels may lead to greater volatility. The AI agent will balance risk and reward based on your preferences and current market conditions.
              </p>
            </div>
          </div>
        </div>
        
        <button
          onClick={handleOptimize}
          disabled={isLoading || isOptimizing}
          className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:bg-indigo-300"
        >
          {isOptimizing ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              AI Agent Analyzing...
            </>
          ) : (
            <>
              <Brain className="h-5 w-5 mr-2" />
              Run AI Optimization
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default OptimizationForm;