import React, { useState, useEffect }from 'react';
import Header from './component/Header.jsx';
import Sidebar from './component/Sidebar.jsx';
import Proptypes from 'prop-types';
import Frontpage from './component/Frontpage.jsx';
import CourseListItem from './component/CourseListItem.jsx';
import Profile from './component/Profile.jsx';
import PythonCompiler from './component/PythonCompiler.jsx';
import MyCoursesPage from './component/MyCoursesPage.jsx';
import AdminCoursesPage from './component/AdminCoursesPage.jsx';
import AddUser from './component/AddUser.jsx';







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

    const sidebar = () =>{
        return(
             <Sidebar
                name={props.name}
                menuSelected={menuSelected}
                handleselected_menu={handleselected_menu}
                profilePic={props.profilePic}
                role={props.role}
                logout={props.logout}
                setMarginsize={handlesetMarginsize}                
            />
        );
    }


    switch(menuSelected)
    {
        case 'Dashboard':
            return(<>
                {sidebar()}
        
                <Frontpage
                name={props.name}
                marginleft={marginsize}                
                />

            </>);
        case 'My Courses':
            return(<>
                {sidebar()}
                <MyCoursesPage
                marginleft={marginsize}
                />
            </>);
        
        case 'Profile':
            return(<>
                {sidebar()}

                <Profile
                name={props.name}
                number={'0'}
                marginleft={marginsize}
                />
            </>);
        case 'Python Compiler':
            return(<>
                {sidebar()}

                <PythonCompiler
                marginleft={marginsize}
                />


            </>);
        case 'Add User':
            return(<>
                {sidebar()}
                <AddUser
                marginleft={marginsize}
                />

            </>);
    }
        
}


export default Dashboard;
