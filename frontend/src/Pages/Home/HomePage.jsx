import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from "../../Components/Table/HomeTable";
import { TextField,Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import {getAllStudents} from '../../APIs/StudentAPIs';
import "./Home.css"

function HomePage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleNavigate = () => {
    navigate('/StudRegister');
  };


useEffect(() => {
  const fetchStudents = async () => {
    try {
      const response = await getAllStudents();
      setStudents(response);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  fetchStudents();
}, []);


  console.log(students.content);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      navigate(`/profile/${searchValue}`)
    }
  };

  return (
    <div>
      <div className="header"><h1>Student Management System</h1></div>

      <div className='textfield-and-button-container'>
        <div className="textfiels">
          <TextField
            id="search-student"
            label="Student Reg. number"
            type="search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleSearch}
          />
          <TextField id="search-degree" label="Degree" type="search" />
        </div>
        <div className="buttons">
          <Button variant="contained" size="small" onClick={handleNavigate}>
            NEW
          </Button>
          <div className="iconbackground"><SettingsIcon/></div>
        </div>
      </div>
      <Table studentDetails={students} />
    </div>
  );
}

export default HomePage;
