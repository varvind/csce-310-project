import React, {useState} from 'react'
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom";

// developed by Joshua Kim
const All_Comments = () => {
    // Form Submite Handler
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const { user_id } = useParams();

    const handleSubmit = async (event) => {
        event.preventDefault();
        let response = await fetch(`http://localhost:4000/comments/create/${user_id}`, {
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
    return (
        <div>
            Hello World
        </div>
    )
}

export default All_Comments