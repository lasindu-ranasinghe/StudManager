import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';

export default function DataTable({ studentDetails }) {

    const Navigate = useNavigate();
    const handleNavigate = (studentRegNo) => {
    Navigate(`/profile/${studentRegNo}`);
    };
    
  // Mapping studentDetails to rows format
const rows = studentDetails.content?.map((student, index) => ({
  id: student.studentRegNo,
  name: `${student.studentFirstName} ${student.studentLastName}`,
  studentid: student.studentRegNo,
  degree: student.studentDegreeCode,
})) || [];


  // Event handler for row click
  const handleRowClick = (params) => {
  const studentRegNo = params.row.id;
  handleNavigate(studentRegNo);
  };

  const columns = [
    {
      field: 'id',
      headerName: '',
      width: 40,
      renderCell: (params) => <Avatar>L</Avatar>,
    },
    { field: 'name', headerName: (<div style={{ fontWeight: 'bold' }}>Name</div>), width: 400},
    { field: 'studentid', headerName: (<div style={{ fontWeight: 'bold' }}>Student ID</div>), width: 400 },
    { field: 'degree', headerName: (<div style={{ fontWeight: 'bold' }}>Degree</div>) , width: 400 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        onRowClick={handleRowClick} 
      />
    </div>
  );
}
