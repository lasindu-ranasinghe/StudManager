import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Select, InputLabel, FormControl } from '@mui/material';

const YourComponent = () => {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleChange = (event) => {
    setSelectedValues(event.target.value);
  };

  const degrees = [
    {
      value: 'bse',
      label: 'Software Enginnering',
    },
    {
      value: 'bce',
      label: 'Computer Engineering',
    },
    {
      value: 'bcs',
      label: 'Computer Science',
    },
    {
      value: 'itis',
      label: 'Information Systems',
    },
  ];
  const courses = [
    {
      value: 'CS101',
      label: 'Introduction to Computer Science',
    },
    {
      value: 'MATH101',
      label: 'Calculus I, Course Code',
    },
    {
      value: 'ENG101',
      label: ' English Composition, Course Code',
    },
    {
      value: ' ECON101',
      label: 'Principles of Economics, Course Code',
    },
  ];

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          required
          id="firstNameTF"
          label="First Name"
          defaultValue=""
        />
        <TextField
          required
          id="lastNameTF"
          label="Last Name"
          defaultValue=""
        />
        
        <TextField
          required
          id="addressTF"
          label="Address"
        />
        <TextField
          required
          id="nicTF"
          label="NIC Number"
        />
        <TextField
          required
          id="intakeTF"
          label="Intake"
          type="number"
          defaultValue={39}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          id="degreeTF"
          select
          label="Degree"
          defaultValue="EUR"
          helperText="Please select your currency"
        >
          {degrees.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <InputLabel id="courses-label">Courses</InputLabel>
        <Select
          labelId="courses-label"
          id="courses-select"
          multiple
          value={selectedValues}
          onChange={handleChange}
          label="Courses"
        >
          {courses.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        
        <TextField
          required
          id="dobTF"
          label="Date of Birth (DD/MM/YY)"
        />
        
      </div>
    </Box>
  );
};

export default YourComponent;
