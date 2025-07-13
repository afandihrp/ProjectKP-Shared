import React, { useState }from 'react';
import Header from './component/Header.jsx';
import Sidebar from './component/Sidebar.jsx';
import Proptypes from 'prop-types';
import Frontpage from './component/Frontpage.jsx';
import CourseListItem from './component/CourseListItem.jsx';
import Profile from './component/Profile.jsx';






function Dashboard(props)
{
    const [marginsize, setMarginsize] = useState(190);
    const [sidebarClosed, setSidebarClosed] = useState(true);
    const [menuSelected, selectMenu] = useState('Dashboard')
    
    function handleselected_menu(current_menu)
    {
        selectMenu(current_menu);
        // alert(current_menu, menuSelected);
    }

    
    function handleMargin(){
        setSidebarClosed(!sidebarClosed);
        setMarginsize(sidebarClosed?90:190);
        // alert("hai"+ sidebarClosed+ marginsize);
    }

    switch(menuSelected)
    {
        case 'Dashboard':
            return(<>
                <Sidebar
                name={props.name}
                menuSelected={menuSelected}
                handleselected_menu={handleselected_menu}
                profilePic={props.profilePic}
                logout={props.logout}
                handleMargin={handleMargin}
                />
        
                <Frontpage
                name={props.name}
                marginleft={marginsize}
                
                />

            </>);
        case 'My Courses':
            return(<>
                <Sidebar
                name={props.name}
                menuSelected={menuSelected}
                handleselected_menu={handleselected_menu}
                profilePic={props.profilePic}
                logout={props.logout}
                handleMargin={handleMargin}
                />
                <CourseListItem
                marginleft={marginsize}
                />
            </>);
        
        case 'Profile':
            return(<>
                <Sidebar
                name={props.name}
                menuSelected={menuSelected}
                handleselected_menu={handleselected_menu}
                profilePic={props.profilePic}
                logout={props.logout}
                handleMargin={handleMargin}                
                />

                <Profile
                marginleft={marginsize}
                />
            </>);
        case 'Python Compiler':
            return(<>
                <Sidebar
                name={props.name}
                menuSelected={menuSelected}
                handleselected_menu={handleselected_menu}
                profilePic={props.profilePic}
                logout={props.logout}
                handleMargin={handleMargin}
                />



            </>);
    }
        
}


export default Dashboard;
