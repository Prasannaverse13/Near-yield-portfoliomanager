import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Check, AlertTriangle, TrendingUp, Brain } from 'lucide-react';
import { useAppStore } from '../store';
import { executeRebalance } from '../utils/api';

const OptimizationResult: React.FC = () => {
  const { optimizationResult, protocols, assets, accountId } = useAppStore();
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  
  if (!optimizationResult) {
    return null;
  }
  
  const handleExecute = async () => {
    if (!accountId) return;
    
    setIsExecuting(true);
    try {
      const success = await executeRebalance(accountId, optimizationResult.allocations);
      setIsSuccess(success);
    } catch (error) {
      console.error('Error executing rebalance:', error);
      setIsSuccess(false);
    } finally {
      setIsExecuting(false);
    }
  };
  
  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f97316', '#14b8a6', '#84cc16', '#3b82f6'];
  
  const pieData = optimizationResult.allocations.map((allocation, index) => {
    const protocol = protocols.find(p => p.id === allocation.protocolId);
    const asset = assets.find(a => a.id === allocation.assetId);
    
    return {
      name: `${protocol?.name || 'Unknown'} (${asset?.symbol || 'Unknown'})`,
      value: allocation.percentage,
      color: COLORS[index % COLORS.length]
    };
  });
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
      <div className="flex items-center mb-4">
        <Brain className="h-5 w-5 text-indigo-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-700">AI Agent Recommendation</h2>
      </div>
      
      {isSuccess ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            <p className="text-green-700 font-medium">Portfolio successfully rebalanced!</p>
          </div>
          <p className="text-sm text-green-600 mt-1">
            Your assets have been reallocated according to the AI agent's optimal strategy. It may take a few minutes for all transactions to complete.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <div className="mb-4">
              <h3 className="text-md font-medium text-gray-800 mb-2">Expected Performance</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-indigo-50 rounded-lg p-3">
                  <p className="text-sm text-indigo-700 mb-1">Expected APY</p>
                  <p className="text-2xl font-bold text-indigo-900">{optimizationResult.expectedApy.toFixed(1)}%</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-sm text-purple-700 mb-1">Risk Score</p>
                  <p className="text-2xl font-bold text-purple-900">{optimizationResult.expectedRisk.toFixed(1)}/10</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-medium text-gray-800 mb-2">AI Recommended Allocation</h3>
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                {optimizationResult.allocations.map((allocation, index) => {
                  const protocol = protocols.find(p => p.id === allocation.protocolId);
                  const asset = assets.find(a => a.id === allocation.assetId);
                  
                  return (
                    <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <div className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">{protocol?.name || 'Unknown'}</p>
                          <p className="text-xs text-gray-500">{asset?.symbol || 'Unknown'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-800">{allocation.percentage}%</p>
                        <p className="text-xs text-gray-500">{allocation.expectedApy.toFixed(1)}% APY</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, 'Allocation']}
                    labelFormatter={(name) => name}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
              <div className="flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-700">AI Agent Note</p>
                  <p className="text-xs text-yellow-600 mt-1">
                    Executing this rebalance will move your assets between protocols based on the AI agent's analysis. Gas fees will apply for each transaction. Make sure you have enough NEAR for gas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {!isSuccess && (
        <button
          onClick={handleExecute}
          disabled={isExecuting}
          className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md transition-colors disabled:bg-indigo-300"
        >
          {isExecuting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Executing AI Recommendation...
            </>
          ) : (
            <>
              <Brain className="h-5 w-5 mr-2" />
              Execute AI Recommendation
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default OptimizationResult;