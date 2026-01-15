import React from 'react';
import Header from './src/components/Header';
import Navigation from './src/components/Navigation';
import SyncIndicator from './src/components/SyncIndicator';
import './styles.css';

export default function App() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] flex flex-col">
      <Header />
      <div className="flex-1 flex items-start justify-center px-4 py-8">
        <div className="max-w-4xl w-full">
          <Navigation />
        </div>
      </div>
      <SyncIndicator />
    </div>
  );
}
