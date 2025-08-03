import React, { useState, useEffect, createContext } from "react";
// 👇 1. Import useNavigate
import { BrowserRouter, Routes, Route, useNavigate, data } from 'react-router-dom';
import LoginPage from './Loginpage';
import Landingpage from './Landingpage';
import Test from './Test';
import Dashboard from './Dashboard';
import './App.css';
import cookie from 'js-cookie';
import { string } from "prop-types";
import { Info } from "lucide-react";
import dataFetch from "./handleFetching";
export const tokenAPI = createContext();
export const userInfo = createContext();

// ... (your getUserInfo, newRefreshToken, getToken functions remain the same)
function Loading(){
  return(
    <h1>Loading...</h1>
  )
}

async function getUserInfo(){
  const user = new dataFetch("/users",null,'POST');
  const response =await user.makeRequest();
  if(!response.err)
  {
    return response.data&&response.data;
  }
  else
  {
    return null;
  }
}

// /**
//  * 
//  * @returns object token by .token
//  */
// async function newRefreshToken()
// {
//   // const token = cookie.get('refreshToken');
//   const payload = new dataFetch('/login/refresh',null,'GET')
//   const response = await payload.makeRequest();
//   if(!response.err)
//   {
//     cookie.set('token',response.data.token);    
//     // console.log(response.data);
//     return response.data;
//   }
//   else
//   {
//     cookie.remove('refreshToken');
//     cookie.remove('token');
//     return null;
//   }
// }

/**
 * 
 * @returns token
 */
function getToken()
{
  const token = cookie.get('token');
  const refreshToken = cookie.get('refreshToken');
  return {token, refreshToken};
}

// You must wrap the component logic in another component because hooks
// like useNavigate can only be called inside a component that is a
// descendant of <BrowserRouter>.
function AppContent() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('0');
  const [profileImage, setProfileImage] = useState('');
  const [role, setRole] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate(); // <-- 2. Initialize navigate

  async function logout() {
    const logOut = new dataFetch('/login/logout',null,'GET');
    await logOut.makeRequest();
    Promise.resolve().then(()=>{
      cookie.remove('refreshToken');
      cookie.remove('token');            
      setAuthenticated(false);                   
    }).then(()=>{
      navigate('/login');
    })
  }


  useEffect(() => {
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error('Request timed out after 5 seconds'));
      }, 5000); // 5000 milliseconds = 5 seconds
    });

      Promise.race([
        getUserInfo(), // This is your actual API call promise
        timeoutPromise  // This is the timeout promise
      ]).then((datauser) => {
      if(datauser != null)
      {
        console.log(datauser);
        setId(datauser[0].id);
        setName(datauser[0].name);
        setPhoneNumber(datauser[0].phonenumber);
        setProfileImage(datauser[0].profilepic || '');
        setRole(datauser[0].role);
        setAuthenticated(true);
      }
      
    }).catch(error => {
      // This block runs if the timeout happens first, OR if getUserInfo() itself fails
      console.error("Operation failed:", error.message);
      setAuthenticated(false);
      navigate('/login');
    });

    // const token = cookie.get('refreshToken');
    // if (!token) 
    // {
    //   return logout();
    // } 
    // else 
    // {
    //   setAuthenticated(true);
    //   newRefreshToken(token).then((data) => {
    //     cookie.set('token', data.token);
    //     getUserInfo().then((datauser) => {
    //       if(!datauser) return logout();
    //       if (datauser && datauser[0]) {
            
    //         setId(datauser[0].id);
    //         setName(datauser[0].name);
    //         setPhoneNumber(datauser[0].phonenumber);
    //         setProfileImage(datauser[0].profilepic || '');
    //         setRole(datauser[0].role);
            
    //       }
    //     });
    //   }).catch((err) => {
    //     Promise.resolve().then(()=>{
    //       cookie.remove('refreshToken');
    //       cookie.remove('token');            
    //       setAuthenticated(false); 
                      
    //     }).then(()=>{
    //       navigate('/login');
    //     })
          
          
    //   });
      
    // }
  },[authenticated])


  
  return (
       <userInfo.Provider value={{id,name,phoneNumber,profileImage,role}}>  
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<LoginPage setAuthenticated={setAuthenticated} />} />
          <Route
              path="/Dashboard"
              element={authenticated?(<Dashboard
                  name={name}
                  profilePic={profileImage}
                  phoneNumber={phoneNumber}
                  role={role}
                  logout={logout}
                  setAuthenticated={setAuthenticated}
                  />
                ):(
                  <Loading />
                )
              }
            />
          <Route path="*" element={<Test authenticated={authenticated} />} />
        </Routes>
      </userInfo.Provider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;