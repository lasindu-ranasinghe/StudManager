import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Select, InputLabel, Button } from '@mui/material';

const YourComponent = ({ defaultValues }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [nic, setNic] = useState('');
  const [intake, setIntake] = useState('');
  const [dob, setDob] = useState('');
  const [degree, setDegree] = useState('');
  const [selectedCourses, setSelectedCourses] = useState([]);

  useEffect(() => {
    if (defaultValues) {
      setFirstName(defaultValues.studentFirstName || '');
      setLastName(defaultValues.studentLastName || '');
      setAddress(defaultValues.studentAddress || '');
      setNic(defaultValues.studentNIC || '');
      setIntake(defaultValues.studentIntake || '');
      setDob(defaultValues.studentDOB || '');
      setDegree(defaultValues.studentDegreeCode?.[0] || '');
      setSelectedCourses(defaultValues.ongoingCourses || []);
    }
  }, [defaultValues]);

  const courses = [
    { value: 'CS101', label: 'Introduction to Computer Science' },
    { value: 'MATH101', label: 'Calculus I' },
    { value: 'ENG101', label: 'English Composition' },
    { value: 'ECON101', label: 'Principles of Economics' },
  ];

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
    if (defaultValues) {
      const jsonObject = {
        studentRegNo: defaultValues.studentRegNo,
        studentFirstName: firstName,
        studentLastName: lastName,
        studentAddress: address,
        studentDegreeCode: degree, // Ensure it's an array
        studentDOB: dob,
        studentNIC: nic,
        studentIntake: intake,
        ongoingCourses: selectedCourses,
      };

      try {
        console.log(jsonObject);
        const response = await fetch('http://localhost:8080/api/student/updateStudent', {
          method: 'PUT',
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
    }
  };

  return (
    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, width: '25ch' } }} noValidate autoComplete="off">
      <div>
        <TextField required id="firstNameTF" label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <TextField required id="lastNameTF" label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        <TextField required id="addressTF" label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <TextField required id="nicTF" label="NIC Number" value={nic} onChange={(e) => setNic(e.target.value)} />
        <TextField required id="intakeTF" label="Intake" type="number" value={intake} onChange={(e) => setIntake(e.target.value)} InputLabelProps={{ shrink: true }} />
        <TextField select label="Degree" value={degree} onChange={(e) => setDegree(e.target.value)} helperText="Please select your degree">
          {degrees.map((option) => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))}
        </TextField>
        <InputLabel id="courses-label">Courses</InputLabel>
        <Select labelId="courses-label" id="courses-select" multiple value={selectedCourses} onChange={handleCourseChange} label="Courses">
          {courses.map((option) => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
        <TextField required id="dobTF" label="Date of Birth (DD/MM/YY)" value={dob} onChange={(e) => setDob(e.target.value)} />
        <div><Button variant="contained" onClick={handleSubmit}>Send</Button></div>
      </div>
    </Box>
  );
};

export default YourComponent;
