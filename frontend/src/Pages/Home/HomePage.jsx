import React from 'react';
// import { useNavigate } from 'react-router-dom';
import Table from "../../Components/Table/Table";
import { TextField,Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import "./Home.css"


function HomePage() {
  // const Navigate = useNavigate();

  // const handleNavigate = () => {
  //   Navigate('/profile');
  // };

  return (
    <div>
      <h1>Student Management System</h1>
      <div className='textfield-and-button-container'>
        <div className="textfiels">
          <TextField
          id="outlined-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
        />
        <TextField
          id="outlined-helperText"
          label="Helper text"
          defaultValue="Default Value"
          helperText="Some important text"
        />
        </div>
        <div className="buttons">
          <Button variant="contained" size="small">
          NEW
        </Button>
        <SettingsIcon/>
        </div>
      </div>
      <Table/>
      {/* <Link to="/profile">Go to Profile Page</Link><br/>
      <button onClick={handleNavigate}>ProfilePage</button> */}
    </div>
  );
}

export default HomePage;
