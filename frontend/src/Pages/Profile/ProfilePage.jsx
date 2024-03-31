import React,{ useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import CostomList from '../../Components/List/List';
import { Button} from '@mui/material';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import Table from '../../Components/Table/ProfilePageTable';
import axios from 'axios';
import { useParams } from 'react-router-dom'; 

export default function ProfilePage() {
  const { studRegNumber } = useParams();
  
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
    <Grid container>
      <Grid item xs={6} >
         <Grid container alignItems="center">
              <Grid item xs={2}>
                <SupervisedUserCircleIcon/>
              </Grid>
              <Grid item xs={10}>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <span>{userName}</span>
                  </Grid>
                  <Grid item>
                    <span>{userStudentId}</span>
                  </Grid>
                </Grid>
              </Grid>
          </Grid>

          <Table studentDetail={students} />
          <div className="buttons">
            <Button variant="contained" size="small">EDIT</Button>
            <Button variant="contained" size="small">DELETE</Button>
          </div>

      </Grid>

      {/* Right side grid */}
      <Grid item xs={6} style={{ backgroundColor: 'rgba( 33, 150, 243, 0.08)', height: '100vh' ,margin: '0'}}>
        <CostomList items={['Item 1', 'Item 2', 'Item 3']} />
        <Button variant="contained" size="small">see all enrolled courses</Button>
      </Grid>
    </Grid>
  );
}
