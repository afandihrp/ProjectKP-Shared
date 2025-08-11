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

async function getUserInfo() {
  // Return a new Promise
  return new Promise(async (resolve, reject) => {
    try {
      const user = new dataFetch("/users", null, 'POST');
      const response = await user.makeRequest();

      if (!response.err && response.data) {
        // If successful, resolve the promise with the data
        resolve(response.data);
      } else {
        // If there's an error or no data, DO NOTHING.
        // The promise will stay in a 'pending' state,
        // allowing the timeout to take effect.
        console.log("API call failed or returned no data. Promise will remain pending.");
      }
    } catch (error) {
      // If there is a network error, you can also leave it pending
      // or reject it if you want to handle it differently.
      // For this specific goal, we do nothing.
      console.error("A network or other critical error occurred.", error);
    }
  });
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

async function runWithTimeout(taskPromise, timeoutMs)
{
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(()=>{
      reject(new Error(`Timeout after ${timeoutMs}ms`));
    },timeoutMs);
  });

  try
  {
    const result = await Promise.race([taskPromise, timeoutPromise]);
    return result;
  }
  catch(err)
  {
    navigate(`/login`);
  }
}

  

  useEffect(() => {
    

    getUserInfo().then((datauser) => {
      // if(!datauser) return logout();
      console.log(datauser);
      setId(datauser[0].id);
      setName(datauser[0].name);
      setPhoneNumber(datauser[0].phonenumber);
      setProfileImage(datauser[0].profilepic || '');
      setRole(datauser[0].role);
      setAuthenticated(true);
    })

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