import React, { useState } from 'react';
import './Quiz.css';

const Quiz = ({ quizData, onComplete, isEmbedded = false }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);

    const currentQuestion = quizData.questions[currentQuestionIndex];

    const handleAnswerSelect = (questionId, answer) => {
        setUserAnswers({
            ...userAnswers,
            [questionId]: answer,
        });
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizData.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // Last question, show results
            setShowResults(true);
        }
    };

    const calculateScore = () => {
        let score = 0;
        quizData.questions.forEach(question => {
            if (userAnswers[question.id] === question.correctAnswer) {
                score += 1;
            }
        });
        return score;
    };

    const handleRestartQuiz = () => {
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setShowResults(false);
    };

    if (showResults) {
        const score = calculateScore();
        const totalQuestions = quizData.questions.length;
        const percentage = Math.round((score / totalQuestions) * 100);

        return (
            <div className="quiz-results">
                <h2>Hasil Kuis</h2>
                <p>Anda menjawab benar {score} dari {totalQuestions} pertanyaan.</p>
                <div className="quiz-score-percentage">Skor Anda: {percentage}%</div>
                {isEmbedded ? (
                    <button onClick={handleRestartQuiz} className="quiz-complete-btn">
                        Ulangi Kuis
                    </button>
                ) : (
                    <button onClick={onComplete} className="quiz-complete-btn">
                        Selesai
                    </button>
                )}
            </div>
        );
    }

    return (
        <div className="quiz-container">
            <div className="quiz-header">
                <h2>{quizData.title}</h2>
                <p>Pertanyaan {currentQuestionIndex + 1} dari {quizData.questions.length}</p>
            </div>
            <div className="quiz-question">
                <h3>{currentQuestion.questionText}</h3>
                <div className="quiz-options">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelect(currentQuestion.id, option)}
                            className={`quiz-option-btn ${userAnswers[currentQuestion.id] === option ? 'selected' : ''}`}
                        >{option}</button>
                    ))}
                </div>
            </div>
            <div className="quiz-navigation">
                <button onClick={handleNextQuestion} disabled={!userAnswers[currentQuestion.id]} className="quiz-next-btn">{currentQuestionIndex < quizData.questions.length - 1 ? 'Pertanyaan Berikutnya' : 'Lihat Hasil'}</button>
            </div>
        </div>
    );
};

export default Quiz;
