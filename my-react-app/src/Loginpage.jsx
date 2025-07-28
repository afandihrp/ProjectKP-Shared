import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import cookie from 'js-cookie';
import { useEffect } from 'react';




// --- CSS Styles Component for Login Page ---
const Styles = () => (
  <style>{`
    :root {
      --blue-50: #EFF6FF;
      --blue-500: #3B82F6;
      --blue-600: #2563EB;
      --blue-700: #1D4ED8;
      --gray-300: #D1D5DB;
      --gray-500: #6B7280;
      --gray-600: #4B5563;
      --gray-900: #111827;
      --white: #FFFFFF;
    }

    .login-body {
      margin: 0;
      font-family: 'Inter', sans-serif;
      background-color: var(--blue-50);
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }

    .login-card {
      width: 100%;
      max-width: 28rem; /* 448px */
      padding: 2rem;
      background-color: var(--white);
      border-radius: 1rem; /* 16px */
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      margin: 1rem;
    }

    .login-header {
      text-align: center;
    }

    .login-logo {
      font-size: 1.875rem; /* 30px */
      font-weight: 700;
      color: var(--blue-600);
      text-decoration: none;
    }

    .login-title {
      margin-top: 1rem;
      font-size: 1.5rem; /* 24px */
      font-weight: 700;
      color: var(--gray-900);
    }

    .login-subtitle {
      margin-top: 0.5rem;
      font-size: 0.875rem; /* 14px */
      color: var(--gray-600);
    }

    .login-form {
      margin-top: 2rem;
    }
    
    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-input {
      appearance: none;
      width: 100%;
      padding: 0.75rem 1rem;
      border: 1px solid var(--gray-300);
      border-radius: 0.375rem; /* 6px */
      box-sizing: border-box; /* Important for padding and border */
      color: var(--gray-900);
      background-color: var(--white);
      transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    }
    
    .form-input::placeholder {
        color: var(--gray-500);
    }

    .form-input:focus {
      outline: none;
      border-color: var(--blue-500);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
    }

    .form-options {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1.5rem;
    }

    .remember-me {
      display: flex;
      align-items: center;
    }

    .remember-me input {
      height: 1rem;
      width: 1rem;
      border-radius: 0.25rem;
      border-color: var(--gray-300);
      color: var(--blue-600);
    }
    
    .remember-me input:focus {
        ring-color: var(--blue-500);
    }

    .remember-me label {
      margin-left: 0.5rem;
      font-size: 0.875rem;
      color: var(--gray-900);
    }

    .forgot-password-link {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--blue-600);
      text-decoration: none;
    }
    
    .forgot-password-link:hover {
        color: var(--blue-500);
    }

    .submit-button {
      width: 100%;
      display: flex;
      justify-content: center;
      padding: 0.75rem 1rem;
      border: 1px solid transparent;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--white);
      background-color: var(--blue-600);
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .submit-button:hover {
        background-color: var(--blue-700);
    }
    
    .submit-button:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
    }
  `}</style>
);

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

function handleSetToken(tokens){
  setToken(tokens.token);
  setRefreshToken(tokens.refreshToken);
}


// --- Login Page Component ---
export default function LoginPage(props) {
  //props.handleSetToken(token)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const navigate = useNavigate();
  
  const handleSignin =  async (e) =>
  {
    e.preventDefault();
    
    try
    {    
      const res = await fetch('http://environment-relief.gl.at.ply.gg:24588/login/auth',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password
        })

      });

      if(!res.ok)
      {
        const feedback = await res.json();
        console.log(feedback.status);
        setErrorMessage("Please insert valid credentials");

        return;
      }
      const response = await res.json();      
      console.log(response);
      // console.log(response.token);
      // console.log(response.refreshToken);
      setToken(response.token);
      setRefreshToken(response.refreshToken);
      props.setAuthenticated(true);
  
      navigate('/Dashboard');
    }
    catch(err)
    {
      console.log("failed to login "+ err.message);
      setErrorMessage("server did not respond");
    }
    

   
  }
  
  return (
    <div className="login-body">
      <Styles />
      <div className="login-card">
        <div className="login-header">
          <a href="#" className="login-logo">
            <img src="src/assets/procodecg-new-logo.png" width="200px"/>
          </a>
          <h2 className="login-title">Welcome back!</h2>
          <p className="login-subtitle">Please sign in to your account.</p>
        </div>

        <form className="login-form" onSubmit={handleSignin}>
          <div className="form-group">
            <label htmlFor="email-address" style={{ display: 'none' }}>Email address</label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="form-input"
              placeholder="Email address"
              value = {email}
              onChange={(e) => setEmail(e.target.value)}

            />
          </div>
          <div className="form-group">
            <label htmlFor="password" style={{ display: 'none' }}>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="form-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-options">
            <div className="remember-me">
              <input id="remember-me" name="remember-me" type="checkbox" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <div>
              <a href="#" className="forgot-password-link">
                Forgot your password?
              </a>
            </div>
          </div>
          <div>
            <button method="signin" type="submit" className="submit-button">Sign in</button>
          </div>
        </form>
        {/* <button
          onClick={() => {
            const token = cookie.get('token');
            console.log(`token is: ${token}`);
          }}
        >
          testGetToken
        </button> */}
        <div>
           <p style={{ color: 'red', fontWeight: 'bold', textAlign: 'left', marginBottom: '0px', fontSize:'0.8em'}}>{errorMessage}</p>
        </div>
      </div>
    </div>
  );
}
