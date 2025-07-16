import React, { useState, useEffect }from 'react';
import Header from './component/Header.jsx';
import Sidebar from './component/Sidebar.jsx';
import Proptypes from 'prop-types';
import Frontpage from './component/Frontpage.jsx';
import CourseListItem from './component/CourseListItem.jsx';
import Profile from './component/Profile.jsx';
import PythonCompiler from './component/PythonCompiler.jsx';






function Dashboard(props)
{
    const [marginsize, setMarginsize] = useState(280);
    const [menuSelected, selectMenu] = useState('Dashboard')
    const name = props.name;


    
    function handleselected_menu(current_menu)
    {
        selectMenu(current_menu);
        // alert(current_menu, menuSelected);
    }

    function handlesetMarginsize(value)
    {
        setMarginsize(value);
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
                setMarginsize={handlesetMarginsize}                
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
                setMarginsize={handlesetMarginsize}
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
                setMarginsize={handlesetMarginsize}
                />

                <Profile
                name={props.name}
                number={'0'}
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
                setMarginsize={handlesetMarginsize}
                />

                <PythonCompiler
                marginleft={marginsize}
                />


            </>);
    }
        
}


export default Dashboard;
