import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createRow(property, value) {
  return { property, value };
}

export default function BasicTable({ studentDetail }) {
  if (!studentDetail || !studentDetail.content) {
    return null;
  }

  const { studentFirstName, studentLastName, studentRegNo, studentAddress, studentDegreeCode, studentDOB, studentNIC, studentIntake } = studentDetail.content;

  const rows = [
    createRow('Name', `${studentFirstName} ${studentLastName}`),
    createRow('Student ID', studentRegNo),
    createRow('Address', studentAddress),
    createRow('Degree Code', studentDegreeCode),
    createRow('Date of Birth', studentDOB),
    createRow('NIC', studentNIC),
    createRow('Intake', studentIntake),
  ];

  return (
    
      <Table sx={{ maxWidth: 550 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontSize: '14px',fontWeight:'bold'}}>Student Details</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.property}
              </TableCell>
              <TableCell align="left">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    
  );
}
