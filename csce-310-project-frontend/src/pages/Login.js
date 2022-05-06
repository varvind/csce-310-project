import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import React from "react"

// Developed by Arvind V.
// Admin features developed by Jason Hirsch
const Login = () => {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    // Form Change Handler
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    // Form Submite Handler
    const handleSubmit = async (event) => {
        event.preventDefault();
        let response = await fetch('http://localhost:4000/user/login', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                 "username": inputs.username,
                 "password": inputs.password,
            })
         });
        
        if(response.status === 200) {
            response.text().then(async (userId) => {
                Cookies.set('userId', userId)

                let adminResponse = await fetch('http://localhost:4000/admin/get/' + userId, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                })
                console.log(adminResponse)
                if(adminResponse.status === 200) { //If user is an admin set cookies
                    adminResponse.json().then(adminJson => {
                        console.log(adminJson);
                        const adminId = adminJson.admin_id
                        Cookies.set('adminId', adminId)
                        window.location.href = '/';
                    })
                }
                else {
                    Cookies.remove('adminId')
                    window.location.href = '/';
                }                
            })
        } else {
            response.text().then((errorMsg) => {
                alert(errorMsg)
                navigate('/login')
            })
        }
    }

    // JSX Element
    return(
        <>
        <center>
        <form onSubmit={handleSubmit}>
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
            <input type="submit" class="btn btn-primary" />
        </form>
        </center>
        </>
    )
}


export default Login