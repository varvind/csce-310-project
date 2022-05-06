import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import {useParams} from "react-router-dom";


// made and edited by the best coder in the team: Jakob Evangelista

const EditPage = () => {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const {page_id} = useParams();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let response = await fetch(`http://localhost:4000/pages/update/${page_id}`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                 "name": inputs.page_name,
                 "description": inputs.description,
                 "member_count": inputs.member_count
            })
         });
        if(response.status === 201) {
            alert("Page Updated")
            navigate('/yourpages')
        } else {
            response.text().then((result) => {
                alert(result)
                navigate('/editpage')
            })
        }
    }

    return (
    <>
        <center>
        <h3>Edit Page</h3>
        <form onSubmit={handleSubmit}>
            <label>Page Name
            <input 
                type="text" 
                name="page_name"
                class="form-control" 
                value={inputs.page_name || ""} 
                onChange={handleChange}

            />
            </label>
            <br/>
            <label>Description
            <input 
                type="text" 
                name="description"
                class="form-control" 
                value={inputs.description || ""} 
                onChange={handleChange}

            />
            </label>
            <br/>
            <label>Member Count
            <input 
                type="text" 
                name="member_count"
                class="form-control" 
                value={inputs.member_count || ""} 
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

export default EditPage