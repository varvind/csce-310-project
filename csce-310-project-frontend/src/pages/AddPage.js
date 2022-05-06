import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

// made and edited by the best coder in the team: Jakob Evangelista
const  AddPage = () => {
    const [pagesState, setPagesState] = useState({});
    const navigate = useNavigate();

    const style = {
        width:"18rem",
        marginTop: "1%",
    }
    const adminId = Cookies.get('adminId')

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setPagesState(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let response = await fetch(`http://localhost:4000/pages/create/${adminId}`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "description": pagesState.description,
                "member_count": 1,
                "name": pagesState.name
            })
        });

        if(response.status === 201) {
            response.text().then(async (page_id) => {
                alert("Successfully Created Page")
                // Cookies.set('page_id', page_id)
            })
        } else {
            alert("Unable to create page")
        }
    }

    return (
        <>
            <center>
            <h3>Create Page</h3>
            <form onSubmit={handleSubmit}>
                <label>Page Name
                    <input 
                    type="text" 
                    name="name"
                    class="form-control"
                    value={pagesState.name || ""} 
                    onChange={handleChange}
                    />
                </label>
                <br/>
                <label>Description
                    <input 
                    type="text" 
                    name="description"
                    class="form-control"
                    value={pagesState.description || ""} 
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

export default AddPage