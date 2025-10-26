import React, { useState } from 'react';

export const QuizDisplay = ({ quizData }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(null);

  if (!quizData) {
    return <div className="text-center text-gray-500 py-8">No quiz data available</div>;
  }

  const {
    title = 'Unknown Title',
    summary = '',
    key_entities = {},
    sections = [],
    quiz = [],
    related_topics = [],
  } = quizData;

  const handleAnswerSelect = (questionIndex, answer) => {
    if (!showAnswers) {
      setSelectedAnswers({
        ...selectedAnswers,
        [questionIndex]: answer,
      });
    }
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    quiz.forEach((question, index) => {
      const selectedAnswer = selectedAnswers[index];
      const correctAnswer = question.answer;
      
      const normalizedSelected = selectedAnswer?.trim().toLowerCase();
      const normalizedCorrect = correctAnswer?.trim().toLowerCase();
      
      const isCorrect = question.options.some(option => {
        const normalizedOption = option?.trim().toLowerCase();
        // Direct match
        if (normalizedSelected === normalizedOption && normalizedCorrect.includes(normalizedOption)) {
          return true;
        }
        // Check if correct answer contains the option text
        if (normalizedSelected === normalizedOption && 
            (normalizedCorrect === normalizedOption || 
             normalizedCorrect.includes(normalizedOption) ||
             normalizedOption.includes(normalizedCorrect))) {
          return true;
        }
        return false;
      });
      
      if (isCorrect) {
        correctCount++;
      }
    });

    setScore({
      correct: correctCount,
      total: quiz.length,
      percentage: Math.round((correctCount / quiz.length) * 100),
    });
    setShowAnswers(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowAnswers(false);
    setScore(null);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      hard: 'bg-red-100 text-red-800',
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  const isAnswered = (questionIndex) => questionIndex in selectedAnswers;
  const isCorrect = (questionIndex) => {
    const selected = selectedAnswers[questionIndex];
    const correct = quiz[questionIndex].answer;
    const options = quiz[questionIndex].options;
    
    // Normalize for comparison
    const normalizedSelected = selected?.trim().toLowerCase();
    const normalizedCorrect = correct?.trim().toLowerCase();
    
    // Check if selected answer matches the correct answer (with fuzzy matching)
    return options.some(option => {
      const normalizedOption = option?.trim().toLowerCase();
      if (normalizedSelected === normalizedOption) {
        // Check if this option is the correct one
        return normalizedCorrect === normalizedOption || 
               normalizedCorrect.includes(normalizedOption) ||
               normalizedOption.includes(normalizedCorrect);
      }
      return false;
    });
  };

  return (
    <div className="space-y-8">
      {/* Title Section */}
      <div className="border-b-2 border-blue-500 pb-6">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        {summary && <p className="text-gray-600 text-lg leading-relaxed">{summary}</p>}
      </div>

      {/* Key Entities Section */}
      {(key_entities.people?.length > 0 ||
        key_entities.organizations?.length > 0 ||
        key_entities.locations?.length > 0) && (
        <div className="bg-blue-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Entities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {key_entities.people && key_entities.people.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">People</h3>
                <ul className="space-y-1">
                  {key_entities.people.map((person, idx) => (
                    <li key={idx} className="text-sm text-gray-600">
                      • {person}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {key_entities.organizations && key_entities.organizations.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Organizations</h3>
                <ul className="space-y-1">
                  {key_entities.organizations.map((org, idx) => (
                    <li key={idx} className="text-sm text-gray-600">
                      • {org}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {key_entities.locations && key_entities.locations.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Locations</h3>
                <ul className="space-y-1">
                  {key_entities.locations.map((location, idx) => (
                    <li key={idx} className="text-sm text-gray-600">
                      • {location}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sections */}
      {sections.length > 0 && (
        <div className="bg-green-50 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Main Sections</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sections.map((section, idx) => (
              <li key={idx} className="text-green-700 flex items-center">
                <span className="mr-2">✓</span> {section}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Quiz Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Quiz ({quiz.length} Questions)</h2>
          {score && (
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold">
              Score: {score.correct}/{score.total} ({score.percentage}%)
            </div>
          )}
        </div>

        <div className="space-y-6">
          {quiz.map((question, questionIndex) => (
            <div
              key={questionIndex}
              className={`border-2 rounded-lg p-6 transition-all ${
                showAnswers
                  ? isCorrect(questionIndex)
                    ? 'border-green-500 bg-green-50'
                    : isAnswered(questionIndex)
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-300'
                  : 'border-gray-300 hover:border-blue-400'
              }`}
            >
              {/* Question Header */}
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-gray-900 flex-1">
                  Q{questionIndex + 1}: {question.question}
                </h3>
                <span className={`text-sm font-medium px-3 py-1 rounded-full ml-4 ${getDifficultyColor(question.difficulty)}`}>
                  {question.difficulty}
                </span>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-4">
                {question.options.map((option, optionIndex) => {
                  const isSelected = selectedAnswers[questionIndex] === option;
                  // Normalize for correct answer comparison with fuzzy matching
                  const normalizedOption = option?.trim().toLowerCase();
                  const normalizedAnswer = question.answer?.trim().toLowerCase();
                  const isCorrectOption = normalizedOption === normalizedAnswer || 
                                         normalizedAnswer.includes(normalizedOption) ||
                                         normalizedOption.includes(normalizedAnswer);
                  const shouldHighlightCorrect = showAnswers && isCorrectOption;
                  const shouldHighlightWrong = showAnswers && isSelected && !isCorrectOption;

                  return (
                    <button
                      key={optionIndex}
                      onClick={() => handleAnswerSelect(questionIndex, option)}
                      disabled={showAnswers}
                      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                        shouldHighlightCorrect
                          ? 'border-green-500 bg-green-100 cursor-default'
                          : shouldHighlightWrong
                          ? 'border-red-500 bg-red-100 cursor-default'
                          : isSelected
                          ? 'border-blue-500 bg-blue-100'
                          : 'border-gray-300 hover:border-blue-400'
                      } ${showAnswers ? 'cursor-default' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center">
                        <div
                          className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                            shouldHighlightCorrect
                              ? 'border-green-500 bg-green-500'
                              : shouldHighlightWrong
                              ? 'border-red-500 bg-red-500'
                              : isSelected
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'
                          }`}
                        >
                          {(isSelected || shouldHighlightCorrect) && (
                            <span className="text-white text-xs">✓</span>
                          )}
                        </div>
                        <span className="text-gray-800">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation (show when answers revealed) */}
              {showAnswers && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="text-sm text-gray-700">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quiz Action Buttons */}
        {quiz.length > 0 && (
          <div className="mt-8 flex gap-4 justify-center">
            {!showAnswers ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={Object.keys(selectedAnswers).length !== quiz.length}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  Object.keys(selectedAnswers).length === quiz.length
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit Quiz ({Object.keys(selectedAnswers).length}/{quiz.length})
              </button>
            ) : (
              <button
                onClick={handleReset}
                className="px-8 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-all"
              >
                Retake Quiz
              </button>
            )}
          </div>
        )}
      </div>

      {/* Related Topics Section */}
      {related_topics && related_topics.length > 0 && (
        <div className="bg-purple-50 rounded-lg p-6 border-2 border-purple-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Related Topics for Further Reading</h2>
          <div className="flex flex-wrap gap-3">
            {related_topics.map((topic, idx) => (
              <a
                key={idx}
                href={`https://en.wikipedia.org/wiki/${encodeURIComponent(topic)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition-all font-medium text-sm"
              >
                {topic} →
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizDisplay;
