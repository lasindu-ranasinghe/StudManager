import React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const CostomList = ({ items, backgroundColor, margin }) => {
  return (
    <List style={{ backgroundColor, margin }}>
      {items.map((item, index) => (
        <ListItem key={index}>
          <ListItemText primary={item} />
        </ListItem>
      ))}
    </List>
  );
};

CostomList.propTypes = {
  items: PropTypes.array.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  margin: PropTypes.string
};

export default CostomList;
