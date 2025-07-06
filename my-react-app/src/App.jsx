import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './Loginpage';
import Landingpage from './Landingpage';
import Test from './Test';
import Dashboard from './Dashboard';

function App() {
    // const urlParams = new URLSearchParams(window.location.search);
    // let test = urlParams.get('id');
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/Test" element={<Test/>}/>
            <Route path="/Dashboard" element={<Dashboard/>}/>
        </Routes>
        </BrowserRouter> 
    );
  
    
}

export default App;