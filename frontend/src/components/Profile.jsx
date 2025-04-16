import React from 'react';
import axios, { Axios } from 'axios';
import { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [image, setImage] = useState(null); // Initialize as null

    // fetchUser remains the same

    const uploadImage = async () => {
        if (!image) {
            setError('Please select a file first.');
            return;
        }
    
        setLoading(true);
        setError('');
    
        try {
            // 1. Upload to Cloudinary
            const cloudinaryFormData = new FormData();
            cloudinaryFormData.append("file", image);
            cloudinaryFormData.append("upload_preset", "form_img");
    
            const cloudinaryResponse = await axios.post(
                "https://api.cloudinary.com/v1_1/dqlkmngsz/image/upload",
                cloudinaryFormData
            );
    
            // 2. Send URL to your backend
            const token = localStorage.getItem("token");
            await axios.patch(
                "http://localhost:5000/auth/image",
                { profileImage: cloudinaryResponse.data.secure_url },
                { headers: { Authorization: `Bearer ${token}` } }
            );
    
            // 3. Update local state
            setUser(prev => ({ 
                ...prev, 
                profileImage: cloudinaryResponse.data.secure_url 
            }));
    
        } catch (err) {
            setError(err.response?.data?.message || "Error updating profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container-fluid mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-6 text-center'>
                    <div className="card shadow">
                        <div className="card-body">
                            {/* Profile Image Upload */}
                            <div className="mb-4">
                                <input
                                    type="file"
                                    className="form-control"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    disabled={loading}
                                />
                                {error && <div className="text-danger mt-2">{error}</div>}
                                <div className="d-grid gap-2 mt-3">
                                    <button 
                                        className="btn btn-outline-secondary"
                                        onClick={uploadImage}
                                        disabled={loading}
                                    >
                                        {loading ? 'Uploading...' : 'Upload Image'}
                                    </button>
                                </div>
                            </div>

                            {/* User Info remains the same */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;