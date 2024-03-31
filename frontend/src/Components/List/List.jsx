import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const CostomList = ({ items }) => {
  return (
    <List component="nav">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ListItem button>
            <ListItemText primary={item} />
          </ListItem>
          {index !== items.length - 1 && <Divider />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default CostomList;
