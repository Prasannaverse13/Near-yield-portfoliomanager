import React, { useEffect, useState } from 'react';
import { useAppStore } from '../store';
import { Bell, Moon, Sun, RefreshCw, Shield } from 'lucide-react';
import WalletDetails from '../components/WalletDetails';

const Settings: React.FC = () => {
  const { isAuthenticated, setActiveTab, darkMode, toggleDarkMode } = useAppStore();
  
  // Settings state
  const [notifications, setNotifications] = useState<boolean>(true);
  const [autoRebalance, setAutoRebalance] = useState<boolean>(false);
  const [securityAlerts, setSecurityAlerts] = useState<boolean>(true);
  const [rebalanceThreshold, setRebalanceThreshold] = useState<number>(5);
  
  useEffect(() => {
    setActiveTab('settings');
  }, [setActiveTab]);
  
  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-12">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>Settings</h1>
          <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Connect your wallet to access settings.
          </p>
        </div>
      </div>
    );
  }
  
  const handleSaveSettings = () => {
    // In a real app, this would save settings to backend or local storage
    alert('Settings saved successfully!');
  };
  
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}>Settings</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <div className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg shadow-md p-6 mb-6`}>
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-700'} mb-4`}>Preferences</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bell className={`h-5 w-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-3`} />
                  <div>
                    <h3 className={`text-md font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Receive alerts about portfolio changes</p>
                  </div>
                </div>
                <div className="relative inline-block w-12 align-middle select-none">
                  <input
                    type="checkbox"
                    name="notifications"
                    id="notifications"
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor="notifications"
                    className={`toggle-label block overflow-hidden h-6 rounded-full ${notifications ? (darkMode ? 'bg-indigo-500' : 'bg-indigo-600') : 'bg-gray-300'} cursor-pointer`}
                  ></label>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {darkMode ? (
                    <Moon className="h-5 w-5 text-indigo-400 mr-3" />
                  ) : (
                    <Sun className="h-5 w-5 text-indigo-600 mr-3" />
                  )}
                  <div>
                    <h3 className={`text-md font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Dark Mode</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Switch between light and dark theme</p>
                  </div>
                </div>
                <div className="relative inline-block w-12 align-middle select-none">
                  <input
                    type="checkbox"
                    name="darkMode"
                    id="darkMode"
                    checked={darkMode}
                    onChange={toggleDarkMode}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor="darkMode"
                    className={`toggle-label block overflow-hidden h-6 rounded-full ${darkMode ? 'bg-indigo-500' : 'bg-gray-300'} cursor-pointer`}
                  ></label>
                </div>
              </div>
            </div>
          </div>
          
          <div className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg shadow-md p-6 mb-6`}>
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-700'} mb-4`}>Automation</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <RefreshCw className={`h-5 w-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-3`} />
                  <div>
                    <h3 className={`text-md font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Auto-Rebalance</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Automatically rebalance portfolio when optimal</p>
                  </div>
                </div>
                <div className="relative inline-block w-12 align-middle select-none">
                  <input
                    type="checkbox"
                    name="autoRebalance"
                    id="autoRebalance"
                    checked={autoRebalance}
                    onChange={() => setAutoRebalance(!autoRebalance)}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor="autoRebalance"
                    className={`toggle-label block overflow-hidden h-6 rounded-full ${autoRebalance ? (darkMode ? 'bg-indigo-500' : 'bg-indigo-600') : 'bg-gray-300'} cursor-pointer`}
                  ></label>
                </div>
              </div>
              
              {autoRebalance && (
                <div className="ml-8">
                  <label className={`block text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                    Rebalance Threshold: {rebalanceThreshold}%
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={rebalanceThreshold}
                    onChange={(e) => setRebalanceThreshold(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                    Rebalance when portfolio deviates more than {rebalanceThreshold}% from target allocation
                  </p>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Shield className={`h-5 w-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-3`} />
                  <div>
                    <h3 className={`text-md font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Security Alerts</h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Get notified about suspicious activities</p>
                  </div>
                </div>
                <div className="relative inline-block w-12 align-middle select-none">
                  <input
                    type="checkbox"
                    name="securityAlerts"
                    id="securityAlerts"
                    checked={securityAlerts}
                    onChange={() => setSecurityAlerts(!securityAlerts)}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor="securityAlerts"
                    className={`toggle-label block overflow-hidden h-6 rounded-full ${securityAlerts ? (darkMode ? 'bg-indigo-500' : 'bg-indigo-600') : 'bg-gray-300'} cursor-pointer`}
                  ></label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              onClick={handleSaveSettings}
              className={`${darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white font-medium py-2 px-4 rounded-md transition-colors`}
            >
              Save Settings
            </button>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <WalletDetails />
          
          <div className={`${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white'} rounded-lg shadow-md p-6 mt-6`}>
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-700'} mb-4`}>AI Agent Settings</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className={`h-5 w-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-3`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 20V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M4.93 4.93L6.34 6.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17.66 17.66L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M20 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M6.34 17.66L4.93 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19.07 4.93L17.66 6.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>AI Optimization Frequency</span>
                </div>
                <select className={`text-sm ${darkMode ? 'text-gray-300 bg-gray-700 border-gray-600' : 'text-gray-900 bg-gray-100 border-gray-300'} rounded-md p-1`}>
                  <option>Daily</option>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Manual Only</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className={`h-5 w-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-3`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Market Data Update</span>
                </div>
                <select className={`text-sm ${darkMode ? 'text-gray-300 bg-gray-700 border-gray-600' : 'text-gray-900 bg-gray-100 border-gray-300'} rounded-md p-1`}>
                  <option>Real-time</option>
                  <option>Hourly</option>
                  <option>Daily</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <svg className={`h-5 w-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} mr-3`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Confirmation Required</span>
                </div>
                <div className="relative inline-block w-12 align-middle select-none">
                  <input
                    type="checkbox"
                    name="confirmationRequired"
                    id="confirmationRequired"
                    checked={true}
                    className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label
                    htmlFor="confirmationRequired"
                    className={`toggle-label block overflow-hidden h-6 rounded-full ${darkMode ? 'bg-indigo-500' : 'bg-indigo-600'} cursor-pointer`}
                  ></label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;