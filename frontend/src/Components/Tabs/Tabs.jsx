import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Card from '../Cards/CourseCard'
import Grid from '@mui/material/Grid';


export default function DisabledTabs({ allCourses, setAllCourses, ongoingCourses, setOngoingCourses }) {
  const [value, setValue] = React.useState(0);

 const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange} aria-label="disabled tabs example">
        <Tab label="All" />
        <Tab label="Ongoing" />
        <Tab label="Completed" />
      </Tabs>
      <Grid container spacing={2}>
        {value === 0 && allCourses.map((course, index) => (
          <Grid key={course.id} item xs={12} sm={6} md={3}>
            <Card
              {...course}
              allCourses={allCourses}
              setAllCourses={setAllCourses}
              ongoingCourses={ongoingCourses}
              setOngoingCourses={setOngoingCourses}
              name={course.name}
              code={course.code}
              credits={course.credits}
              status={course.status}
              action={course.action}
            />
          </Grid>
        ))}
        {value === 1 && ongoingCourses.map((course, index) => (
          <Grid key={course.id} item xs={12} sm={6} md={3}>
            <Card
              {...course}
              allCourses={allCourses}
              setAllCourses={setAllCourses}
              ongoingCourses={ongoingCourses}
              setOngoingCourses={setOngoingCourses}
              name={course.name}
              code={course.code}
              credits={course.credits}
              status={course.status}
              action={course.action}
            />
          </Grid>
        ))}
        {/* Add tabs for completed courses */}
      </Grid>
    </div>
  );
}