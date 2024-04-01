import React, { useState } from 'react';
import Tabs from '../../Components/Tabs/Tabs'
import { Button} from '@mui/material';

export default function StudCourseUpdate() {

      const allcourses1 = [
  {
    id: 1,
    name: 'Introduction to Computer Science',
    code: 'CS101',
    credits: 3,
    status:'',
    action: 'Enroll',
  },
  {
    id: 1,
    name: 'Introduction to Computer Science',
    code: 'CS101',
    credits: 3,
    status:'',
    action: 'Enroll',
  },
  {
    id: 1,
    name: 'Introduction to Computer Science',
    code: 'CS101',
    credits: 3,
    status:'',
    action: 'Enroll',
  },
  {
    id: 1,
    name: 'Introduction to Computer Science',
    code: 'CS101',
    credits: 3,
    status:'',
    action: 'Enroll',
  },
  {
    id: 1,
    name: 'Introduction to Computer Science',
    code: 'CS101',
    credits: 3,
    status:'',
    action: 'Enroll',
  },
];

const [allCourses, setAllCourses] = useState(allcourses1);
const [ongoingCourses, setOngoingCourses] = useState([]);

const handleSubmit = async () => {
  
  try {
    console.log("All Courses: ",allCourses);
    console.log("Ongoing Courses: ",ongoingCourses);
    // const response = await fetch('http://localhost:8080/api/student/saveStudent', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(jsonObject),
    // });

    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    // const data = await response.json();
    // console.log('Success:', data);
    // // Handle success response
  } catch (error) {
    console.error('Error:', error);
    // Handle errors here
  }
};

  return (
    <div>
        <h1>Student Course Details</h1>
        <Tabs
        allCourses={allCourses}
        setAllCourses={setAllCourses}
        ongoingCourses={ongoingCourses}
        setOngoingCourses={setOngoingCourses}/>
        <div><Button variant="contained" size="small" onClick={handleSubmit}>DONE</Button></div>
    </div>
  )
}
