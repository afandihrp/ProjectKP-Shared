import React from 'react';
import styles from './Leaderboard.module.css'; // Import the CSS module

// --- Data for the Leaderboard ---
// Each course now has its own 'points' value.
const studentsData = [
  {
    name: 'Alex Smith',
    courses: [
      { name: 'Basic Python', progress: 95, color: '#3b82f6', points: 950 },
      { name: 'Web Development', progress: 88, color: '#8b5cf6', points: 100 },
      { name: 'Basic C Language', progress: 80, color: '#10b981', points: 820 },
    ],
  },
  {
    name: 'Bella Johnson',
    courses: [
      { name: 'Basic Python', progress: 92, color: '#3b82f6', points: 920 },
      { name: 'Web Development', progress: 75, color: '#8b5cf6', points: 900 },
      { name: 'Basic C Language', progress: 90, color: '#10b981', points: 90 },
    ],
  },
  {
    name: 'Charlie Williams',
    courses: [
      { name: 'Basic Python', progress: 85, color: '#3b82f6', points: 850 },
      { name: 'Web Development', progress: 80, color: '#8b5cf6', points: 950 },
      { name: 'Basic C Language', progress: 65, color: '#10b981', points: 780 },
    ],
  },
];

// --- Helper Component for a single student ---
const Student = ({ rank, name, totalPoints, courses }) => {
  const getRankColor = (rank) => {
    if (rank === 1) return 'var(--gold-color)';
    if (rank === 2) return 'var(--silver-color)';
    if (rank === 3) return 'var(--bronze-color)';
    return 'var(--text-secondary)';
  };

  return (
    <li className={styles.studentItem}>
      <div className={styles.studentRank} style={{ color: getRankColor(rank) }}>{rank}</div>
      <div className={styles.studentInfo}>
        <div className={styles.studentProfile}>
          <div className={styles.name}>{name}</div>
        </div>
        <ul className={styles.coursesProgress}>
          {courses.map((course, index) => (
            <li key={index} className={styles.courseProgressItem}>
              <div className={styles.courseName}>{course.name}</div>
              <div className={styles.progressBarContainer}>
                <div
                  className={styles.progressBarFill}
                  style={{ width: `${course.progress}%`, backgroundColor: course.color }}
                >
                  {course.progress}%
                </div>
              </div>
              <div className={styles.coursePoints}>{course.points} pts</div>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.totalPoints}>
        <div className={styles.pointsValue}>{totalPoints}</div>
        <div className={styles.pointsLabel}>Total Points</div>
      </div>
    </li>
  );
};


// --- Main Leaderboard Component ---
const Leaderboard = (props) => {
  // Calculate total points, sort, and then assign rank
  const sortedStudents = [...studentsData]
    .map(student => ({
      ...student,
      totalPoints: student.courses.reduce((sum, course) => sum + course.points, 0)
    }))
    .sort((a, b) => b.totalPoints - a.totalPoints)
    .map((student, index) => ({
      ...student,
      rank: index + 1,
    }));

  return (
      <div className={styles.lmsLeaderboardBody} style={{ marginLeft: props.marginleft + 'px' }}>
        <div className={styles.leaderboardContainer}>
            <header className={styles.leaderboardHeader}>
                <h1>Overall Leaderboard</h1>
                <p>Top students based on total points and progress.</p>
            </header>
            <ul className={styles.studentList}>
                {sortedStudents.map((student) => (
                    <Student key={student.rank} {...student} />
                ))}
            </ul>
        </div>
      </div>
  );
};

export default Leaderboard;
