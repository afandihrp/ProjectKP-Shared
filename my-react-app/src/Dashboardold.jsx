import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// --- Styles ---
// In a real React project, this would be in a separate styles.css file.


const Styles = () => (
  <style>{`
    /* CSS Variables for consistent theming */
    :root {
        --blue-50: #EFF6FF;
        --blue-100: #DBEAFE;
        --blue-600: #2563EB;
        --blue-700: #1D4ED8;
        --green-100: #D1FAE5;
        --green-500: #10B981;
        --green-600: #059669;
        --yellow-100: #FEF3C7;
        --yellow-500: #F59E0B;
        --yellow-600: #D97706;
        --purple-600: #7C3AED;
        --purple-700: #6D28D9;
        --gray-100: #F3F4F6;
        --gray-200: #E5E7EB;
        --gray-300: #D1D5DB;
        --gray-500: #6B7280;
        --gray-600: #4B5563;
        --gray-700: #374151;
        --gray-800: #1F2937;
        --gray-900: #111827;
        --white: #FFFFFF;
        --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    }

    /* Basic Reset and Body Styles */
    body {
        margin: 0;
        font-family: 'Inter', sans-serif;
        background-color: var(--gray-100);
        color: var(--gray-800);
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    /* Layout */
    .dashboard-layout {
        display: flex;
        height: 100vh;
    }

    /* Sidebar */
    .sidebar {
        width: 16rem;
        background-color: var(--white);
        box-shadow: var(--shadow-lg);
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 30;
        transition: transform 0.3s ease-in-out;
    }

    .sidebar-header {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem 1.5rem;
    }

    .sidebar-logo {
        font-size: 1.5rem;
        font-weight: 700;
        color: var(--blue-600);
    }

    .sidebar-nav {
        padding: 0.5rem 1rem;
    }

    .nav-link {
        display: flex;
        align-items: center;
        padding: 0.75rem 1rem;
        margin-top: 0.5rem;
        color: var(--gray-600);
        border-radius: 0.5rem;
        cursor: pointer;
    }
    
    .nav-link:hover {
        background-color: var(--gray-200);
    }

    .nav-link.active {
        background-color: var(--blue-600);
        color: var(--white);
    }

    .nav-link svg {
        width: 1.5rem;
        height: 1.5rem;
        margin-right: 1rem;
    }

    /* Main Content Area */
    .main-content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        margin-left: 16rem; /* Same as sidebar width */
    }

    /* Main Header */
    .main-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.5rem;
        background-color: var(--white);
        border-bottom: 2px solid var(--gray-200);
    }

    .header-title {
        font-size: 1.5rem;
        font-weight: 700;
        text-transform: capitalize;
    }
    
    .header-user-profile {
        position: relative;
    }

    .profile-image {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 9999px;
        object-fit: cover;
        border: 2px solid var(--gray-300);
    }

    /* Page Content */
    .page-container {
        flex-grow: 1;
        overflow-y: auto;
        padding: 1.5rem;
    }

    /* Utility Classes */
    .card {
        background-color: var(--white);
        padding: 1.5rem;
        border-radius: 0.5rem;
        box-shadow: var(--shadow-md);
        margin-bottom: 1.5rem;
    }

    .button {
        display: inline-block;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-weight: 500;
        text-align: center;
        border: none;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .button-primary {
        background-color: var(--blue-600);
        color: var(--white);
    }
    .button-primary:hover {
        background-color: var(--blue-700);
    }
    
    .button-secondary {
        background-color: var(--gray-200);
        color: var(--gray-700);
    }
    .button-secondary:hover {
        background-color: var(--gray-300);
    }

    .button-ai {
        background-color: var(--purple-600);
        color: var(--white);
    }
    .button-ai:hover {
        background-color: var(--purple-700);
    }

    /* Mobile Responsiveness */
    .mobile-menu-toggle {
        display: none;
        cursor: pointer;
        padding: 0.5rem;
    }
    .sidebar.closed {
        transform: translateX(-100%);
    }

    @media (max-width: 768px) {
        .sidebar {
            position: fixed;
            z-index: 100;
        }
        .main-content {
            margin-left: 0;
        }
        .mobile-menu-toggle {
            display: block;
        }
    }
    
    /* Course List Styles */
    .course-list .course-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        padding: 1rem;
        border: 1px solid var(--gray-200);
        border-radius: 0.5rem;
        margin-bottom: 1rem;
        gap: 1rem;
    }
    @media (min-width: 768px) {
        .course-list .course-item {
            flex-direction: row;
            align-items: center;
        }
    }
    .course-item-details {
        display: flex;
        align-items: center;
    }
    .course-item-details img {
        width: 6rem;
        height: 4rem;
        object-fit: cover;
        border-radius: 0.375rem;
        margin-right: 1rem;
    }
    .course-item-progress {
        width: 100%;
    }
    @media (min-width: 768px) {
        .course-item-progress {
            width: 25%;
        }
    }
    .progress-bar-bg {
        width: 100%;
        background-color: var(--gray-200);
        border-radius: 9999px;
        height: 0.625rem;
    }
    .progress-bar-fg {
        background-color: var(--blue-600);
        height: 0.625rem;
        border-radius: 9999px;
    }
    .course-item-actions {
        display: flex;
        gap: 0.5rem;
        width: 100%;
    }
    @media (min-width: 768px) {
        .course-item-actions {
            width: auto;
        }
        .course-item-actions .button {
            flex-grow: 0;
        }
    }
    .course-item-actions .button {
        flex-grow: 1;
    }
  `}</style>
);

// --- Component: Sidebar ---
const Sidebar = ({ activePage, setActivePage, isOpen }) => {
    const navItems = ['dashboard', 'my-courses', 'explore', 'profile', 'settings'];
    const icons = {
        dashboard: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>,
        'my-courses': <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>,
        explore: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>,
        profile: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>,
        settings: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
    };

    return (
        <aside className={`sidebar ${isOpen ? '' : 'closed'}`}>
            <div className="sidebar-header">
                <a href="#" className="sidebar-logo">Learnify</a>
            </div>
            <nav className="sidebar-nav">
                {navItems.map(item => (
                    <a key={item} onClick={() => setActivePage(item)} className={`nav-link ${activePage === item ? 'active' : ''}`}>
                        {icons[item]}
                        <span>{item.replace('-', ' ')}</span>
                    </a>
                ))}
            </nav>
        </aside>
    );
};

// --- Component: Header ---
const Header = ({ pageTitle, onMenuClick }) => (
    <header className="main-header">
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <button onClick={onMenuClick} className="mobile-menu-toggle">
                <svg style={{ width: '1.5rem', height: '1.5rem' }} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
            </button>
            <h1 className="header-title" style={{ marginLeft: '1rem' }}>{pageTitle.replace('-', ' ')}</h1>
        </div>
        <div className="header-user-profile">
            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Your avatar" className="profile-image" />
        </div>
    </header>
);

// --- Page Components ---
const DashboardPage = () => (
    <section>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 600, marginBottom: '1.5rem' }}>Welcome back, Alex!</h2>
        <div className="card">
            <h3>Continue Learning</h3>
            <p>Your active courses will appear here.</p>
        </div>
    </section>
);

const MyCoursesPage = () => (
    <section>
        <div className="card course-list">
            <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>All My Courses</h3>
            {/* Course Item 1 */}
            <div className="course-item">
                <div className="course-item-details">
                    <img src="https://placehold.co/600x400/3B82F6/FFFFFF?text=Web+Dev" alt="Web Dev" />
                    <div>
                        <h4 style={{ fontWeight: 600 }}>The Complete Web Developer Bootcamp</h4>
                        <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>By Dr. Angela Yu</p>
                    </div>
                </div>
                <div className="course-item-progress">
                    <div className="progress-bar-bg"><div className="progress-bar-fg" style={{ width: '45%' }}></div></div>
                    <p style={{ textAlign: 'right', fontSize: '0.875rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>45% Complete</p>
                </div>
                <div className="course-item-actions">
                    <a href="#" className="button button-ai">✨ Ask AI Assistant</a>
                    <a href="#" className="button button-primary">Continue</a>
                </div>
            </div>
            {/* Course Item 2 */}
            <div className="course-item">
                <div className="course-item-details">
                    <img src="https://placehold.co/600x400/10B981/FFFFFF?text=Data+Science" alt="Data Science" />
                    <div>
                        <h4 style={{ fontWeight: 600 }}>Data Science & Machine Learning A-Z</h4>
                        <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>By Kirill Eremenko</p>
                    </div>
                </div>
                <div className="course-item-progress">
                    <div className="progress-bar-bg"><div className="progress-bar-fg" style={{ width: '100%', backgroundColor: 'var(--green-500)' }}></div></div>
                    <p style={{ textAlign: 'right', fontSize: '0.875rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>Completed</p>
                </div>
                <div className="course-item-actions">
                    <a href="#" className="button button-ai">✨ Ask AI Assistant</a>
                    <a href="#" className="button button-secondary">View Certificate</a>
                </div>
            </div>
        </div>
    </section>
);

const ExplorePage = () => (
    <section>
        <div className="card">
            <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>✨ AI Learning Path Generator</h3>
            <p style={{ color: 'var(--gray-600)', marginTop: '0.5rem', marginBottom: '1rem' }}>Tell us your career goal, and our AI will create a customized learning path for you.</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="text" placeholder="e.g., Become a Full-Stack Developer" style={{ width: '100%', padding: '0.5rem', border: '1px solid var(--gray-300)', borderRadius: '0.5rem' }} />
                <button className="button button-primary">Generate</button>
            </div>
        </div>
    </section>
);

const ProfilePage = () => (
    <section><div className="card"><h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Edit Profile</h3><p>Profile editing form will be here.</p></div></section>
);

const SettingsPage = () => (
    <section><div className="card"><h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Account Settings</h3><p>Account settings will be here.</p></div></section>
);

// --- Main App Component ---
export default function Dashboard() {
    const [activePage, setActivePage] = useState('dashboard');
    const [isSidebarOpen, setSidebarOpen] = useState(true);

    const renderPage = () => {
        switch (activePage) {
            case 'my-courses':
                return <MyCoursesPage />;
            case 'explore':
                return <ExplorePage />;
            case 'profile':
                return <ProfilePage />;
            case 'settings':
                return <SettingsPage />;
            case 'dashboard':
            default:
                return <DashboardPage />;
        }
    };
    
    return (
        <>
            <Styles />
            <div className="dashboard-layout">
                <Sidebar activePage={activePage} setActivePage={setActivePage} isOpen={isSidebarOpen} />
                <div className="main-content">
                    <Header pageTitle={activePage} onMenuClick={() => setSidebarOpen(!isSidebarOpen)} />
                    <main className="page-container">
                        {renderPage()}
                    </main>
                </div>
            </div>
        </>
    );
}
