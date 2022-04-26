import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import React from 'react';

// Developed by Arvind V.
const PasswordSettings = () => {
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
        let response = await fetch(`http://localhost:4000/user/update/password/${user_id}`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                 "original_password": inputs.old_password,
                 "new_password": inputs.new_password,
                 "confirm_password": inputs.new_password_confirmation
            })
        });

        if(response.status === 201) {
            alert("Updated Password")
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
        <h3>Password Settings</h3>
        <form onSubmit={handleSubmit}>
            <label>Old Password
            <input 
                type="password" 
                name="old_password"
                class="form-control" 
                value={inputs.old_password || ""} 
                onChange={handleChange}

            />
            </label>
            <br/>
            <label>New Password
            <input 
                type="password" 
                name="new_password"
                class="form-control" 
                value={inputs.new_password || ""} 
                onChange={handleChange}

            />
            </label>
            <br/>
            <label>Confirm New Password
            <input 
                type="password" 
                name="new_password_confirmation"
                class="form-control" 
                value={inputs.new_password_confirmation || ""} 
                onChange={handleChange}

            />
            </label>
            <br/>
            <input type="submit" class="btn btn-primary" />
        </form>
        </>
    )
}

export default PasswordSettings