import React, { useState, useEffect }from 'react';
import Header from './component/Header.jsx';
import Sidebar from './component/Sidebar.jsx';
import Proptypes from 'prop-types';
import Frontpage from './component/Frontpage.jsx';
import CourseListItem from './component/CourseListItem.jsx';
import Profile from './component/Profile.jsx';
import PythonCompiler from './component/PythonCompiler.jsx';
import MyCoursesPage from './component/MyCoursesPage.jsx';
import AddUser from './component/AddUser.jsx';
import Leaderboard from './component/Leaderboard.jsx';







function Dashboard(props)
{    
    const [menuSelected, selectMenu] = useState('Dashboard')
    useEffect(() => {
        if(sessionStorage.getItem('menuSelected') != null)
        {
        selectMenu(sessionStorage.getItem('menuSelected'));
        }
    },[])
    const [marginsize, setMarginsize] = useState(280);

    
    const name = props.name;
    const user = { usrRole: props.role };

    
    function handleselected_menu(current_menu)
    {
        selectMenu(current_menu);
        sessionStorage.setItem('menuSelected',current_menu);

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
                marginleft={marginsize}
                selectMenu={handleselected_menu}
                
                />

            </>);
        case 'My Courses':
            return(<>
                {sidebar()}
                <MyCoursesPage
                marginleft={marginsize}
                user={user}
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
        case 'Leaderboard':
            return(
                <>
                    {sidebar()}
                    <Leaderboard
                    marginleft={marginsize} 
                    />
                </>
            );
    }
        
}


export default Dashboard;
