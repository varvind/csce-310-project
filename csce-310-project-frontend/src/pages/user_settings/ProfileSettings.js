import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

// Developed By Arvind V.
const ProfileSettings = () => {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const user_id = Cookies.get('userId')

    // Form Change Handler
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    // Form Submit Handler
    const handleSubmit = async (event) => {
        event.preventDefault();
        let response = await fetch(`http://localhost:4000/user/update/${user_id}`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                 "first_name": inputs.first_name,
                 "last_name": inputs.last_name,
                 "profile_bio": inputs.bio,
                 "username": inputs.username
            })
         });
        if(response.status === 201) {
            alert("Profile Updated")
            navigate('/profile')
        } else {
            response.text().then((result) => {
                alert(result)
                navigate('/settings')
            })
        }
    }

    // JSX Element
    return (
    <>
        <h3>Profile Settings</h3>
        <form onSubmit={handleSubmit}>
            <label>First Name
            <input 
                type="text" 
                name="first_name"
                class="form-control" 
                value={inputs.first_name || ""} 
                onChange={handleChange}

            />
            </label>
            <br/>
            <label>Last Name
            <input 
                type="text" 
                name="last_name"
                class="form-control" 
                value={inputs.last_name || ""} 
                onChange={handleChange}

            />
            </label>
            <br/>
            <label>Profile Bio
            <input 
                type="text" 
                name="bio"
                class="form-control" 
                value={inputs.bio || ""} 
                onChange={handleChange}

            />
            </label>
            <label>Username
            <input 
                type="text" 
                name="username"
                class="form-control" 
                value={inputs.username|| ""} 
                onChange={handleChange}

            />
            </label>
            <br/>
            <input type="submit" class="btn btn-primary" />
        </form>
    </>
    )
}

export default ProfileSettings