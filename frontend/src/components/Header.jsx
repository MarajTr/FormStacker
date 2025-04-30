import React, { use } from 'react'
import { Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AppsIcon from '@mui/icons-material/Apps';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';



function Header() {

 const navigate = useNavigate();
 const handleNavigate = (path) => {
    navigate(path); 
  }
  
  return (
    <div className='header position-sticky mt-0px mb-10px d-flex justify-content-sm-between align-items-center bg-light '>
        <div className='header_info d-flex align-items-center'>
        <Sidebar/>
        <img src={'https://res.cloudinary.com/dqlkmngsz/image/upload/v1745650107/form_mdsyhd.png'} alt='no image'/>
        </div>
        <div className='header_search flex d-flex flex-row align-items-center bg-color-light w-700px h-45px rounded' >
         <IconButton> <SearchIcon/></IconButton>
          <input className='header_search_input  ' type='text' placeholder='Search'/>
        </div>
        
        <div className='header_right d-flex align-items-center'>
          <IconButton>
            <AppsIcon></AppsIcon>
          </IconButton>
          <IconButton onClick={() => handleNavigate('/profile')}>
            <Avatar src=''/>
          </IconButton> 
          
       </div>
    </div>
  )
}

export default Header