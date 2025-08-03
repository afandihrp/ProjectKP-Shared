import React, { useState, useContext, useMemo } from 'react';
import './CourseListItem.css';
import { CgChevronDown, CgChevronUp } from "react-icons/cg";
import { FaArrowLeft, FaCheckCircle, FaLock, FaPlayCircle, FaChevronLeft, FaChevronRight, FaCheck, FaTimes } from 'react-icons/fa';
import PythonCompiler from './PythonCompiler.jsx';
import dataFetch from '../handleFetching.js';
import { tokenAPI } from '../App.jsx';

export default function CourseListItem({ course, marginleft, onBackToCourseList }) {
  const [currentView, setCurrentView] = useState('list'); // 'list' or 'lesson'
  const [activeLesson, setActiveLesson] = useState(null);
  const [openModuleIndex, setOpenModuleIndex] = useState(0); // Modul pertama terbuka secara default
  const [completedLessons, setCompletedLessons] = useState(new Set());

  // State untuk menangani tugas interaktif
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [taskAnswers, setTaskAnswers] = useState({});
  const [checkedAnswers, setCheckedAnswers] = useState({}); // { taskId: { status: 'correct' | 'incorrect', selected: 'userAnswer' } }
  const { getToken, newRefreshToken } = useContext(tokenAPI);

  // Create a flat array of all lessons for easier navigation and progress tracking
  const allLessons = useMemo(() => (course.modules || []).flatMap(m => m.lessons), [course.modules]);

  const isLessonUnlocked = (lesson) => {
    const lessonIndex = allLessons.findIndex(l => l.title === lesson.title);
    // The very first lesson is always unlocked
    if (lessonIndex === 0) return true;
    // Any other lesson is unlocked if the previous one has been completed
    const previousLesson = allLessons[lessonIndex - 1];
    return completedLessons.has(previousLesson.title);
  };

  const getNextLesson = () => {
    if (!activeLesson) return null;
    const currentIndex = allLessons.findIndex(l => l.title === activeLesson.title);
    if (currentIndex < allLessons.length - 1) {
      return allLessons[currentIndex + 1];
    }
    return null; // This is the last lesson
  };
newRefreshToken().then(() => {
  const test = new dataFetch("/course", null, getToken().token, "GET");
  const data = test.makeRequest()
  console.log(data);
}
)


  const handleLessonClick = (lesson) => {
    if (isLessonUnlocked(lesson)) {
      setActiveLesson(lesson);
      setCurrentView('lesson');
      setCurrentTaskIndex(0); // Reset task index saat membuka materi baru
      setTaskAnswers({}); // Reset jawaban saat membuka materi baru
      setCheckedAnswers({}); // Reset jawaban yang sudah diperiksa
    }
  };

  const handleCompleteAndReturn = () => {
    if (!activeLesson) return;

    if (!completedLessons.has(activeLesson.title)) {
      const newCompleted = new Set(completedLessons);
      newCompleted.add(activeLesson.title);
      setCompletedLessons(newCompleted);
    }

    // Check if it was the last lesson to show a completion message
    const nextLesson = getNextLesson();
    if (!nextLesson) {
      alert('Selamat! Anda telah menyelesaikan kursus ini.');
    }
    handleBackToList(); // Go back to the list view
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setActiveLesson(null);
  };

  const handleTaskAnswer = (taskId, answer) => {
    setTaskAnswers(prev => ({ ...prev, [taskId]: answer }));
  };

  const handleCheckAnswer = (task) => {
    const userAnswer = taskAnswers[task.id];
    if (!userAnswer) return;

    const isCorrect = userAnswer === task.correctAnswer;
    setCheckedAnswers(prev => ({
        ...prev,
        [task.id]: {
            status: isCorrect ? 'correct' : 'incorrect',
            selected: userAnswer
        }
    }));
  };

  const isTaskComplete = (task) => {
    if (task.type === 'multiple-choice') {
        return !!checkedAnswers[task.id];
    }
    // Untuk compiler dan esai, kita anggap "selesai" untuk mengizinkan navigasi
    return true;
  };

  return (
    <>
      <div className="course-page" style={{ marginLeft: marginleft+'px'}}>
      <header className="course-header">
        {onBackToCourseList && (
            <div className="back-button-wrapper">
                <button onClick={onBackToCourseList} className="back-button">
                    <FaArrowLeft /> Kembali ke Semua Kursus
                </button>
            </div>
        )}
        <h1>{course.title}</h1>
        <p>{course.description}</p>
      </header>

      <main className="course-main">
        <section className="course-content">
          {currentView === 'list' && (
            <div className="modules-container">
              <h2>Materi Pembelajaran</h2>
              {(course.modules || []).map((module, moduleIndex) => {
                const isOpen = openModuleIndex === moduleIndex;
                const completedInModule = (module.lessons || []).filter(l => completedLessons.has(l.title)).length;
                const totalLessons = (module.lessons || []).length;
                const progressText = `${completedInModule} / ${totalLessons} lessons`;
                const progress = totalLessons > 0 ? Math.round((completedInModule / totalLessons) * 100) : 0;

                return (
                  <div key={moduleIndex} className={`module ${isOpen ? 'open' : ''}`}>
                    <h3 onClick={() => setOpenModuleIndex(isOpen ? null : moduleIndex)}>
                      <span>{module.moduleTitle}</span>
                      <div className="module-header-right">
                      <span className="module-progress-text">{progressText}</span>
                        {progress > 0 && <span className="module-progress">{progress}%</span>}
                        {isOpen ? <CgChevronUp /> : <CgChevronDown />}
                      </div>
                    </h3>
                    <ul className="lesson-list">
                      {(module.lessons || []).map((lesson, lessonIndex) => {
                        const unlocked = isLessonUnlocked(lesson);
                        return (
                          <li key={lessonIndex} onClick={() => handleLessonClick(lesson)} className={!unlocked ? 'locked' : ''}>
                            <div className="lesson-item-left">
                              {completedLessons.has(lesson.title) ? (
                                <FaCheckCircle className="lesson-icon completed" />
                              ) : !unlocked ? (
                                <FaLock className="lesson-icon locked" />
                              ) : (
                                <FaPlayCircle className="lesson-icon todo" />
                              )}
                              <span>{lesson.title}</span>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}

          {currentView === 'lesson' && activeLesson && (
            <div className="lesson-page-view">
              <div className="lesson-header">
                <button onClick={handleBackToList} className="back-button">← Kembali ke Daftar Modul</button>
                <h2>{activeLesson.title}</h2>
                <h4>{activeLesson.subtitle}</h4>
              </div>
              <div className="lesson-content-body">
                <p>{activeLesson.content}</p>
                {/* --- Bagian Tugas Interaktif Baru --- */}
                {activeLesson.tasks && activeLesson.tasks.length > 0 && (() => {
                  const task = activeLesson.tasks[currentTaskIndex];
                  if (!task) return null;

                  return (
                    <div className="interactive-tasks-container">
                      <div className="tasks-header">
                        <h4>Latihan & Uji Pemahaman</h4>
                        <span>Tugas {currentTaskIndex + 1} dari {activeLesson.tasks.length}</span>
                      </div>

                      <div className="task-content">
                        <p className="task-prompt">{task.prompt}</p>
                        
                        {task.type === 'compiler' && (
                          <PythonCompiler marginleft={0} />
                        )}

                        {task.type === 'multiple-choice' && (() => {
                            const isChecked = checkedAnswers[task.id];
                            return (
                                <>
                                    <div className="quiz-options">
                                        {task.options.map((option, index) => {
                                            let btnClass = 'quiz-option-btn';
                                            if (isChecked) {
                                                if (option === task.correctAnswer) {
                                                    btnClass += ' correct';
                                                } else if (option === isChecked.selected) {
                                                    btnClass += ' incorrect';
                                                }
                                            } else if (taskAnswers[task.id] === option) {
                                                btnClass += ' selected';
                                            }

                                            return (
                                                <button
                                                    key={index}
                                                    onClick={() => !isChecked && handleTaskAnswer(task.id, option)}
                                                    className={btnClass}
                                                    disabled={isChecked}
                                                >
                                                    <span className="option-text">{option}</span>
                                                    {isChecked && option === task.correctAnswer && <FaCheck className="option-icon" />}
                                                    {isChecked && option === isChecked.selected && option !== task.correctAnswer && <FaTimes className="option-icon" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {!isChecked && (
                                        <div className="check-answer-container">
                                            <button 
                                                className="check-answer-btn" 
                                                onClick={() => handleCheckAnswer(task)}
                                                disabled={!taskAnswers[task.id]}
                                            >
                                                Periksa Jawaban
                                            </button>
                                        </div>
                                    )}
                                </>
                            );
                        })()}

                        {task.type === 'essay' && (
                          <div className="essay-wrapper">
                              <textarea
                                  className="essay-textarea"
                                  value={taskAnswers[task.id] || ''}
                                  onChange={(e) => handleTaskAnswer(task.id, e.target.value)}
                                  placeholder="Tuliskan jawaban Anda di sini..."
                                  rows="10"
                              />
                              <div className="essay-footer">
                                  <span className="essay-char-count">
                                      {(taskAnswers[task.id] || '').length} karakter
                                  </span>
                              </div>
                          </div>
                        )}
                      </div>

                      <div className="tasks-navigation">
                        <button 
                          onClick={() => setCurrentTaskIndex(i => i - 1)} 
                          disabled={currentTaskIndex === 0}
                        >
                          <FaChevronLeft /> Sebelumnya
                        </button>
                        <button 
                          onClick={() => setCurrentTaskIndex(i => i + 1)} 
                          disabled={currentTaskIndex === activeLesson.tasks.length - 1 || !isTaskComplete(task)}
                        >
                          Berikutnya <FaChevronRight />
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
              <div className="lesson-footer">
                <button className="lesson-nav-button" onClick={handleCompleteAndReturn}>
                  Tandai Selesai & Kembali
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
    </> 
  );
}