import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Optimize from './pages/Optimize';
import Protocols from './pages/Protocols';
import History from './pages/History';
import Settings from './pages/Settings';
import { useAppStore } from './store';

function App() {
  const { checkAuth, darkMode } = useAppStore();
  
  useEffect(() => {
    checkAuth();
    
    // Apply dark mode on initial load
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [checkAuth, darkMode]);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="portfolio" element={<Portfolio />} />
          <Route path="optimize" element={<Optimize />} />
          <Route path="protocols" element={<Protocols />} />
          <Route path="history" element={<History />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;