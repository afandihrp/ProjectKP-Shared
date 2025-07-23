import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Loginpage';
import Landingpage from './Landingpage';
import Test from './Test';
import Dashboard from './Dashboard';
import './App.css';
import cookie from 'js-cookie';
import { string } from "prop-types";

const testKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcsImVtYWlsIjoidGVzdEB0ZXN0IiwicGFzc3dvcmQiOiIkYXJnb24yaWQkdj0xOSRtPTY1NTM2LHQ9MyxwPTQkZy9NaUZjSXJTa0tYVjNBbXFOb1ZNZyRPNVpSZXA1NTlVQjBEU0VESXprT0cwcjM5K2pkemtlaGdmOHdMdG5yeEtNIiwicm9sZSI6InN0dWRlbnQiLCJpYXQiOjE3NTMwNTc3MTN9.mJA1z38gMJshpqoOMJ_75hUYn-SDjXh-bPU-UNE1yOw';

async function getUserInfo(token){
  try{
    // console.log(`token is: ${token}`);
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
    }
    console.log(data);
    return data;   
  }
  catch(err){
    console.log("error: " + err);  
    return null;  
  }
}

// async function testToken(){
//   try{
//     const token = cookie.get('token');
//     const res = await fetch('http://localhost:4000/test',{
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`  
//       }
//     });
//     const data = await res.json();
//     if(!res.ok)
//     {
//       console.log('failed to fetch data');
//     }

//     console.log(data);
//     return {value: true};
//   }
//   catch(err){
//     console.log("error: " + err);
//     return {value: false};
//   }

// }

async function newRefreshToken(token){
  try{
    const res = await fetch('http://environment-relief.gl.at.ply.gg:24588/login/refresh',{
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
    console.log(`new `+data.token);
    return data;   
  }
  catch(err){
    console.log("error: " + err);    
  }
}




function App() {
  const [name, setName] = useState('Guest');
  const [phoneNumber, setPhoneNumber] = useState('0');
  const [profileImage, setProfileImage] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  

  useEffect(() => {
    const token = cookie.get('refreshToken');
    if(!token){
      setAuthenticated(false);
      cookie.remove('token');
      cookie.remove('refreshToken');      
    }
    else{
      setAuthenticated(true);
      newRefreshToken(token).then((data) => {
        cookie.set('token', data.token);
        console.log(`new token2: ${cookie.get('token')}`);
        getUserInfo( data.token).then((datauser) => {
          console.log(datauser[0]);
          setName(datauser[0].name);     
          console.log(datauser[0].phonenumber);     
          setPhoneNumber(datauser[0].phonenumber);
          console.log(phoneNumber);
          setProfileImage(datauser[0].profilepic || '');

        });   
      });
      
    }

  }, [authenticated]);

  function logout()
  {
    cookie.remove('token');
    cookie.remove('refreshToken');
    setAuthenticated(false);   

  }

  return(
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/login" element={<LoginPage 
            setAuthenticated={setAuthenticated} 
            />}/>
            {
              authenticated?<Route path="/Dashboard" element={<Dashboard
                    name={name}
                    profilePic=''  
                    phoneNumber={phoneNumber}
                    logout={logout}
                    setAuthenticated={setAuthenticated}      
                    
                  />}/>

                  :
                  <Route path="/Dashboard" element={<Test
                  authenticated={authenticated}
                  />}/>
            }
        </Routes>
      </BrowserRouter> 
  );
  
    
}

export default App;