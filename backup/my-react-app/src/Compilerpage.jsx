import React, { useState, useEffect, useRef } from 'react';

// --- Komponen Styles ---
// Semua CSS dari file compiler.css dimasukkan di sini
const Styles = () => (
  <style>{`
    /* CSS Variables for consistent theming */
    :root {
        --blue-50: #EFF6FF;
        --blue-100: #DBEAFE;
        --blue-600: #2563EB;
        --blue-700: #1D4ED8;
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
        z-index: 30;
        flex-shrink: 0;
    }

    .sidebar-header {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid var(--gray-200);
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
        font-weight: 500;
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
    }

    /* Main Header */
    .main-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem 1.5rem;
        background-color: var(--white);
        border-bottom: 2px solid var(--gray-200);
        flex-shrink: 0;
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
    
    /* --- Playground Specific Styles --- */
    .playground-wrapper {
        display: flex;
        flex-direction: column;
        height: 100%;
        box-sizing: border-box;
    }

    .playground-controls {
        flex-shrink: 0;
        display: flex;
        justify-content: flex-end;
        margin-bottom: 1rem;
        border-bottom: 1px solid var(--gray-200);
        padding-bottom: 1rem;
    }

    .playground-container {
        display: flex;
        gap: 1.5rem;
        flex-grow: 1;
        min-height: 0;
    }

    .editor-pane, .output-pane {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-width: 0;
    }

    .playground-container h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1rem;
        font-weight: 600;
        color: var(--gray-700);
        flex-shrink: 0;
    }

    .code-input, .output-iframe {
        flex-grow: 1;
        width: 100%;
        border: 1px solid var(--gray-300);
        border-radius: 0.5rem;
        box-sizing: border-box;
    }

    .code-input {
        padding: 0.75rem;
        font-family: 'Menlo', 'Courier New', monospace;
        font-size: 0.875rem;
        background-color: var(--white);
        resize: none;
    }

    .code-input:focus {
        outline: 2px solid var(--blue-600);
        border-color: transparent;
    }

    .output-iframe {
        background-color: var(--white);
    }
  `}</style>
);


// --- Komponen Utama ---
export default function CodePlaygroundPage() {
    const [pythonCode, setPythonCode] = useState('print("Hello, World!")');
    const iframeRef = useRef(null);

    const handleRunCode = () => {
        // Logic untuk menjalankan kode akan ditambahkan di sini.
        // Untuk sekarang, kita hanya akan refresh dummy output.
        const iframe = iframeRef.current;
        if (iframe) {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.open();
            doc.write(`<pre style="margin:0; font-family:monospace; color: var(--gray-700);">Executing: ${pythonCode}\n\nHello, World!</pre>`);
            doc.close();
        }
    };
    
    // useEffect untuk menampilkan output dummy saat komponen pertama kali dirender
    useEffect(() => {
        const iframe = iframeRef.current;
        if (iframe) {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.open();
            doc.write('<pre style="margin:0; font-family:monospace; color: var(--gray-700);">Hello, World!</pre>');
            doc.close();
        }
    }, []); // Array dependensi kosong agar hanya berjalan sekali

    return (
        <>
            <Styles />
            <div className="dashboard-layout">
                <aside className="sidebar">
                    <div className="sidebar-header">
                        <a href="#" className="sidebar-logo">Learnify</a>
                    </div>
                    <nav className="sidebar-nav">
                        <a href="#" className="nav-link">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                            <span>Dashboard</span>
                        </a>
                        <a href="#" className="nav-link">
                             <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                            <span>My Courses</span>
                        </a>
                        <a href="#" className="nav-link active">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l-4 4-4-4M6 16l-4-4 4-4"></path></svg>
                            <span>Code Playground</span>
                        </a>
                    </nav>
                </aside>
                <div className="main-content">
                    <header className="main-header">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <h1 className="header-title" style={{ marginLeft: '1rem' }}>Code Playground</h1>
                        </div>
                        <div className="header-user-profile">
                            <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Your avatar" className="profile-image" />
                        </div>
                    </header>
                    <main className="page-container">
                        <div className="card playground-wrapper">
                            <div className="playground-controls">
                                <button className="button button-primary" onClick={handleRunCode}>Run Code</button>
                            </div>
                            <div className="playground-container">
                                <div className="editor-pane">
                                    <h3>Input</h3>
                                    <textarea 
                                        className="code-input" 
                                        placeholder="Tulis kode Python Anda di sini..."
                                        value={pythonCode}
                                        onChange={(e) => setPythonCode(e.target.value)}
                                    />
                                </div>
                                <div className="output-pane">
                                    <h3>Output</h3>
                                    <iframe ref={iframeRef} className="output-iframe"></iframe>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}