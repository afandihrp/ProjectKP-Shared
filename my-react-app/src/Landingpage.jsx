import React from 'react';

// --- CSS Styles Component ---
// Contains all the CSS rules for the application.
const Styles = () => (
  <style>{`
    :root {
      --blue-50: #EFF6FF;
      --blue-600: #2563EB;
      --gray-400: #9CA3AF;
      --gray-600: #4B5563;
      --gray-700: #374151;
      --gray-800: #1F2937;
      --gray-900: #111827;
      --white: #FFFFFF;
    }

    body {
      margin: 0;
      font-family: 'Inter', sans-serif;
      background-color: var(--white);
      color: var(--gray-800);
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    .container {
      width: 100%;
      margin-left: auto;
      margin-right: auto;
      padding-left: 1.5rem;
      padding-right: 1.5rem;
    }
    @media (min-width: 640px) { .container { max-width: 640px; } }
    @media (min-width: 768px) { .container { max-width: 768px; } }
    @media (min-width: 1024px) { .container { max-width: 1024px; } }
    @media (min-width: 1280px) { .container { max-width: 1280px; } }


    /* --- Header --- */
    .header {
      background-color: var(--white);
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .header-nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      padding-bottom: 1rem;
    }
    .header-logo {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--blue-600);
    }
    .header-nav {
      display: none;
    }
    @media (min-width: 768px) {
      .header-nav {
        display: flex;
        align-items: center;
      }
      .header-nav a {
        margin-left: 1.5rem;
        color: var(--gray-600);
      }
      .header-nav a:hover {
        color: var(--blue-600);
      }
    }
    .header-actions {
      display: flex;
      align-items: center;
    }
    .header-actions a {
      margin-left: 1rem;
    }
    .header-actions .login-btn {
      color: var(--gray-600);
    }
     .header-actions .login-btn:hover {
      color: var(--blue-600);
    }
    .header-actions .signup-btn {
      background-color: var(--blue-600);
      color: var(--white);
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      transition: all 0.2s ease;
    }
    .header-actions .signup-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
    }

    /* --- Hero Section --- */
    .hero-section {
      background-color: var(--blue-50);
      text-align: center;
      padding: 5rem 1.5rem;
      min-height: 60vh;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    @media (min-width: 768px) {
      .hero-section {
        padding: 8rem 1.5rem;
      }
    }
    .hero-title {
      font-size: 2.25rem;
      font-weight: 800;
      color: var(--gray-900);
      line-height: 1.2;
    }
    @media (min-width: 768px) {
      .hero-title {
        font-size: 3.75rem;
      }
    }
    .hero-subtitle {
      margin-top: 1.5rem;
      font-size: 1.125rem;
      color: var(--gray-600);
      max-width: 48rem;
      margin-left: auto;
      margin-right: auto;
    }
    .hero-cta-button {
      margin-top: 2rem;
      background-color: var(--blue-600);
      color: var(--white);
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      font-size: 1.125rem;
      font-weight: 600;
      display: inline-block;
      transition: all 0.3s ease;
    }
    .hero-cta-button:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
    }

    /* --- Footer --- */
    .footer {
      background-color: var(--gray-800);
      color: var(--white);
      padding: 3rem 0;
    }
    .footer-grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: 2rem;
    }
    @media (min-width: 768px) {
      .footer-grid {
        grid-template-columns: repeat(4, 1fr);
      }
    }
    .footer-column h3, .footer-column h4 {
      font-size: 1.125rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }
    .footer-column p, .footer-column li {
      color: var(--gray-400);
      margin-bottom: 0.5rem;
    }
    .footer-column a:hover {
      color: var(--white);
    }
    .footer-column ul {
      list-style: none;
      padding: 0;
    }
    .footer-social-icons {
      display: flex;
    }
    .footer-social-icons a {
      margin-right: 1rem;
      color: var(--gray-400);
    }
    .footer-social-icons a:hover {
      color: var(--white);
    }
    .footer-bottom {
      margin-top: 2rem;
      border-top: 1px solid var(--gray-700);
      padding-top: 2rem;
      text-align: center;
      color: var(--gray-400);
    }
  `}</style>
);


// --- SVG Icon Components ---
const FacebookIcon = () => (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
);
const TwitterIcon = () => (
     <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path></svg>
);
const GithubIcon = () => (
    <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12.011c0 4.434 2.865 8.18 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12.011C22 6.477 17.523 2 12 2z" clipRule="evenodd"></path></svg>
);


// --- Section Components ---
const Header = () => (
    <header className="header">
        <div className="container header-nav-container">
            <a href="#" className="header-logo">
              <img src="src/assets/procodecg-new-logo.png" width="200px"/>
            </a>
            <nav className="header-nav">
                <a href="#features">Features</a>
                <a href="#courses">Courses</a>
                <a href="#testimonials">Testimonials</a>
                <a href="#contact">Contact</a>
            </nav>
            <div className="header-actions">
                 <a href="/login" className="login-btn">Log In</a>
                 <a href="#" className="signup-btn">Forgot Password?</a>
            </div>
        </div>
    </header>
);

const Hero = () => (
    <main className="hero-section">
        <div className="container">
            <h1 className="hero-title">
                Unlock Your Potential. <br /> Learn Without Limits.
            </h1>
            <p className="hero-subtitle">
                Join thousands of learners on ProcodeCG. Access high-quality courses from expert instructors, anytime, anywhere.
            </p>
            <a href="#" className="hero-cta-button">
                Get Started
            </a>
        </div>
    </main>
);

const Footer = () => (
    <footer className="footer">
        <div className="container">
            <div className="footer-grid">
                <div className="footer-column">
                    <h3>ProcodeCG</h3>
                    <p>Your partner in lifelong learning.</p>
                </div>
                <div className="footer-column">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h4>Follow Us</h4>
                    <div className="footer-social-icons">
                        <a href="#"><FacebookIcon /></a>
                        <a href="#"><TwitterIcon /></a>
                        <a href="#"><GithubIcon /></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2025 Learnify. All rights reserved.</p>
            </div>
        </div>
    </footer>
);


// --- Main App Component ---
export default function Landingpage() {
  return (
    <div>
      <Styles />
      <Header />
      <Hero />
      <Footer />
    </div>
  );
}
