import React from 'react';
import Logo from '../assets/procodecg-new-logo.png';
import './Header.css';


// --- Component: Header ---
const Header = ({sidebaropen}) => (
    <header className="main-header">
        <button id='sidebar-toggle'>
            <svg width="100%" height="100%" viewBox="0 0 92 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 5L87 5" stroke="#b9b9b9ff" stroke-width="10" stroke-linecap="round"/>
                <path d="M5 44L87 44" stroke="#b9b9b9ff" stroke-width="10" stroke-linecap="round"/>
                <path d="M5 24L87 24" stroke="#b9b9b9ff" stroke-width="10" stroke-linecap="round"/>
            </svg>
        </button>
        

        <img src={Logo} alt='logo'/>
    </header>
);

export default Header;
