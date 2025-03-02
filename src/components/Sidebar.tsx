import React from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PieChart, 
  BarChart3, 
  Settings, 
  History, 
  Brain 
} from 'lucide-react';
import { useAppStore } from '../store';

const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, darkMode } = useAppStore();
  
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, path: '/' },
    { id: 'portfolio', label: 'Portfolio', icon: <PieChart className="h-5 w-5" />, path: '/portfolio' },
    { id: 'optimize', label: 'AI Optimize', icon: <Brain className="h-5 w-5" />, path: '/optimize' },
    { id: 'protocols', label: 'Protocols', icon: <BarChart3 className="h-5 w-5" />, path: '/protocols' },
    { id: 'history', label: 'History', icon: <History className="h-5 w-5" />, path: '/history' },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/settings' }
  ];
  
  return (
    <aside className={`fixed left-0 top-16 w-64 h-[calc(100vh-4rem)] ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow-md z-10`}>
      <div className="p-4">
        <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-700'} mb-6`}>Menu</h2>
        
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center px-4 py-3 rounded-md transition-colors ${
                activeTab === item.id
                  ? darkMode 
                    ? 'bg-indigo-900 text-indigo-200' 
                    : 'bg-indigo-50 text-indigo-600'
                  : darkMode
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
        <div className={`${darkMode ? 'bg-indigo-900' : 'bg-indigo-50'} p-4 rounded-lg`}>
          <h3 className={`text-sm font-medium ${darkMode ? 'text-indigo-200' : 'text-indigo-800'} mb-2`}>AI Agent</h3>
          <p className={`text-xs ${darkMode ? 'text-indigo-300' : 'text-indigo-600'} mb-3`}>
            Our AI agent continuously analyzes market conditions to find the best yield opportunities.
          </p>
          <Link
            to="/optimize"
            className={`text-xs font-medium ${darkMode ? 'text-indigo-300 hover:text-indigo-100' : 'text-indigo-600 hover:text-indigo-800'}`}
            onClick={() => setActiveTab('optimize')}
          >
            Run AI optimization →
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;