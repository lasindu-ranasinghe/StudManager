import React,{ useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import CostomList from '../../Components/List/List';
import { Button, Divider,Avatar,Alert} from '@mui/material';
import Table from '../../Components/Table/ProfileTable';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom'; 


export default function ProfilePage() {
  const { studRegNumber } = useParams();
  const navigate = useNavigate();

  const handleEditButton = () => {
    navigate(`/StudUpdate/${studRegNumber}`);
  };
  const handleAllCoursesButton = () => {
    navigate(`/courses/${studRegNumber}`);
  };

const handleDeleteButton = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/student/deleteStudent/${studRegNumber}`);
      alert('Student deleted successfully');
      navigate('/');
    } catch (error) {
      console.error('Failed to delete student:', error);
      alert('Failed to delete student');
    }
  };

  
    //Methord for calling GetStudentDetails endpoint
  const [students, setStudents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/student/searchStudent/${studRegNumber}`);
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(); 
  }, []);

    if (!students || !students.content) {
    return null; 
  }
  const { studentFirstName, studentLastName, studentRegNo} = students.content;
  const userName = `${studentFirstName} ${studentLastName}`;
  const userStudentId= `${studentRegNo}`;

  return (
    <div>
    
    <Grid container marginTop={'50px'}>
      <Grid item xs={6} >
         <Grid container alignItems="center" marginTop={'20px'}>
              <Grid item xs={2}>
                <Avatar
                  alt="Remy Sharp"
                  src="/Images/Lasindu Ranasinghe.jpg"
                  sx={{ width: 56, height: 56 }}
                />
              </Grid>
              <Grid item xs={10}>
                <Grid container direction="column" spacing={2}>
                  <div>
                    <span style={{ color: '#0059B3', fontSize: '16px', marginBottom: '0px' }}>{userName}</span><br/>
                    <span style={{ color: 'rgba(0, 0, 0, 0.7)', fontSize: '14px', marginBottom: '0px' }}>{userStudentId}</span>
                    <Divider width={'90%'}/>
                  </div>
                </Grid>
              </Grid>
          </Grid>
          <div style={{marginTop: '20px',alignContent:'center'}}><Table studentDetail={students}/></div>
          <div style={{ marginTop: '20px' }}>
            <Button variant="contained" size="small" style={{ margin: '20px', backgroundColor: '#EF6C00', color: '#FFF' }} onClick={handleEditButton}>EDIT</Button>
            <Button variant="contained" size="small" style={{ margin: '20px', backgroundColor: '#D32F2F', color: '#FFF' }} onClick={handleDeleteButton}>DELETE</Button>
          </div>


      </Grid>

      {/* Right side grid */}
      <Grid item xs={6} style={{ backgroundColor: 'rgba( 33, 150, 243, 0.08)', height: '100vh'}} marginRight={'0px'}>
        <CostomList items={['Item 1', 'Item 2', 'Item 3']} />
        <Button variant="contained" size="small" onClick={handleAllCoursesButton}>see all enrolled courses</Button>
      </Grid>
    </Grid>
    </div>
  );
}
