import React from 'react';
import { Link, useNavigate } from 'react-router-dom';



function HomePage() {
  const Navigate = useNavigate();

  const handleNavigate = () => {
    Navigate('/profile');
  };

  return (
    <div>
      <h1>Student Management System</h1>
      <Link to="/profile">Go to Profile Page</Link><br/>
      <button onClick={handleNavigate}>ProfilePage</button>
    </div>
  );
}

export default HomePage;
