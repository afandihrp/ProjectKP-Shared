import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/procodecg-new-logo.png';
import './Sidebar.css';
import defaultpic from '../assets/profile-default-svgrepo-com.svg';
import { useState, useEffect } from 'react';
import Proptypes from 'prop-types';


const DashboardIcon = ({ className }) => (
  <svg
    className={ className } // Apply the passed className here
    viewBox="0 0 24 24"
    fill="currentColor" // Inherits color from CSS
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM13 4.06189V5C13 5.55228 12.5523 6 12 6C11.4872 6 11.0645 5.61396 11.0067 5.11662L11 5V4.06189C7.46744 4.5024 4.65014 7.24607 4.09821 10.7428L4.06189 11H5C5.55228 11 6 11.4477 6 12C6 12.5128 5.61396 12.9355 5.11662 12.9933L5 13H4.06189C4.55399 16.9463 7.92038 20 12 20C15.9928 20 19.3024 17.0749 19.9028 13.2507L19.9381 13H19C18.4477 13 18 12.5523 18 12C18 11.4872 18.386 11.0645 18.8834 11.0067L19 11H19.9381C19.7149 9.21042 18.9007 7.60441 17.6969 6.38349L15.2725 11.1417L15.1183 11.436L14.8076 12.0461C14.4385 12.7668 14.0356 13.4999 13.4849 14.0506C12.5132 15.0223 10.8972 15.1399 9.87861 14.1213C8.86 13.1027 8.97764 11.4868 9.94932 10.5151C10.4214 10.043 11.0274 9.67957 11.6448 9.35293L12.5639 8.8816L13.413 8.43849L17.6162 6.30275C16.3953 5.09914 14.7894 4.28503 13 4.06189ZM13.1623 10.8376L12.9523 10.9503L12.7357 11.0631C12.3336 11.2717 11.914 11.4893 11.5637 11.7607L11.3625 11.9304L11.2898 12.0145C11.0974 12.2747 11.1552 12.5695 11.2928 12.7071C11.4305 12.8448 11.7252 12.9026 11.9854 12.7101L12.0706 12.6364L12.2392 12.4363C12.4564 12.1561 12.6391 11.8315 12.8102 11.5069L12.9368 11.2642C13.0125 11.1183 13.0869 10.9747 13.1623 10.8376Z"
    />
  </svg>
);


const CoursesIcon = ({ className }) => (
  <svg 
    className={className} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M4.72718 2.71244C5.03258 2.41324 5.46135 2.21816 6.27103 2.11151C7.10452 2.00172 8.2092 2 9.7931 2H14.2069C15.7908 2 16.8955 2.00172 17.729 2.11151C18.5387 2.21816 18.9674 2.41324 19.2728 2.71244C19.5782 3.01165 19.7773 3.43172 19.8862 4.22499C19.9982 5.04159 20 6.12387 20 7.67568V15.5135L7.34563 15.5135C6.44305 15.5132 5.82716 15.513 5.29899 15.6517C4.82674 15.7756 4.38867 15.9781 4 16.2442V7.67568C4 6.12387 4.00176 5.04159 4.11382 4.225C4.22268 3.43172 4.42179 3.01165 4.72718 2.71244ZM7.58621 5.78378C7.12914 5.78378 6.75862 6.1468 6.75862 6.59459C6.75862 7.04239 7.12914 7.40541 7.58621 7.40541H16.4138C16.8709 7.40541 17.2414 7.04239 17.2414 6.59459C17.2414 6.1468 16.8709 5.78378 16.4138 5.78378H7.58621ZM6.75862 10.3784C6.75862 9.93058 7.12914 9.56757 7.58621 9.56757H13.1034C13.5605 9.56757 13.931 9.93058 13.931 10.3784C13.931 10.8262 13.5605 11.1892 13.1034 11.1892H7.58621C7.12914 11.1892 6.75862 10.8262 6.75862 10.3784Z"
    />
    <path 
      d="M7.47341 17.1351C6.39395 17.1351 6.01657 17.1421 5.72738 17.218C4.93365 17.4264 4.30088 18.0044 4.02952 18.7558C4.0463 19.1382 4.07259 19.4746 4.11382 19.775C4.22268 20.5683 4.42179 20.9884 4.72718 21.2876C5.03258 21.5868 5.46135 21.7818 6.27103 21.8885C7.10452 21.9983 8.2092 22 9.7931 22H14.2069C15.7908 22 16.8955 21.9983 17.729 21.8885C18.5387 21.7818 18.9674 21.5868 19.2728 21.2876C19.4894 21.0753 19.6526 20.8023 19.768 20.3784H7.58621C7.12914 20.3784 6.75862 20.0154 6.75862 19.5676C6.75862 19.1198 7.12914 18.7568 7.58621 18.7568H19.9704C19.9909 18.2908 19.9972 17.7564 19.9991 17.1351H7.47341Z"
    />
  </svg>
);

const ProfileIcon = ({ className }) => (
  <svg 
    className={className}
    viewBox="0 0 24 24" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      fillRule="evenodd" 
      clipRule="evenodd" 
      d="M16.5 7.063C16.5 10.258 14.57 13 12 13c-2.572 0-4.5-2.742-4.5-5.938C7.5 3.868 9.16 2 12 2s4.5 1.867 4.5 5.063zM4.102 20.142C4.487 20.6 6.145 22 12 22c5.855 0 7.512-1.4 7.898-1.857a.416.416 0 0 0 .09-.317C19.9 18.944 19.106 15 12 15s-7.9 3.944-7.989 4.826a.416.416 0 0 0 .091.317z"
    />
  </svg>
);

const LogoutIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M16.125 12C16.125 11.5858 15.7892 11.25 15.375 11.25L4.40244 11.25L6.36309 9.56944C6.67759 9.29988 6.71401 8.8264 6.44444 8.51191C6.17488 8.19741 5.7014 8.16099 5.38691 8.43056L1.88691 11.4306C1.72067 11.573 1.625 11.7811 1.625 12C1.625 12.2189 1.72067 12.427 1.88691 12.5694L5.38691 15.5694C5.7014 15.839 6.17488 15.8026 6.44444 15.4881C6.71401 15.1736 6.67759 14.7001 6.36309 14.4306L4.40244 12.75L15.375 12.75C15.7892 12.75 16.125 12.4142 16.125 12Z" />
        <path d="M9.375 8C9.375 8.70219 9.375 9.05329 9.54351 9.3055C9.61648 9.41471 9.71025 9.50848 9.81946 9.58145C10.0717 9.74996 10.4228 9.74996 11.125 9.74996L15.375 9.74996C16.6176 9.74996 17.625 10.7573 17.625 12C17.625 13.2426 16.6176 14.25 15.375 14.25L11.125 14.25C10.4228 14.25 10.0716 14.25 9.8194 14.4185C9.71023 14.4915 9.6165 14.5852 9.54355 14.6944C9.375 14.9466 9.375 15.2977 9.375 16C9.375 18.8284 9.375 20.2426 10.2537 21.1213C11.1324 22 12.5464 22 15.3748 22L16.3748 22C19.2032 22 20.6174 22 21.4961 21.1213C22.3748 20.2426 22.3748 18.8284 22.3748 16L22.3748 8C22.3748 5.17158 22.3748 3.75736 21.4961 2.87868C20.6174 2 19.2032 2 16.3748 2L15.3748 2C12.5464 2 11.1324 2 10.2537 2.87868C9.375 3.75736 9.375 5.17157 9.375 8Z" />
    </svg>
);

const BackArrowIcon = ({ className }) => (
    <svg 
        className={className}
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24"
        fill="currentColor"
        rotate="90deg"
    >
      <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path>
    </svg>
);


function Sidebar(props){

    const name = props.name;
    const menuSelected = props.menuSelected;
    const profilePic = props.profilePic === ''?defaultpic:props.profilePic;
    const logout=props.logout;
    const [sidebarClosed, setSidebarClosed] = useState(true);
    
    const bgcolor = 'hsl(217, 90%, 60%)';
    

    const menuOption = [
        {value: 'Dashboard', Icon: DashboardIcon },
        {value: 'My Courses', Icon: CoursesIcon },
        {value:'Profile', Icon: ProfileIcon},
        {value: 'Python Compiler', Icon: DashboardIcon}
    ];

    function changeSidebarMode()
    {
        // alert("sidebar clicked")
        setSidebarClosed(!sidebarClosed);
        props.handleMargin();
        
    }

    
    
    return (
        <aside className={sidebarClosed?'sidebar':'sidebar closed'}>   
            <div id='backarrow'>
               <div 
                    id='backarrow-icon' 
                    className={sidebarClosed ? 'rotated' : ''} 
                    onClick={changeSidebarMode}
                >
                    <BackArrowIcon />
                </div>
            </div>
                               
            <div className='sidebar-content'>
                <div id='logo'>
                    <img src={logo} alt='logo' width={'150px'}/>
                </div>
                <hr className='hozontalline'/>

                <div id='profile'>
                    <p>welcome {name}</p>
                    <img src={profilePic} />
                </div>
                
                <nav className='MenuButton'>
                    <hr className='hozontalline'/>
                    {menuOption.map((option)=>(
                        <button   
                            style={{ backgroundColor:menuSelected===option.value?bgcolor:''}}                         
                            className='contentInline'
                            onClick={()=>props.handleselected_menu(option.value)}
                        >
                            
                            <div className='dashboard-icon'>
                                <option.Icon className={menuSelected===option.value?'icon-selected':'icon'}/>
                            </div>  
                            <p className={menuSelected===option.value?'icon-selected':'icon'}>{option.value}</p>                           
                                                  
                        </button>
                    ))
                    
                    }
                </nav>
            </div>

            <nav className='bottom-nav' onClick={logout}>
                <hr className='hozontalline'/>
                <div className='contentInline'>                   
                    <div className='dashboard-icon'>
                        <LogoutIcon className={'icon'}/>
                    </div>
                    <p>Logout</p>
                </div>
            </nav>
        </aside>
    );
};

Sidebar.propTypes = {
    name: Proptypes.string,
    menuSelected: Proptypes.string,

}

Sidebar.defaultProps = {
    name: "Guest",
    menuSelected: "Dashboard"

}



export default Sidebar;
