import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch('http://localhost:4000/profile', {
          credentials: 'include',
        });

        if (response.ok) {
          const userInfo = await response.json(); // Corrected this line
          setUsername(userInfo.username);
        }
      } catch (error) {
        // Handle any errors that occur during the fetch
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);
  function logout(){
    fetch("http://localhost:4000/logout",{
      credentials:'include',
      method:'POST',
    })
    setUsername(null);
  }
  return (
    <header>
      <Link to="/">My Blog</Link>
      <nav>
        {username ? (
          <>
          <Link to="/create">
          Create Post
         </Link>
         <a onClick={logout}>Logout</a>
          </>
         
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
