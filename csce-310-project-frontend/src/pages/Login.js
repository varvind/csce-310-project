import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import React from "react"

const Login = () => {
    const [inputs, setInputs] = useState({});

    const navigate = useNavigate();
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }


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
            response.text().then((userId) => {
                Cookies.set('userId', userId)
            })
            window.location.href = '/';
            
        } else {
            response.text().then((errorMsg) => {
                alert(errorMsg)
                navigate('/login')
            })
            
        }
    }

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