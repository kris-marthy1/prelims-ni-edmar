'use client'
import * as React from 'react';
import {Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText   } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
const drawerWidth = 240;
import { useRouter } from 'next/navigation';

const SideBar = () => {
    const router = useRouter()
    return ( <>
   
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
       
      </AppBar>
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Prelims Project
          </Typography>
        </Toolbar>
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <Divider />
        <List>
          <ListItem  disablePadding onClick={()=>{
            router.push(`/`)
          }}>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
              <ListItemText primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem  disablePadding onClick={()=>{   
            router.push(`/posts`)
          }}>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
              <ListItemText primary={"Posts"} />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem  disablePadding onClick={()=>{
            router.push(`/users`)
          }}>
              <ListItemButton>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
              <ListItemText primary={"Users"} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
     
    </> );
}
 
export default SideBar;