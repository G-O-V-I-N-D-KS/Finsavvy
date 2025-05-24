// Login.js

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import '../styles/style.css'; // Import your CSS files
import axios from 'axios'; // Import axios for making HTTP requests
import '../styles/style.css'; // Import your CSS files
import { useNavigate  } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to the backend API
      const response = await axios.post('http://localhost:3000/auth/login', {
        username,
        password,
      });

      // Extract token and id from the response data
      const { token, id } = response.data;

      // Store token and id in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', id);


      // Redirect to dashboard route after successful login
      navigateTo('/App');
    } catch (error) {
      console.error('Login failed!', error.message);
      // Handle login error (e.g., display error message)
    }
  };

    return (
        <div className="rrr">
            <div className="box">
                <form className="Login_form" onSubmit={handleLogin}>
                    <h1 className="Login_h1">Sign in</h1>
                    <div className="inputbox">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <span>Username</span>
                    <p className="Login_p"></p>
                    </div>
                    <div className="inputbox">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <p className="Login_p"></p>
                    <span>Password</span>
                    </div>
                    <div className="links">
                        <a href="#">Forgot password</a>
                    </div>
                    <Link to="App"><input type="submit" value="Log in" /></Link>
                    <div className="acc">
                        <p>Don't have an account yet?&nbsp;&nbsp;</p>
                        <Link to="SignUpPage">Sign up</Link>
                    </div>
                </form>
            </div>
            <div className="ph">
                <img src="src\assets\stock.png" width="400" height="400" alt="stock" />
            </div>
            <div className="caption">
                <p>Keep your day-to-day transactions with Finsavvy</p>
            </div>
        </div>
    );
}

export default Login;
