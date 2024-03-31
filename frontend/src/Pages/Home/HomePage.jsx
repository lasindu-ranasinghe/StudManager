import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from "../../Components/Table/Table";
import { TextField,Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from 'axios'; 
import "./Home.css"


function HomePage() {

  const Navigate = useNavigate();
  const [students, setStudents] = useState([]);

  //Navigate between pages after pressing "NEW" button
  const handleNavigate = () => {
    Navigate('/StudRegister');
  };
  //Methord for calling GetAllStudents endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/student/getAllStudents");
        setStudents(response.data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); 
  }, []);
  
  return (
    <div>
      <h1>Student Management System</h1>
      <div className='textfield-and-button-container'>
        <div className="textfiels">
          {/* <TextField
            id="search-student"
            label="Student Reg. number"
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch} // Call handleSearch function on Enter key press
        /> */}
          <TextField id="search-degree" label="Degree" type="search" />
        </div>
        <div className="buttons">
          <Button variant="contained" size="small" onClick={handleNavigate}>
          NEW
        </Button>
        <SettingsIcon/>
        </div>
      </div>
      <Table studentDetails={students} />
    </div>
  );
}

export default HomePage;
