import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AppsIcon from '@mui/icons-material/Apps';
import fromimage from '../img/form.png'
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from 'react-router-dom';


function Header() {

 const navigate = useNavigate();
 const handleClick = () => {
  navigate("/profile"); 
 }

  
  return (
    <div className='header position-sticky mt-0px mb-10px d-flex justify-content-sm-between align-items-center bg-light '>
        <div className='header_info d-flex align-items-center'>
        <IconButton> <MenuIcon/></IconButton>
        <img src={fromimage} alt='no image'/>
        </div>
        <div className='header_search d-flex align-items-center'>
         <IconButton> <SearchIcon/></IconButton>
          <input type='text' placeholder='Search'/>
        </div>
        
        <div className='header_right d-flex align-items-center'>
          <IconButton>
            <AppsIcon></AppsIcon>
          </IconButton>
          <IconButton onClick={handleClick}>
            <Avatar/>
          </IconButton> 
          
       </div>
    </div>
  )
}

export default Header