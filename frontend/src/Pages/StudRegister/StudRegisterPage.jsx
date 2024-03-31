import React from 'react'
import Form from "../../Components/Form/Form";
import { Button } from '@mui/material';

export default function StudRegisterPage() {
  return (
    <div>
      <h1>Register a Student</h1>
      <Form/>
      <Button variant="contained" size="small">SAVE</Button>
    </div>
  )
}
