import React, { useState } from 'react'

const Register = () => {
  const [username,setusername] =useState('')
  const [password,setpassword] =useState('')
  async function register(e){
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/register", {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200) {
        alert('Registration successful');
      } else {
        alert('Registration failed');
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert('An error occurred during registration');
    }
  }
  return (
    <div class="login-container">
    <form class="login-form" onSubmit={register}>
    <h2>Register</h2>
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required value={username} onChange={(e)=>setusername(e.target.value)}/>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required value={password} onChange={(e)=>setpassword(e.target.value)}/>
      <button type="submit">Login</button>
    </form>
  </div>
  )
}


export default Register


//7MqtGudi8a3zv5Ar
//mongodb+srv://blog:7MqtGudi8a3zv5Ar@cluster0.1ksvgrb.mongodb.net/?retryWrites=true&w=majority