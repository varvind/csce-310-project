import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import {useParams} from "react-router-dom";


// made and edited by the best coder in the team: Jakob Evangelista

const EditEvent = () => {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const {event_id} = useParams();


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        let response = await fetch(`http://localhost:4000/adminEvents/update/${event_id}`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                 "title": inputs.title,
                 "description": inputs.description,
                 "location_stamp": inputs.location_stamp
            })
         });
        if(response.status === 201) {
            alert("Event Updated")
        } else {
            response.text().then((result) => {
                alert(result)
            })
        }
    }

    // JSX Element
    return (
    <>
        <center>
        <h3>Edit Event</h3>
        <form onSubmit={handleSubmit}>
            <label>Event Title
            <input 
                type="text" 
                name="title"
                class="form-control" 
                value={inputs.title || ""} 
                onChange={handleChange}
            />
            </label>
            <br/>
            <label>Event Description
            <input 
                type="text" 
                name="description"
                class="form-control" 
                value={inputs.description || ""} 
                onChange={handleChange}

            />
            </label>
            <br/>
            <label>Location Stamp
            <input 
                type="text" 
                name="location_stamp"
                class="form-control" 
                value={inputs.location_stamp || ""} 
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

export default EditEvent