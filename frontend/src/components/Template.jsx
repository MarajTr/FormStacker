import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import "bootstrap/dist/css/bootstrap.min.css";
import uuid from 'react-uuid';
function Template() {
  const navigate = useNavigate();
  const templates = [
    { title: "Blank form", img: "https://res.cloudinary.com/dqlkmngsz/image/upload/v1745648763/forms-blank-googlecolors_fsfe3x.png" },
    { title: "Contact Information", img: "https://res.cloudinary.com/dqlkmngsz/image/upload/v1745649884/contract_tcu8nd.png" },
    { title: "T-Shirt Sign Up", img: "https://res.cloudinary.com/dqlkmngsz/image/upload/v1745650019/t-shirt_aik8a4.png" },
  ];

 const createForm = () => {
    
    const formId = uuid(); // Generate a unique form ID using uuid
    
    navigate("/form/"+formId); // Navigate to the form page with the unique ID
  }
  return (
    <div className="bg-light py-5">
      <div className="container-fluid px-3 px-md-5">
        
        {/* Top Bar */}
        <div className="row align-items-center mb-4">
          
          <div className="col-12 col-md-6 mb-2 mb-md-0">
            <h5 className="fw-bold mb-0">Start a new form</h5>
          </div>

          <div className="col-12 col-md-6 d-flex justify-content-md-end align-items-center gap-2">
            <div className="d-flex align-items-center px-3 py-1 rounded-pill bg-secondary bg-opacity-25" style={{ cursor: 'pointer' }}>
              Template gallery <UnfoldMoreIcon fontSize="small" className="ms-1" />
            </div>
            <IconButton size="small">
              <MoreVertIcon fontSize="small" style={{ color: "black" }} />
            </IconButton>
          </div>

        </div>

        {/* Template Cards */}
        <div className="row g-3">
          {templates.map((template, index) => (
            <div className="col-6 col-md-4 col-lg-2" key={index}>
              <div className="card h-100 border-0 shadow-sm p-2 rounded-4 text-center" style={{ cursor: 'pointer' }} onClick={createForm}>
                <img 
                  src={template.img}
                  alt={template.title}
                  className="img-fluid rounded-3"
                  style={{ height: '130px', objectFit: 'cover' }}
                />
                <div className="mt-2 fw-medium small">{template.title}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Template;
