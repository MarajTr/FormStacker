import React, { useState } from 'react';
import { IoMdFolderOpen } from 'react-icons/io';
import { FiSettings, FiStar } from 'react-icons/fi';
import { AiOutlineEye } from 'react-icons/ai';
import { IconButton, Avatar, Button } from '@mui/material';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import 'bootstrap/dist/css/bootstrap.min.css';
import Question from './Question';
import QuestionForm from './QuestionForm';

function Formheader() {
  const [docName, setDocName] = useState('Untitled form');

  return (
    <div>
      {/* Top Header Section */}
      <div className='formheader d-flex justify-content-between align-items-center p-3 bg-white'>
        {/* Left Section */}
        <div className='formheader_left d-flex align-items-center gap-3'>
          <img
            src='https://res.cloudinary.com/dqlkmngsz/image/upload/v1745650107/form_mdsyhd.png'
            alt='Form icon'
            style={{ height: '40px' }}
          />

          <input
            className='form-control border-0 fw-bold'
            type='text'
            value={docName}
            onChange={(e) => setDocName(e.target.value)}
            style={{ fontSize: '1.25rem', width: '200px' }}
          />

          <IoMdFolderOpen className='fs-4' title='Move to folder' style={{ cursor: 'pointer' }} />
          <FiStar className='fs-5' title='Star' style={{ cursor: 'pointer' }} />
        </div>

        {/* Right Section */}
        <div className='formheader_right d-flex align-items-center gap-2'>
          <IconButton title="Theme">
            <ColorLensIcon />
          </IconButton>
          <IconButton title="Preview">
            <AiOutlineEye />
          </IconButton>
          <IconButton title="Settings">
            <FiSettings />
          </IconButton>
          <Button variant="contained" href="#contained-button">Send</Button>
          <IconButton title="More">
            <MoreVertIcon />
          </IconButton>
          <IconButton title="Profile">
            <Avatar sx={{ width: 32, height: 32 }} />
          </IconButton>
        </div>
      </div>

      
      <div className='formheader_question '>
        <Question />
      </div>
      <div className='formheader_question '>
        <QuestionForm />
      </div>
    </div>
  );
}

export default Formheader;
