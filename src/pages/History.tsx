import React, { useEffect, useState } from 'react';
import { ArrowUpRight, ArrowDownRight, ExternalLink } from 'lucide-react';
import { useAppStore } from '../store';

interface Transaction {
  id: string;
  date: string;
  type: 'deposit' | 'withdraw' | 'rebalance' | 'claim';
  protocol: string;
  asset: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
  txHash: string;
}

const History: React.FC = () => {
  const { isAuthenticated, setActiveTab } = useAppStore();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  useEffect(() => {
    setActiveTab('history');
    
    // Mock data for transaction history with current dates
    if (isAuthenticated) {
      const currentDate = new Date();
      const yesterday = new Date(currentDate);
      yesterday.setDate(currentDate.getDate() - 1);
      
      const twoDaysAgo = new Date(currentDate);
      twoDaysAgo.setDate(currentDate.getDate() - 2);
      
      const threeDaysAgo = new Date(currentDate);
      threeDaysAgo.setDate(currentDate.getDate() - 3);
      
      const fourDaysAgo = new Date(currentDate);
      fourDaysAgo.setDate(currentDate.getDate() - 4);
      
      setTransactions([
        {
          id: '1',
          date: currentDate.toISOString(),
          type: 'rebalance',
          protocol: 'Ref Finance',
          asset: 'NEAR',
          amount: 25.5,
          status: 'completed',
          txHash: '8FzNz3E5pVx9XNrJgHVvxftMSM1qRLRdQvDNBXXYCZ6K'
        },
        {
          id: '2',
          date: yesterday.toISOString(),
          type: 'rebalance',
          protocol: 'Burrow',
          asset: 'USN',
          amount: 100,
          status: 'completed',
          txHash: 'GtR7Xz3E5pVx9XNrJgHVvxftMSM1qRLRdQvDNBXXYCZ6K'
        },
        {
          id: '3',
          date: twoDaysAgo.toISOString(),
          type: 'deposit',
          protocol: 'Meta Pool',
          asset: 'NEAR',
          amount: 50,
          status: 'completed',
          txHash: 'KpR7Xz3E5pVx9XNrJgHVvxftMSM1qRLRdQvDNBXXYCZ6K'
        },
        {
          id: '4',
          date: threeDaysAgo.toISOString(),
          type: 'claim',
          protocol: 'Ref Finance',
          asset: 'REF',
          amount: 12.3,
          status: 'completed',
          txHash: 'LmR7Xz3E5pVx9XNrJgHVvxftMSM1qRLRdQvDNBXXYCZ6K'
        },
        {
          id: '5',
          date: fourDaysAgo.toISOString(),
          type: 'withdraw',
          protocol: 'Burrow',
          asset: 'USN',
          amount: 50,
          status: 'completed',
          txHash: 'NpR7Xz3E5pVx9XNrJgHVvxftMSM1qRLRdQvDNBXXYCZ6K'
        }
      ]);
    }
  }, [isAuthenticated, setActiveTab]);
  
  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Transaction History</h1>
          <p className="text-lg text-gray-600">
            Connect your wallet to view your transaction history.
          </p>
        </div>
      </div>
    );
  }
  
  const getTypeIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      case 'withdraw':
        return <ArrowDownRight className="h-4 w-4 text-red-500" />;
      case 'rebalance':
        return (
          <svg className="h-4 w-4 text-indigo-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4V9H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 20V15H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 9C4 13.9706 8.02944 18 13 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 15C20 10.0294 15.9706 6 11 6H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      case 'claim':
        return (
          <svg className="h-4 w-4 text-yellow-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        );
      default:
        return null;
    }
  };
  
  const getTypeLabel = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return 'Deposit';
      case 'withdraw':
        return 'Withdraw';
      case 'rebalance':
        return 'Rebalance';
      case 'claim':
        return 'Claim Rewards';
      default:
        return type;
    }
  };
  
  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">Completed</span>;
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded">Pending</span>;
      case 'failed':
        return <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">Failed</span>;
      default:
        return null;
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Transaction History</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Recent Transactions</h2>
          <p className="text-sm text-gray-500 mt-1">
            All transactions executed by our AI agent on your behalf
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Protocol</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((tx) => {
                const date = new Date(tx.date);
                const formattedDate = date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                });
                const formattedTime = date.toLocaleTimeString('en-US', {
                  hour: '2-digit',
                  minute: '2-digit'
                });
                
                return (
                  <tr key={tx.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{formattedDate}</div>
                      <div className="text-xs">{formattedTime}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="mr-2">{getTypeIcon(tx.type)}</span>
                        <span className="text-sm font-medium text-gray-900">{getTypeLabel(tx.type)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tx.protocol}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tx.asset}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{tx.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(tx.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <a
                        href={`https://explorer.near.org/transactions/${tx.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 flex items-center"
                      >
                        View <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;