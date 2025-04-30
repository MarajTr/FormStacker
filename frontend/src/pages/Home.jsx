import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Header from "../components/Header";
import Mainbody from "../components/Mainbody";
import Template from "../components/Template";

const Home = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]); 
  const [selectedUsers, setSelectedUsers] = useState([]);  
  const [loggedInUserEmail, setLoggedInUserEmail] = useState(null);

  const fetchUsers = async () => {
      try {
          const token = localStorage.getItem("token");
          if (!token) {
              console.error("No token found!");
              navigate("/login");
              return;
          }
  
          const response = await axios.get("https://formstacker-restapi.onrender.com/auth/home", {
            
              headers: { Authorization: `Bearer ${token}` },
          });
  
          console.log("API Response:", response.data); // Debugging
  
          if (response.status !== 200) {
              navigate("/login");
              return;
          }
  
          setUsers(response.data.users); 
          setFilteredUsers(response.data.users);
          setLoggedInUserEmail(response.data.loggedInUserEmail); // Store logged-in user's email
      } catch (err) {
          console.error("Error fetching users:", err.response?.data || err.message);
          navigate("/login");
      }
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);

// Handle checkbox toggle for individual user (by email)
const handleCheckboxChange = (email) => {
  setSelectedUsers((prevSelected) =>
    prevSelected.includes(email)
      ? prevSelected.filter((userEmail) => userEmail !== email)
      : [...prevSelected, email]
  );
};


 // Handle "Select All" checkbox
 const handleSelectAll = (isChecked) => {
  if (isChecked) {
    const allEmails = filteredUsers.map((user) => user.email);
    setSelectedUsers(allEmails);
  } else {
    // Deselect all users
    setSelectedUsers([]);
  }
};


const deleteUsers = async (navigate) => {
  const logInEmail = localStorage.getItem("logInEmail");
  const token = localStorage.getItem("token");

  if (!logInEmail || !token) {
    console.error("❌ Authentication required!");
    alert("Please log in to perform this action.");
    return;
  }

  if (selectedUsers.length === 0) {
    alert("❌ No users selected for deletion.");
    return;
  }

  // Split selected users into current user and others
  const [ownEmail, othersEmails] = selectedUsers.reduce(
    ([self, others], email) => {
      email === logInEmail 
        ? self.push(email)
        : others.push(email);
      return [self, others];
    },
    [[], []]
  );

  try {
    // Delete other users first if any
    if (othersEmails.length > 0) {
      await axios.delete("https://formstacker-restapi.onrender.com/authdelete", {
        headers: { Authorization: `Bearer ${token}` },
        data: { emails: othersEmails },
      });
      console.log("🟢 Other users deleted successfully");
      fetchUsers(); // Refresh the list after successful deletion
    }

    // Delete own account if selected (after others are deleted)
    if (ownEmail.length > 0) {
      await axios.delete("https://formstacker-restapi.onrender.com/auth/delete", {
        headers: { Authorization: `Bearer ${token}` },
        data: { emails: ownEmail },
      });
      console.log("🟢 Own account deleted successfully");

      // Clear local storage and redirect
      localStorage.removeItem("logInEmail");
      localStorage.removeItem("token");
      navigate('/login');
    }

  } catch (error) {
    console.error("❌ Deletion failed:", error.response?.data || error.message);
    alert('Delete your own email!!!');
    fetchUsers(); // Refresh the list even if there's an error
  }
};
const blockSelectedUsers = async (block) => {
  const token = localStorage.getItem("token");
  const loggedInEmail = localStorage.getItem("logInEmail");

  if (!token || selectedUsers.length === 0) return;

  // Separate self and others
  const self = selectedUsers.filter(email => email === loggedInEmail);
  const others = selectedUsers.filter(email => email !== loggedInEmail);

  try {
    // Process others
    if (others.length > 0) {
      const results = await Promise.allSettled(
        others.map(email =>
          axios.patch(
            "https://formstacker-restapi.onrender.com/auth/block",
            { email, block },
            { headers: { Authorization: `Bearer ${token}` } }
          )
        )
      );
      results.forEach((result, index) => {
        if (result.status === 'rejected') {
          console.error(`Failed to process ${others[index]}:`, result.reason);
        }
      });
    }

    // Process self if blocking
    if (block && self.length > 0) {
      try {
        await axios.patch(
          "https://formstacker-restapi.onrender.com/auth/block",
          { email: loggedInEmail, block },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error("Failed to block self:", error);
      } finally {
        localStorage.removeItem("logInEmail");
        localStorage.removeItem("token");
        navigate('/login');
        return; // Exit after logout
      }
    }

    // Refresh user list
    fetchUsers();
  } catch (error) {
    console.error("Error in blockSelectedUsers:", error);
  }
};

return (
  <div>
    <Header />
    <Template />
    <Mainbody/>
  </div>
);
};
export default Home;
