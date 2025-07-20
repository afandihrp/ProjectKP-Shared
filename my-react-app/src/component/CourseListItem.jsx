import React, { useState } from 'react';
import './CourseListItem.css';

// Expanded course data with modules and lessons
const courseData = {
  courseTitle: 'Advanced React Concepts',
  courseDescription: 'Take your React skills to the next level with this advanced course.',
  modules: [
    {
      moduleTitle: 'Module 1: Hooks in-depth',
      lessons: [
        {
          title: 'Introduction to Hooks',
          subtitle: 'Understanding the power of functional components.',
          content: 'In this lesson, we will explore the motivation behind React Hooks and how they revolutionize component logic.'
        },
        {
          title: 'useState and useEffect',
          subtitle: 'Mastering the most common Hooks.',
          content: 'A deep dive into the useState and useEffect Hooks, with practical examples and common pitfalls to avoid.'
        }
      ]
    },
    {
      moduleTitle: 'Module 2: State Management',
      lessons: [
        {
          title: 'Context API',
          subtitle: 'Global state management without external libraries.',
          content: 'Learn how to use the Context API to share state across your application efficiently.'
        },
        {
          title: 'Introduction to Redux',
          subtitle: 'For complex state management needs.',
          content: 'An introduction to the principles of Redux and how to integrate it into a React application.'
        }
      ]
    },
    {
        moduleTitle: 'Module 3: Performance Optimization',
        lessons: [
          {
            title: 'Memoization with useMemo and useCallback',
            subtitle: 'Preventing unnecessary re-renders.',
            content: 'Understand how to optimize your components using the useMemo and useCallback Hooks.'
          },
          {
            title: 'Code Splitting with React.lazy',
            subtitle: 'Loading components on demand.',
            content: 'Improve your application\'s initial load time by implementing code splitting with React.lazy and Suspense.'
          }
        ]
      }
  ]
};

export default function CourseListItem(props) {
  const [activeLesson, setActiveLesson] = useState(null);
  const [openModuleIndex, setOpenModuleIndex] = useState(0); // Modul pertama terbuka secara default

  const handleLessonClick = (lesson) => {
    setActiveLesson(lesson);
  };

  return (
    <div className="course-page" style={{ marginLeft: props.marginleft+'px'}}>
      <header className="course-header">
        <h1>{courseData.courseTitle}</h1>
        <p>{courseData.courseDescription}</p>
      </header>

      <main className="course-main">
        <nav className="course-sidebar">
          <h2>Course Modules</h2>
          {courseData.modules.map((module, moduleIndex) => {
            const isOpen = openModuleIndex === moduleIndex;
            return (
              <div key={moduleIndex} className={`module ${isOpen ? 'open' : ''}`}>
                <h3 onClick={() => setOpenModuleIndex(isOpen ? null : moduleIndex)}>
                  {module.moduleTitle}
                </h3>
                <ul className="lesson-list">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <li key={lessonIndex} onClick={() => handleLessonClick(lesson)} className={activeLesson?.title === lesson.title ? 'active' : ''}>
                      {lesson.title}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </nav>

        <section className="course-content">
          {activeLesson ? (
            <div className="lesson-view">
              <h2>{activeLesson.title}</h2>
              <h4>{activeLesson.subtitle}</h4>
              <p>{activeLesson.content}</p>
            </div>
          ) : (
            <div className="welcome-message">
              <h2>Welcome to the course!</h2>
              <p>Select a lesson from the sidebar to get started.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}