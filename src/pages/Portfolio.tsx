import React, { useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import { useAppStore } from '../store';
import PortfolioSummary from '../components/PortfolioSummary';

const Portfolio: React.FC = () => {
  const { 
    isAuthenticated, 
    portfolio, 
    protocols, 
    assets,
    fetchUserPortfolio,
    fetchProtocols,
    fetchUserAssets,
    setActiveTab
  } = useAppStore();
  
  useEffect(() => {
    setActiveTab('portfolio');
    
    if (isAuthenticated) {
      fetchUserPortfolio();
      fetchProtocols();
      fetchUserAssets();
    }
  }, [isAuthenticated, fetchUserPortfolio, fetchProtocols, fetchUserAssets, setActiveTab]);
  
  if (!isAuthenticated || !portfolio) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Portfolio Analysis</h1>
          <p className="text-lg text-gray-600">
            Connect your NEAR wallet to view your portfolio.
          </p>
        </div>
      </div>
    );
  }
  
  const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f97316', '#14b8a6', '#84cc16', '#3b82f6'];
  
  // Prepare data for protocol allocation pie chart
  const protocolData = portfolio.assets.reduce((acc, asset) => {
    const protocol = protocols.find(p => p.id === asset.protocolId);
    const existingProtocol = acc.find(p => p.id === asset.protocolId);
    
    if (existingProtocol) {
      existingProtocol.value += asset.value;
    } else {
      acc.push({
        id: asset.protocolId,
        name: protocol?.name || asset.protocolId,
        value: asset.value
      });
    }
    
    return acc;
  }, [] as { id: string; name: string; value: number }[]);
  
  // Prepare data for asset allocation pie chart
  const assetData = portfolio.assets.reduce((acc, asset) => {
    const assetInfo = assets.find(a => a.id === asset.assetId);
    const existingAsset = acc.find(a => a.id === asset.assetId);
    
    if (existingAsset) {
      existingAsset.value += asset.value;
    } else {
      acc.push({
        id: asset.assetId,
        name: assetInfo?.symbol || asset.assetId,
        value: asset.value
      });
    }
    
    return acc;
  }, [] as { id: string; name: string; value: number }[]);
  
  // Prepare data for APY comparison bar chart
  const apyData = portfolio.assets.map(asset => {
    const protocol = protocols.find(p => p.id === asset.protocolId);
    const assetInfo = assets.find(a => a.id === asset.assetId);
    
    return {
      name: `${protocol?.name || asset.protocolId} (${assetInfo?.symbol || asset.assetId})`,
      apy: asset.apy,
      value: asset.value
    };
  }).sort((a, b) => b.apy - a.apy);
  
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Portfolio Analysis</h1>
      
      <div className="space-y-6">
        <PortfolioSummary />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Protocol Allocation</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={protocolData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {protocolData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`$${value.toFixed(2)}`, 'Value']}
                    labelFormatter={(name) => name}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Asset Allocation</h2>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={assetData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {assetData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`$${value.toFixed(2)}`, 'Value']}
                    labelFormatter={(name) => name}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">APY Comparison</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={apyData}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 'dataMax + 2']} />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip formatter={(value) => [`${value}%`, 'APY']} />
                <Legend />
                <Bar dataKey="apy" name="APY (%)" fill="#6366f1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;