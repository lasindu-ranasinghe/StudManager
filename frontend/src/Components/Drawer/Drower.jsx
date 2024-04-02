import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link as RouterLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  return (
    <div>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        />
        <Drawer
           sx={{
        width: drawerWidth,
        flexShrink: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.17)', 
        '& .MuiDrawer-paper': {
        width: drawerWidth,
        boxSizing: 'border-box',
        backgroundColor: 'rgba(0, 0, 0, 0.17)',
        },
        }}
        variant="permanent"
        anchor="left"
        >
          <Toolbar />
          <Box
            height={30}
            width={200}
            my={4}
            display="flex"
            alignItems="center"
            gap={4}
            p={2}
            sx={{ border: 'Background' }}
          >
            KDU
          </Box>
          <List>
            {[
              { text: 'Home', icon: <HomeIcon />, route: '/' },
              { text: 'Courses', icon: <SchoolIcon />, route: '/courses' },
              { text: 'Logs', icon: <TimelapseIcon />, route: '/logs' },
              { text: 'Logout', icon: <ExitToAppIcon />, route: '/logout' },
            ].map(({ text, icon, route }, index) => (
              <ListItem key={text} disablePadding component={RouterLink} to={route}>
                <ListItemButton>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText primary={text} primaryTypographyProps={{ style: { color: 'rgba(0, 0, 0, 0.8)' } }} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </div>
  );
}