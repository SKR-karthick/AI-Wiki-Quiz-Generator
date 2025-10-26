import React, { useState } from 'react';
import GenerateQuizTab from './tabs/GenerateQuizTab';
import HistoryTab from './tabs/HistoryTab';
import './index.css';

export const App = () => {
  const [activeTab, setActiveTab] = useState('generate');

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📚</span>
              <h1 className="text-3xl font-bold text-gray-900">
                AI Wiki Quiz Generator
              </h1>
            </div>
            <div className="text-sm text-gray-500">
              Created by S.Karthick Raja 
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('generate')}
              className={`px-6 py-3 rounded-t-lg font-semibold transition-all ${
                activeTab === 'generate'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              📝 Generate Quiz
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-3 rounded-t-lg font-semibold transition-all ${
                activeTab === 'history'
                  ? 'bg-green-500 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              📖 History
            </button>
          </div>
        </div>
      </nav>

      <div className="min-h-screen">
        {activeTab === 'generate' && <GenerateQuizTab />}
        {activeTab === 'history' && <HistoryTab />}
      </div>

      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm mt-2">
            Transform Wikipedia articles into engaging quizzes with AI
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
