import React from 'react'
import Form from "../../Components/Form/Form";
import { Button } from '@mui/material';

export default function StudUpdatePage() {
  return (
    <div>
      <h1>Update Student’s Details</h1>
      <Form/>
      <Button variant="contained" size="small">UPDATE</Button>
    </div>
  )
}
