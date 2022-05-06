import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import React from 'react';

// Developed By Arvind V.
// Admin features developed by Jason Hirsch
const SignUp = () => {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    // Form Change Handler
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    // Form Submit Handler
    const handleSubmit = async (event) => {
        event.preventDefault();

        let response = await fetch('http://localhost:4000/user/create', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                 "first_name": inputs.first_name,
                 "last_name": inputs.last_name,
                 "username": inputs.username,
                 "password": inputs.password,
                 "profile_bio": inputs.bio
            })
         });

        if(response.status === 201) {
            response.text().then(async (userId) => {
                alert("Successfully Created User")
                Cookies.set('userId', userId)

                if(inputs.adminChecked) { //If admin do backend request
                    let adminResponse = await fetch('http://localhost:4000/admin/create', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            user_id: userId
                        })
                    })

                    if(adminResponse.status === 200) { //If request successful alert and set cookies
                        adminResponse.json().then(adminJson => {
                            const adminId = adminJson.admin_id;
                            alert("Successfully Created Admin")
                            Cookies.set('adminId', adminId);
                            window.location.href = '/'
                        })
                    }
                    else { //Else alert failure
                        alert("Unable to create admin")
                        navigate('/signup')
                    }
                }
                else {
                    Cookies.remove('adminId')
                    window.location.href = '/'
                }
            })
            
        } else {
            alert("Unable to create user")
            navigate('/signup')
        }
    }
    
    // JSX Element
    return(
        <>
        <center>
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
            <label>Username
                <input 
                type="text" 
                name="username" 
                class="form-control"
                value={inputs.username || ""} 
                onChange={handleChange}
                />
            </label>
            <br/>
            <label>Password
                <input 
                type="password" 
                name="password" 
                class="form-control"
                value={inputs.password || ""} 
                onChange={handleChange}
                />
            </label>
            <br/>
            <label>Bio
                <input 
                type="text" 
                name="bio" 
                class="form-control"
                value={inputs.bio || ""} 
                onChange={handleChange}
                />
            </label>
            <br/>
            <label>
                Admin
                <input type="checkbox" name="adminChecked" value={inputs.adminChecked === "true" ? "false" : "true"} style={{ marginLeft: "1rem" }} onChange={handleChange} />
            </label>
            <br />
            <input type="submit" class="btn btn-primary" />
        </form>
        </center>
        </>
    )
}


export default SignUp