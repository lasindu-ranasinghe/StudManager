import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Select, InputLabel, Button } from '@mui/material';
import { getAllCourses } from '../../APIs/StudentAPIs'; 


const YourComponent = () => {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [courses, setCourses] = useState([
    { value: 'CS101', label: 'Introduction to Computer Science' },
    { value: 'MATH101', label: 'Calculus I' },
    { value: 'ENG101', label: 'English Composition' },
    { value: 'ECON101', label: 'Principles of Economics' },
  ]); // State to hold courses
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [nic, setNic] = useState('');
  const [intake, setIntake] = useState('39');
  const [degree, setDegree] = useState('');
  const [dob, setDob] = useState('');

  // Update the courses state when a degree is selected
  const handleDegreeChange = async (event) => {
    const selectedDegree = event.target.value;
    setDegree(selectedDegree);

    try {
      const coursesForDegree = await getAllCourses(selectedDegree);
      const formattedCourses = coursesForDegree.map((course) => ({
        value: course.courseCode,
        label: course.courseName, 
      }));
      setCourses(formattedCourses);
    } catch (error) {
      console.error('Failed to fetch courses for the selected degree:', error);
    }
  };

  const degrees = [
    { value: 'bse', label: 'Software Engineering' },
    { value: 'bce', label: 'Computer Engineering' },
    { value: 'bcs', label: 'Computer Science' },
    { value: 'itis', label: 'Information Systems' },
  ];

  const handleCourseChange = (event) => {
    setSelectedCourses(event.target.value);
  };

const handleSubmit = async () => {
  // Required json object for API call
  const jsonObject = {
    studentFirstName: firstName,
    studentLastName: lastName,
    studentAddress: address,
    studentDegreeCode: degree,
    studentDOB: dob,
    studentNIC: nic,
    studentIntake: intake,
    ongoingCourses: selectedCourses,
  };

  try {
    const response = await fetch('http://localhost:8080/api/student/saveStudent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonObject),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Success:', data);
    // Handle success response
  } catch (error) {
    console.error('Error:', error);
    // Handle errors here
  }
};


  return (
   <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '65ch' }, }} noValidate autoComplete="off">
  <div>
    <div>
      <TextField required id="firstNameTF" label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} fullWidth />
      <TextField required id="lastNameTF" label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} fullWidth />
    </div>
    <div>
      <TextField required id="addressTF" label="Address" value={address} onChange={(e) => setAddress(e.target.value)} fullWidth />
      <TextField required id="nicTF" label="NIC Number" value={nic} onChange={(e) => setNic(e.target.value)} fullWidth />
    </div>
    <div>
      <TextField required id="intakeTF" label="Intake" type="number" value={intake} onChange={(e) => setIntake(e.target.value)} InputLabelProps={{ shrink: true, }} width='65ch' />
      <TextField select label="Degree" value={degree} onChange={handleDegreeChange} helperText="Please select your degree" fullWidth>
        {degrees.map((option) => (
          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        ))}
      </TextField>
    </div>
    <div>
      <InputLabel id="courses-label">Courses</InputLabel>
      <Select labelId="courses-label" id="courses-select" multiple value={selectedCourses} onChange={handleCourseChange} label="  Courses" sx={{ width: '65ch', marginLeft:'10px', marginTop:'10px' }}>
        {courses.map((option) => (
          <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
        ))}
      </Select>
      <TextField required id="dobTF" label="Date of Birth (DD/MM/YY)" value={dob} onChange={(e) => setDob(e.target.value)}  sx={{ width: '65ch', marginLeft:'10px'}}/>
    </div>
    <div style={{ marginTop: '20px' , marginLeft:'10px'}}>
      <Button variant="contained" onClick={handleSubmit} >Send</Button>
    </div>
  </div>
</Box>

  );
};

export default YourComponent;
