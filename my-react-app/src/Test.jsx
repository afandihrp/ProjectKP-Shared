// import React, { useContext } from 'react';
// import { tokenAPI } from './App.jsx';


function Test(props){
    // const {getToken,newRefreshToken} = useContext(tokenAPI);

    // newRefreshToken().then(async ()=>{

    //             const res = await fetch('http://147.185.221.30:24588/<url api nya sini>', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     'Authorization': `Bearer ${getToken().token}`  // Use the token from context
    //                 },
    //                 body: JSON.stringify({
    //                     code: code
    //                 })
    //             });
    //             const response = await res.text();
    //             if (!res.ok) {
    //                 const errorText = await res.text();
    //                 setOutput(`Error from server: ${res.status}\n${response}`);
    //                 return;
    //             }
    //             console.log(response);
    // })


    let test = props.authenticated?'yes':'no';
    return(
        <>
            <h1>Ooops {test},.. you are not supposed to be here, try to <a href="/Login">Log In</a>😊 </h1>
        </>
    );
}

export default Test;
//test