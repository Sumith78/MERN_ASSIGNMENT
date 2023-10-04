import React from 'react';

const Logout = () => {
  const handleLogout = () => {
    // Clear token from localStorage
    localStorage.removeItem('token');
    console.log('User logged out successfully!');
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
