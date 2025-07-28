import React, { useState, useEffect, createContext } from "react";
// 👇 1. Import useNavigate
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './Loginpage';
import Landingpage from './Landingpage';
import Test from './Test';
import Dashboard from './Dashboard';
import './App.css';
import cookie from 'js-cookie';
import { string } from "prop-types";
import { Info } from "lucide-react";

export const tokenAPI = createContext();
export const userInfo = createContext();

// ... (your getUserInfo, newRefreshToken, getToken functions remain the same)

async function getUserInfo(token){
  try{
    const res = await fetch('http://environment-relief.gl.at.ply.gg:24588/users',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  
     }
    });
    const data = await res.json();
    if(!res.ok)
    {
      console.log('failed to fetch data');
      cookie.remove('refreshToken');
      cookie.remove('token');
      return null;
    }
    // console.log(data);
    return data; 
  }
  catch(err){
    console.log("error getInfo: " + err);
    cookie.remove('refreshToken');
    cookie.remove('token');
    return null; 
  }
}


async function newRefreshToken(){
  try{
    const token = cookie.get('refreshToken');
    const res = await fetch('http://147.185.221.30:24588/login/refresh',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`  
      }
    });
    const data = await res.json();
    if(!res.ok)
    {
      console.log('failed to fetch data');
    }
    cookie.set('token', data.token);
//     console.log(`new `+data.token);    
    return data;   
  }
  catch(err){
    console.log("error: " + err);    
  }
}

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
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('0');
  const [profileImage, setProfileImage] = useState('');
  const [role, setRole] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate(); // <-- 2. Initialize navigate

  function logout() {
    Promise.resolve().then(()=>{
      cookie.remove('refreshToken');
      cookie.remove('token');            
      setAuthenticated(false);                   
    }).then(()=>{
      navigate('/login');
    })
  }


  useEffect(() => {
    const token = cookie.get('refreshToken');
    if (!token) 
    {
      return logout();
    } 
    else 
    {
      setAuthenticated(true);
      newRefreshToken(token).then((data) => {
        cookie.set('token', data.token);
        getUserInfo(data.token).then((datauser) => {
          if(!datauser) return logout();
          if (datauser && datauser[0]) {
            setName(datauser[0].name);
            setPhoneNumber(datauser[0].phonenumber);
            setProfileImage(datauser[0].profilepic || '');
            setRole(datauser[0].role);
            
          }
        });
      }).catch((err) => {
        Promise.resolve().then(()=>{
          cookie.remove('refreshToken');
          cookie.remove('token');            
          setAuthenticated(false); 
                      
        }).then(()=>{
          navigate('/login');
        })
          
          
      });
    }
  },[authenticated])


  
  return (
    <tokenAPI.Provider value={{ getToken, newRefreshToken }}>
      <userInfo.Provider value={{name,phoneNumber,profileImage,role}}>      
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/login" element={<LoginPage setAuthenticated={setAuthenticated} />} />
          {authenticated ? (
            <Route
              path="/Dashboard"
              element={
                <Dashboard
                  name={name}
                  profilePic={profileImage}
                  phoneNumber={phoneNumber}
                  role={role}
                  logout={logout}
                  setAuthenticated={setAuthenticated}
                />
              }
            />
          ) : (<Route path="/Dashboard" element={<Test authenticated={authenticated} />} />)
          }
        </Routes>
      </userInfo.Provider>
    </tokenAPI.Provider>    
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