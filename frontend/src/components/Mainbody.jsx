import React from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import StorageIcon from '@mui/icons-material/Storage';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import "bootstrap/dist/css/bootstrap.min.css";

function Mainbody() {
  return (
    <div className="bg-light py-4">
      <div className="container-fluid px-3 px-md-5">
        
        {/* Top Bar */}
        <div className="row align-items-center mb-4">
          <div className="col-12 col-md-6 mb-2 mb-md-0">
            <h5 className="fw-bold mb-0">Recent Forms</h5>
          </div>
          <div className="col-12 col-md-6 d-flex justify-content-md-end align-items-center gap-2">
            <div className="d-flex align-items-center px-3 py-1 rounded-pill bg-secondary bg-opacity-25" style={{ cursor: 'pointer' }}>
              Owned by anyone <ArrowDropDownIcon fontSize="small" className="ms-1" />
            </div>
            <IconButton size="small">
              <StorageIcon style={{ color: "black" }} />
            </IconButton>
            <IconButton size="small">
              <FolderOpenIcon style={{ color: "black" }} />
            </IconButton>
          </div>
        </div>

        {/* Main Documents Grid */}
        <div className="row">
          
          {/* Example Single Card */}
          <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card h-100 border-0 shadow-sm p-3 d-flex flex-column justify-content-between" style={{ cursor: 'pointer', borderRadius: '10px' }}>
              
              <div className="d-flex justify-content-between align-items-center mb-3">
                {/* Left Icon */}
                <div className="d-flex align-items-center justify-content-center" style={{ backgroundColor: "#6E2594", borderRadius: "4px", padding: "8px" }}>
                  <StorageIcon style={{ color: "white" }} />
                </div>
                
                {/* Right Icon */}
                <MoreVertIcon style={{ color: "grey" }} />
              </div>

              {/* Document Title */}
              <h6 className="fw-semibold small mb-0">Untitled Form</h6>
              <p className="text-muted small mb-0">Opened 10 days ago</p>

            </div>
          </div>

          {/* Add more cards like this inside the row */}

        </div>

      </div>
    </div>
  );
}

export default Mainbody;
