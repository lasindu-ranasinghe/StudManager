import React,{ useState, useEffect } from 'react'
import Form from "../../Components/Form/UpdateForm";
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function StudUpdatePage() {

  const { studRegNumber } = useParams();

    //Methord for calling GetStudentDetails endpoint
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/student/searchStudent/${studRegNumber}`);
        setStudents(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(); 
  }, []);

    if (!students || !students.content) {
    return null; 
  }
  const { studentFirstName, studentLastName, studentAddress, studentDegreeCode, studentDOB, studentNIC, studentIntake,ongoingCourses,studentRegNo } = students.content;

    const jsonObject = {
    studentRegNo:studentRegNo,
    studentFirstName: studentFirstName,
    studentLastName: studentLastName,
    studentAddress: studentAddress,
    studentDegreeCode: [studentDegreeCode],
    studentDOB: studentDOB,
    studentNIC: studentNIC,
    studentIntake: studentIntake,
    ongoingCourses: ongoingCourses,
  };
  console.log("This is the Object :",jsonObject);

  return (
    <div>
      <div style={{ marginTop: '50px' }}><h1>Update Student’s Details</h1></div>
      <Form defaultValues={jsonObject}/>
    </div>
  )
}
