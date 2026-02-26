import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import MainProvider from './State/MainContext';

// FIX: React 18 uses createRoot() — old ReactDOM.render() is removed
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MainProvider>
      <App />
    </MainProvider>
  </React.StrictMode>
);
