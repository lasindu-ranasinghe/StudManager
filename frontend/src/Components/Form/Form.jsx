import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

export default function FormPropsTextFields() {
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
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          id="courseTF"
          select
          label="Courses"
          defaultValue="EUR"
          helperText="Please select your currency"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          required
          id="dobTF"
          label="Date of Birth (DD/MM/YY)"
        />
        
      </div>
    </Box>
  );
}