import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Moon, Sun } from 'lucide-react';
import { useAppStore } from '../store';
import WalletConnect from './WalletConnect';

const Navbar: React.FC = () => {
  const { checkAuth, darkMode, toggleDarkMode } = useAppStore();
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  return (
    <nav className={`${darkMode ? 'bg-gray-800' : 'bg-indigo-600'} text-white shadow-md`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Brain className="h-8 w-8 mr-2" />
              <span className="text-xl font-bold">NEAR AI Yield Agent</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-opacity-20 hover:bg-white transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <WalletConnect />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;