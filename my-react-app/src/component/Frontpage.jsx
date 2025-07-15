import React from 'react';
import { 
  FaBook, 
  FaChartLine, 
  FaClock, 
  FaAward, 
  FaPlay, 
  FaUsers, 
  FaCalendarAlt,
  FaArrowRight,
  FaStar,
  FaGraduationCap,
  FaLightbulb,
  FaCode
} from 'react-icons/fa';
import './Frontpage.css';

const Frontpage = ({ name = "Student", marginleft = 0 }) => {
  // Quick Stats Data
  const quickStats = [
    {
      icon: FaBook,
      title: "Active Courses",
      value: "5",
      subtitle: "2 due this week",
      color: "#3b82f6"
    },
    {
      icon: FaChartLine,
      title: "Progress",
      value: "78%",
      subtitle: "Overall completion",
      color: "#10b981"
    },
    {
      icon: FaClock,
      title: "Study Time",
      value: "24h",
      subtitle: "This month",
      color: "#f59e0b"
    },
    // {
    //   icon: FaAward,
    //   title: "Certificates",
    //   value: "3",
    //   subtitle: "Earned",
    //   color: "#8b5cf6"
    // }
  ];

  // Continue Learning Data
  const continueLearnig = [
    {
      title: "Python for Beginners",
      subtitle: "Master the fundamentals",
      progress: 65,
      duration: "2h 30m left",
      icon: FaCode,
      color: "#3b82f6"
    },
    // {
    //   title: "React Development",
    //   subtitle: "Build modern web apps",
    //   progress: 40,
    //   duration: "4h 15m left",
    //   icon: FaLightbulb,
    //   color: "#10b981"
    // },
    {
      title: "Data Structures",
      subtitle: "Algorithm fundamentals",
      progress: 85,
      duration: "45m left",
      icon: FaGraduationCap,
      color: "#f59e0b"
    }
  ];

  // Recent Activity Data
  const recentActivity = [
    {
      type: "completion",
      title: "Completed 'Variables and Data Types'",
      course: "Python for Beginners",
      time: "2 hours ago",
      icon: FaAward,
      color: "#10b981"
    },
    // {
    //   type: "assignment",
    //   title: "New assignment available",
    //   course: "React Development",
    //   time: "5 hours ago",
    //   icon: FaBook,
    //   color: "#3b82f6"
    // },
    // {
    //   type: "discussion",
    //   title: "Discussion post in 'Advanced Topics'",
    //   course: "Data Structures",
    //   time: "1 day ago",
    //   icon: FaUsers,
    //   color: "#f59e0b"
    // }
  ];

  // Upcoming Deadlines
  const upcomingDeadlines = [
    {
      title: "Python Final Project",
      course: "Python for Beginners",
      dueDate: "Tomorrow",
      priority: "high"
    },
    {
      title: "React Component Assignment",
      course: "React Development",
      dueDate: "Nov 20",
      priority: "medium"
    },
    {
      title: "Algorithm Quiz",
      course: "Data Structures",
      dueDate: "Nov 25",
      priority: "low"
    }
  ];

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="frontpage" style={{ marginLeft: `${marginleft}px` }}>
      <div className="container">
        {/* Header Section */}
        <div className="header-section">
          <div className="greeting">
            <h1>{getTimeOfDay()}, {name}!</h1>
            <p>Ready to continue your learning journey?</p>
          </div>
          <div className="date-info">
            <FaCalendarAlt />
            <span>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="stats-grid">
          {quickStats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                <stat.icon />
              </div>
              <div className="stat-content">
                <h3>{stat.value}</h3>
                <p className="stat-title">{stat.title}</p>
                <span className="stat-subtitle">{stat.subtitle}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="content-grid">
          {/* Continue Learning */}
          <div className="content-section">
            <div className="section-header">
              <h2>Continue Learning</h2>
              <button className="see-all-btn">
                See All <FaArrowRight />
              </button>
            </div>
            <div className="courses-list">
              {continueLearnig.map((course, index) => (
                <div key={index} className="course-card">
                  <div className="course-icon" style={{ backgroundColor: course.color }}>
                    <course.icon />
                  </div>
                  <div className="course-info">
                    <h3>{course.title}</h3>
                    <p>{course.subtitle}</p>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${course.progress}%`, backgroundColor: course.color }}
                      ></div>
                    </div>
                    <div className="course-meta">
                      <span>{course.progress}% complete</span>
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  <button className="continue-btn">
                    <FaPlay />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="content-section">
            <div className="section-header">
              <h2>Recent Activity</h2>
            </div>
            <div className="activity-list">
              {recentActivity.map((activity, index) => (
                <div key={index} className="activity-item">
                  <div className="activity-icon" style={{ backgroundColor: activity.color }}>
                    <activity.icon />
                  </div>
                  <div className="activity-content">
                    <h4>{activity.title}</h4>
                    <p>{activity.course}</p>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Deadlines */}
          <div className="content-section">
            <div className="section-header">
              <h2>Upcoming Deadlines</h2>
            </div>
            <div className="deadlines-list">
              {upcomingDeadlines.map((deadline, index) => (
                <div key={index} className={`deadline-item priority-${deadline.priority}`}>
                  <div className="deadline-content">
                    <h4>{deadline.title}</h4>
                    <p>{deadline.course}</p>
                  </div>
                  <div className="deadline-date">
                    <span className="due-label">Due</span>
                    <span className="due-date">{deadline.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
            {/* <div className="content-section">
                <div className="section-header">
                    <h2>Recent Achievements</h2>
                </div>
                <div className="achievements-grid">
                    <div className="achievement-card">
                    <div className="achievement-icon">
                        <FaStar />
                    </div>
                    <div className="achievement-content">
                        <h4>First Course Complete</h4>
                        <p>Completed Python Basics</p>
                    </div>
                    </div>
                    <div className="achievement-card">
                    <div className="achievement-icon">
                        <FaGraduationCap />
                    </div>
                    <div className="achievement-content">
                        <h4>Quick Learner</h4>
                        <p>Finished 3 lessons today</p>
                    </div>
                    </div>
                </div>
            </div> */}
        </div>
      </div>
    </div>
  );
};

export default Frontpage;