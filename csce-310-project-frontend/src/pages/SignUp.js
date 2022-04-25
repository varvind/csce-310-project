import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import React, { Component }  from 'react';



const SignUp = () => {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

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
            response.text().then((userId) => {
                alert("Successfully Created User")
                Cookies.set('userId', userId)
                window.location.href = '/'
            })
            
        } else {
            alert("Unable to create user")
            navigate('/signup')
        }
    }
    
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
            <input type="submit" class="btn btn-primary" />
        </form>
        </center>
        </>
    )
}


export default SignUp