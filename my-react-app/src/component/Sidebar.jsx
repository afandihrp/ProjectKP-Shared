import React, { useState,useEffect } from 'react';
import { FaBook, FaCode, FaUser, FaSignOutAlt, FaChevronLeft, FaTachometerAlt, FaUserPlus } from "react-icons/fa";
import './Sidebar.css';
import { Navigate } from 'react-router-dom';
import { hasPermission } from '../role.js';



// Mock logo component - replace with your actual logo
const Logo = () => (
  <div className="logo-container">
    <div className="logo-icon">
      <FaCode size={24} />
    </div>
    <span className="logo-text">ProCodeCG</span>
  </div>
);

// Profile picture placeholder
const ProfilePic = ({ src, alt = "Profile" }) => (
  <div className="profile-pic">
    {src ? (
      <img src={src} alt={alt} />
    ) : (
      <div className="profile-placeholder">
        <FaUser size={20} />
      </div>
    )}
  </div>
);



const Sidebar = ({ 
  name = "Guest", 
  menuSelected = "Dashboard", 
  profilePic = "", 
  role="",
  logout = () => {}, //callback to parent component Dashboard.jsx
  handleselected_menu = () => {}, //callback to parent component Dashboard.jsx
  setMarginsize = () => {} //callback to parent component Dashboard.jsx
}) => {
  const [sidebarClosed, setSidebarClosed] = useState(window.innerWidth<=850?true:false);  
  // const {name,phoneNumber,profileImage,role} = useContext(userInfo);
  // const profilePic = profileImage;

  const menuOptions = [
    { value: 'Dashboard', icon: FaTachometerAlt },
    { value: 'My Courses', icon: FaBook },
    { value: 'Profile', icon: FaUser },
    { value: 'Python Compiler', icon: FaCode },
    ...(hasPermission({usrRole:role}, 'create:user')?[{ value: 'Add User', icon: FaUserPlus }]:[])
  ];

  const toggleSidebar = () => {
    setSidebarClosed(!sidebarClosed);
  };

  useEffect(() => {
    setMarginsize(sidebarClosed?100:220);
  }, [sidebarClosed]);

  const logoutUser = () => {    
    logout();
  }



  return (
    <aside className={`sidebar ${sidebarClosed ? 'closed' : ''}`}>
      {/* Header Section */}
      <div className="sidebar-header">
        <Logo />
        <button 
          className="toggle-btn"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FaChevronLeft className={`toggle-icon ${sidebarClosed ? 'rotated' : ''}`} />
        </button>
      </div>

      {/* Main Content */}
      <div className="sidebar-content">
        {/* Profile Section */}
        <div className="profile-section">
          <ProfilePic src={profilePic} alt={name} />
          <div className="profile-info">
            <span className="welcome-text">Welcome</span>
            <span className="user-name">{name}</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="nav-menu">
          {menuOptions.map((option) => {
            const IconComponent = option.icon;
            const isSelected = menuSelected === option.value;
            
            return (
              <button
                key={option.value}
                className={`nav-item ${isSelected ? 'active' : ''}`}
                onClick={() => handleselected_menu(option.value)}
                title={option.value}
              >
                <div className="nav-icon">
                  <IconComponent size={20} />
                </div>
                <span className="nav-text">{option.value}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Section */}
      <div className="sidebar-footer">
        <button 
          className="nav-item logout-btn"
          onClick={logoutUser}
          title="Logout"
        >
          <div className="nav-icon">
            <FaSignOutAlt size={20} />
          </div>
          <span className="nav-text">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;