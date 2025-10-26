/**
 * HistoryTab Component
 * Tab 2: Displays history of generated quizzes with ability to view details
 */

import React, { useState, useEffect } from 'react';
import { fetchHistory, fetchQuizDetail } from '../services/api';
import Modal from '../components/Modal';
import QuizDisplay from '../components/QuizDisplay';

export const HistoryTab = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedQuizId, setSelectedQuizId] = useState(null);
  const [selectedQuizData, setSelectedQuizData] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState('');

  // Load history on mount
  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchHistory(100, 0);
      setHistory(data);
    } catch (err) {
      setError(err.message || 'Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = async (quizId) => {
    setDetailLoading(true);
    setDetailError('');
    try {
      const data = await fetchQuizDetail(quizId);
      setSelectedQuizId(quizId);
      setSelectedQuizData(data);
    } catch (err) {
      setDetailError(err.message || 'Failed to load quiz details');
    } finally {
      setDetailLoading(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedQuizId(null);
    setSelectedQuizData(null);
    setDetailError('');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Quiz History</h1>
          <p className="text-gray-600 text-lg">
            Browse all previously generated quizzes
          </p>
        </div>

        {/* Refresh Button */}
        <div className="mb-6 flex justify-center">
          <button
            onClick={loadHistory}
            disabled={loading}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              loading
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
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
                Refreshing...
              </span>
            ) : (
              '🔄 Refresh'
            )}
          </button>
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
              <p className="text-lg font-semibold text-gray-700">Loading history...</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && history.length === 0 && (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">No quizzes yet</h2>
            <p className="text-gray-500">Go to "Generate Quiz" tab to create your first quiz!</p>
          </div>
        )}

        {/* History Table */}
        {!loading && history.length > 0 && (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b-2 border-gray-300">
                  <tr>
                    <th className="px-6 py-4 text-left text-gray-700 font-semibold">ID</th>
                    <th className="px-6 py-4 text-left text-gray-700 font-semibold">Title</th>
                    <th className="px-6 py-4 text-left text-gray-700 font-semibold">Date Generated</th>
                    <th className="px-6 py-4 text-left text-gray-700 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`border-b transition-colors hover:bg-blue-50 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                      }`}
                    >
                      <td className="px-6 py-4 text-gray-900 font-medium">#{item.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <p className="text-gray-900 font-medium">{item.title}</p>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline text-sm truncate"
                          >
                            {item.url}
                          </a>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {formatDate(item.date_generated)}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleViewDetails(item.id)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all font-medium text-sm"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Detail Modal */}
        <Modal
          isOpen={selectedQuizId !== null}
          onClose={handleCloseModal}
          title={selectedQuizData?.title || 'Quiz Details'}
          size="lg"
        >
          {detailError && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-4">
              <p className="font-semibold">Error</p>
              <p>{detailError}</p>
            </div>
          )}

          {detailLoading ? (
            <div className="flex flex-col items-center gap-4 py-8">
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
              <p className="text-lg font-semibold text-gray-700">Loading quiz details...</p>
            </div>
          ) : selectedQuizData ? (
            <QuizDisplay quizData={selectedQuizData} />
          ) : null}
        </Modal>
      </div>
    </div>
  );
};

export default HistoryTab;
