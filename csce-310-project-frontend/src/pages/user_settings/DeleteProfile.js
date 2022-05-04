import React from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

// Developed By Arvind V.
// Admin features developed by Jason Hirsch
const DeleteProfile = () => {
    const navigate = useNavigate();
    const user_id = Cookies.get('userId')
    const admin_id = Cookies.get('adminId')

    // Submit Event Handler
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(admin_id != null) {
            let adminResponse = await fetch(`http://localhost:4000/admin/delete/${admin_id}`, {
                method: 'DELETE',
                headers: {'Content-Type':'application/json'},
            });
            if(adminResponse.status === 200) {
                alert("Admin Deleted")
            }
            else {
                alert("Error when attempting to delete admin")
            }

            Cookies.remove('adminId')
        }

        let response = await fetch(`http://localhost:4000/user/delete/${user_id}`, {
            method: 'DELETE',
            headers: {'Content-Type':'application/json'},
         });

        if(response.status === 200) {
            Cookies.remove('userId')
            alert("Profile Deleted")

            window.location.href='/'
        } else {
            alert("Error when attempting to delete profile")
            navigate('/settings')
        }
    }

    // JSX Element
    return (
        <>
            <h3>Delete Profile?</h3>
            <form onSubmit={handleSubmit}>
                <input type="submit" class="btn btn-primary" value = "Delete Profile"/>
            </form>
        </>
    )
}

export default DeleteProfile