import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from "../../Components/Table/Table";
import { TextField,Button } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from 'axios'; 
import "./Home.css"

function HomePage() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleNavigate = () => {
    navigate('/StudRegister');
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/student/getAllStudents");
      setStudents(response.data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  console.log(students.content);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      // Logic to filter students based on searchValue
      const filteredStudents = students.content.filter(student => {
        return student.studentRegNo.toLowerCase().includes(searchValue.toLowerCase());
      });
      setStudents(filteredStudents);
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
