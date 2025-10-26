/**
 * GenerateQuizTab Component
 * Tab 1: Allows users to input a Wikipedia URL and generate a quiz
 */

import React, { useState } from 'react';
import { generateQuiz } from '../services/api';
import QuizDisplay from '../components/QuizDisplay';

const validateUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === 'en.wikipedia.org' && urlObj.pathname.startsWith('/wiki/');
  } catch {
    return false;
  }
};

export const GenerateQuizTab = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [quizData, setQuizData] = useState(null);
  const [urlError, setUrlError] = useState('');

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    setUrlError('');
    setError('');
  };

  const handleGenerateQuiz = async () => {
    setError('');
    setUrlError('');

    // Validate URL
    if (!url.trim()) {
      setUrlError('Please enter a Wikipedia URL');
      return;
    }

    if (!validateUrl(url)) {
      setUrlError('Please enter a valid Wikipedia URL (e.g., https://en.wikipedia.org/wiki/Alan_Turing)');
      return;
    }

    setLoading(true);
    try {
      const result = await generateQuiz(url);
      setQuizData(result);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to generate quiz. Please try again.');
      setQuizData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUrl('');
    setQuizData(null);
    setError('');
    setUrlError('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && url.trim()) {
      handleGenerateQuiz();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Generate Quiz from Wikipedia</h1>
          <p className="text-gray-600 text-lg">
            Paste a Wikipedia article URL to generate an engaging quiz powered by AI
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="space-y-4">
            <label className="block text-gray-700 font-semibold text-lg">Wikipedia Article URL</label>
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={url}
                  onChange={handleUrlChange}
                  onKeyPress={handleKeyPress}
                  placeholder="https://en.wikipedia.org/wiki/Alan_Turing"
                  disabled={loading}
                  className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-all ${
                    urlError
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-gray-300 focus:border-blue-500'
                  } ${loading ? 'bg-gray-100' : 'bg-white'}`}
                />
                {urlError && <p className="text-red-500 text-sm mt-2">{urlError}</p>}
              </div>
              <button
                onClick={handleGenerateQuiz}
                disabled={loading || !url.trim()}
                className={`px-8 py-3 rounded-lg font-semibold text-white transition-all whitespace-nowrap ${
                  loading || !url.trim()
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Generating...
                  </span>
                ) : (
                  'Generate Quiz'
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-8">
            <p className="font-semibold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="flex flex-col items-center gap-4">
              <svg className="animate-spin h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <div>
                <p className="text-lg font-semibold text-gray-700">Processing your Wikipedia article...</p>
                <p className="text-gray-500 text-sm mt-2">This may take a moment while we scrape and analyze the content.</p>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Display */}
        {quizData && !loading && (
          <div className="bg-white rounded-lg shadow-lg p-8">
            <QuizDisplay quizData={quizData} />
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-all"
              >
                Generate Another Quiz
              </button>
            </div>
          </div>
        )}

        {/* Helpful Tips */}
        {!quizData && !loading && (
          <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Example Wikipedia Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'https://en.wikipedia.org/wiki/Albert_Einstein',
                'https://en.wikipedia.org/wiki/Python_(programming_language)',
                'https://en.wikipedia.org/wiki/Climate_change',
                'https://en.wikipedia.org/wiki/Ancient_Egypt',
                'https://en.wikipedia.org/wiki/Machine_learning',
                'https://en.wikipedia.org/wiki/World_War_II',
              ].map((exampleUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setUrl(exampleUrl);
                    setUrlError('');
                    setError('');
                  }}
                  className="text-left p-4 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
                >
                  <p className="text-blue-600 hover:underline text-sm font-medium truncate">
                    {exampleUrl.split('/wiki/')[1].replace(/_/g, ' ')}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateQuizTab;
