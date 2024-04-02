import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const style = {
  py: 0,
  width: '100%',
  maxWidth: 600,
  borderRadius: 2,
  border: '1px solid',
  borderColor: 'divider',
  backgroundColor: 'background.paper',
};
const listItemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
};

export default function DividerVariants({ studentDetail }) {
  if (!studentDetail || !studentDetail.content) {
    return null; 
  }
  const { studentFirstName, studentLastName, studentRegNo, studentAddress, studentDegreeCode, studentDOB, studentNIC, studentIntake } = studentDetail.content;

  const rows = [
    { id: 1, property: 'Name', value: `${studentFirstName} ${studentLastName}` },
    { id: 2, property: 'Student ID', value: studentRegNo },
    { id: 3, property: 'Address', value: studentAddress },
    { id: 4, property: 'Degree Code', value: studentDegreeCode },
    { id: 5, property: 'Date of Birth', value: studentDOB },
    { id: 6, property: 'NIC', value: studentNIC },
    { id: 7, property: 'Intake', value: studentIntake },
  ];
  const stringArray = rows.map(row => `${row.property}: ${row.value}`);

  return (
    <List sx={style}>
      {rows.map((row) => (
        <React.Fragment key={row.id}>
          <ListItem style={listItemStyle}>
            <ListItemText primary={row.property} secondary={row.value} />
          </ListItem>
          {row.id !== rows.length && <Divider component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
}


