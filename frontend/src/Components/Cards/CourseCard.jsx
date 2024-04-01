import React from 'react';
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';

const BasicCard = ({ id, name, code, credits, status, action, allCourses, setAllCourses, ongoingCourses, setOngoingCourses }) => {

  const handleEnroll = () => {
    // Find the index of the course in the allCourses array
    const courseIndex = allCourses.findIndex(course => course.id === id);
    // Get the course object
    const enrolledCourse = allCourses[courseIndex];
    // Remove the enrolled course from allCourses array
    const updatedAllCourses = [...allCourses.slice(0, courseIndex), ...allCourses.slice(courseIndex + 1)];
    // Add the enrolled course to ongoingCourses array
    const updatedOngoingCourses = [...ongoingCourses, enrolledCourse];
    // Update state with the new arrays
    setAllCourses(updatedAllCourses);
    setOngoingCourses(updatedOngoingCourses);
  };

  return (
    <Card sx={{ minWidth: 275, maxWidth: 300 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {status}
        </Typography>
        <Typography variant="h5" component="div">
          {code}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Credits:{credits}
        </Typography>
        <Typography variant="body2">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleEnroll}>{action}</Button>
      </CardActions>
    </Card>
  );
};

export default BasicCard;
