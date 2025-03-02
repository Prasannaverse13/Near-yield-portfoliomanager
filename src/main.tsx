import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Polyfills for browser environment
import { Buffer } from 'buffer';
window.Buffer = Buffer;

// Required for NEAR API JS
if (typeof window !== 'undefined') {
  window.global = window;
  // Define process before any imports that might use it
  window.process = { 
    env: { NODE_ENV: 'production' },
    version: '',
    nextTick: (cb: Function) => setTimeout(cb, 0)
  } as any;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);