import React from 'react'
import {useState} from'react'
import { Navigate } from 'react-router-dom';
const Login = () => {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [redirect,setRedirect] =useState(false);
  async function login(e){
    e.preventDefault();
    const response = await fetch("http://localhost:4000/login",{
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials:'include',
    })
    if(response.ok){
      setRedirect(true)
    }
    else{
      alert('wrong credentials')
    }
  }
    if(redirect){
      return<Navigate to={'/'}/>
    }

  return (
    <div class="login-container" onSubmit={login}>
    <form class="login-form">
    <h2>Login</h2>
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required value={username} onChange={e=>setUsername(e.target.value)} />
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required value={password} onChange={e=>setPassword(e.target.value)}/>
      <button type="submit">Login</button>
    </form>
  </div>
  )
}

export default Login
