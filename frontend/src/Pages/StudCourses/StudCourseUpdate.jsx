import React, { useState,useEffect } from 'react';
import Tabs from '../../Components/Tabs/Tabs'
import { Button} from '@mui/material';
import {getAllCourses,getOngoingCourses,getStudent,UpdateStudent} from '../../APIs/StudentAPIs';
import { useParams,useNavigate } from 'react-router-dom'; 

export default function StudCourseUpdate() {
    const { studRegNumber } = useParams();
    useEffect(() => {
  const fetchStudents = async () => {
    try {
      const responseAllCourseObjectArray = await getAllCourses('bse');
      const responseOngoingCourseObjectArray = await getOngoingCourses(studRegNumber);
      const StuentDetailsObject = await getStudent(studRegNumber);
      console.log("all courses",responseAllCourseObjectArray);
      console.log("all ongoing courses",responseOngoingCourseObjectArray);

          const AllCourseNameArray = responseAllCourseObjectArray.map(item => ({
            id: item.courseId,
            name: item.courseName,
            code: item.courseCode,
            credits: item.courseCredits,
            status:'',
            action: 'Enroll',
            }));
            const OngoingNameArray = responseOngoingCourseObjectArray.map(item => ({
            id: item.courseId,
            name: item.courseName,
            code: item.courseCode,
            credits: item.courseCredits,
            status:'',
            action: 'Complete',
            }));

          setOngoingCourses(OngoingNameArray);
          setAllCourses(AllCourseNameArray);
          setStudent(StuentDetailsObject);

    } catch (error) {
      console.error('Failed to fetch students:', error);
    }
  };

  fetchStudents();
}, []);

const [allCourses, setAllCourses] = useState([]);
const [ongoingCourses, setOngoingCourses] = useState([]);
const [StuentDetails, setStudent] = useState();

const handleSubmit = async () => {
  
  try {
    console.log("All Courses: ",allCourses);
    console.log("Ongoing Courses: ",ongoingCourses);
    const ongoingcourseCodes = ongoingCourses.map(obj => obj.code);
    StuentDetails.ongoingCourses = ongoingcourseCodes;
    const reposponse = await UpdateStudent(studRegNumber);
    alert(reposponse);
    
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
