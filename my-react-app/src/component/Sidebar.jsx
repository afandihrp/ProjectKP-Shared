import React, { useState, useEffect } from 'react';
import { FaBook, FaCode, FaUser, FaSignOutAlt, FaChevronLeft, FaTachometerAlt, FaUserPlus } from "react-icons/fa";
// 1. Import the CSS module file. The styles are imported as an object.
import styles from './Sidebar.module.css'; 
import { hasPermission } from '../role.js';
import { MdLeaderboard } from 'react-icons/md';

// --- Sub-components modified to accept styles as a prop ---

const Logo = ({ styles }) => (
    <div className={styles['logo-container']}>
        <div className={styles['logo-icon']}>
            <FaCode size={24} />
        </div>
        <span className={styles['logo-text']}>ProCodeCG</span>
    </div>
);

const ProfilePic = ({ src, alt = "Profile", styles }) => (
    <div className={styles['profile-pic']}>
        {src ? (
            <img src={src} alt={alt} />
        ) : (
            <div className={styles['profile-placeholder']}>
                <FaUser size={20} />
            </div>
        )}
    </div>
);

// --- Main Sidebar Component ---

const Sidebar = ({
    name = "Guest",
    menuSelected = "Dashboard",
    profilePic = "",
    role = "",
    logout = () => { },
    handleselected_menu = () => { },
    setMarginsize = () => { }
}) => {
    const [sidebarClosed, setSidebarClosed] = useState(window.innerWidth <= 850);

    const menuOptions = [
        { value: 'Dashboard', icon: FaTachometerAlt },
        { value: 'My Courses', icon: FaBook },
        { value: 'Profile', icon: FaUser },
        { value: 'Python Compiler', icon: FaCode },
        { value: 'Leaderboard', icon: MdLeaderboard },
        ...(hasPermission({ usrRole: role }, 'edit:user') ? [{ value: 'Add User', icon: FaUserPlus }] : [])
    ];


    const toggleSidebar = () => {
        setSidebarClosed(!sidebarClosed);
    };

    useEffect(() => {
        setMarginsize(sidebarClosed ? 100 : 220);
    }, [sidebarClosed, setMarginsize]);

    const logoutUser = () => {
        logout();
    }

    // 2. Use template literals to combine multiple classes from the styles object
    const sidebarClasses = `${styles.sidebar} ${sidebarClosed ? styles.closed : ''}`;
    const toggleIconClasses = `${styles['toggle-icon']} ${sidebarClosed ? styles.rotated : ''}`;

    return (
        <aside className={sidebarClasses}>
            {/* Header Section */}
            <div className={styles['sidebar-header']}>
                <Logo styles={styles} /> {/* Pass styles object to sub-components */}
                <button
                    className={styles['toggle-btn']}
                    onClick={toggleSidebar}
                    aria-label="Toggle sidebar"
                >
                    <FaChevronLeft className={toggleIconClasses} />
                </button>
            </div>

            {/* Main Content */}
            <div className={styles['sidebar-content']}>
                {/* Profile Section */}
                <div className={styles['profile-section']}>
                    <ProfilePic src={profilePic} alt={name} styles={styles} />
                    <div className={styles['profile-info']}>
                        <span className={styles['welcome-text']}>Welcome</span>
                        <span className={styles['user-name']}>{name}</span>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className={styles['nav-menu']}>
                    {menuOptions.map((option) => {
                        const IconComponent = option.icon;
                        const isSelected = menuSelected === option.value;
                        const navItemClasses = `${styles['nav-item']} ${isSelected ? styles.active : ''}`;

                        return (
                            <button
                                key={option.value}
                                className={navItemClasses}
                                onClick={() => handleselected_menu(option.value)}
                                title={option.value}
                            >
                                <div className={styles['nav-icon']}>
                                    <IconComponent size={20} />
                                </div>
                                <span className={styles['nav-text']}>{option.value}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Footer Section */}
            <div className={styles['sidebar-footer']}>
                <button
                    className={`${styles['nav-item']} ${styles['logout-btn']}`}
                    onClick={logoutUser}
                    title="Logout"
                >
                    <div className={styles['nav-icon']}>
                        <FaSignOutAlt size={20} />
                    </div>
                    <span className={styles['nav-text']}>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
