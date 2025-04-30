import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, IconButton, List, ListItem,Drawer, ListItemText} from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';

function Sidebar() {
  const[state,setState]=React.useState({
    left:false,
})
  const toggleDrawer =(anchor,open)=>(event)=>{
    setState({...state,[anchor]:open})
  }
 
  return (
    <div>

    <React.Fragment>
    <IconButton onClick={toggleDrawer('left',true)}>
        <MenuIcon/>
    </IconButton>
       <Drawer open={state['left']} onClose={toggleDrawer('left',false)} anchor='left'>
      <List>
        <ListItem>
        <ListItemText primary='Form Stacker | Docs'/>
         
        </ListItem>
      </List>
       </Drawer>
    </React.Fragment>
    
       
    </div>
  )
}

export default Sidebar