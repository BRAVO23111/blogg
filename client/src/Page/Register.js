import React from 'react'

const Register = () => {
  return (
    <div class="login-container">
    <form class="login-form">
    <h2>Register</h2>
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required/>
      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required/>
      <button type="submit">Login</button>
    </form>
  </div>
  )
}

export default Register
