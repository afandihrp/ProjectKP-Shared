import React from 'react';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Loginpage';
import Landingpage from './Landingpage';
import Test from './Test';
import Dashboard from './Dashboard';
import './App.css';
import cookie from 'js-cookie';


function App() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  // const [token, setToken] = useState('');

  function setToken(token){
    cookie.set('token',token,{
      expires: 1, // Expires in 1 day
      secure: false, // Ensures the cookie is sent over HTTPS
      httpOnly: false, // This is automatically handled by the browser, cannot be set via JavaScript
    })
  }
  function setRefreshToken(refreshToken){
    cookie.set('refreshToken', refreshToken, {
      expires: 1, // Expires in 1 day
      secure: false, // Ensures the cookie is sent over HTTPS
      httpOnly: false, // This is automatically handled by the browser, cannot be set via
    });
  }

  async function getToken(){
    const token = await cookie.get('token');
    const refreshToken = await cookie.get('refreshToken');
    alert(`token is: ${token} and refresh token is: ${refreshToken}`);
  }

  function handleSetToken(tokens){
    setToken(tokens.token);
    setRefreshToken(tokens.refreshToken);
    getToken();
  }

  useEffect(() => {
    const token = cookie.get('token');
    if(token)
    {
      setToken(token);
    }    
  }, []);

  async function getUserrInfo()
  {
    const res = await fetch('http://localhost:4000/login/auth',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({
        token
      })

    });
  }



  function logout()
  {
      alert('logout');
  }

  return(
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/login" element={<LoginPage 
            handleSetToken={handleSetToken}
            />}/>
            {
              (authenticated&&(
                 <Route path="/Dashboard" element={<Dashboard
                    name='agatha'
                    profilePic=''  
                    phoneNumber='08123456789'
                    logout={logout}      
                    
                  />}/>
              ))
            }
           
            
        </Routes>
      </BrowserRouter> 
  );
  
    
}

export default App;