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
        let response = await fetch(`http://localhost:4000/user/delete/${user_id}`, {
            method: 'DELETE',
            headers: {'Content-Type':'application/json'},
         });

        if(response.status === 200) {
            Cookies.remove('userId')
            Cookies.remove('adminId')
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