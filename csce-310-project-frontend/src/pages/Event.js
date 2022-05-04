import React,{useState} from 'react'
import Cookies from 'js-cookie';
// import {Link, Navigate} from "react-router-dom"

// Developed by Joshua Kim
// Page that shows further event details
const Event = ( {event_name} ) => { 
    const [inputs, setInputs] = useState({});
    let user_id = Cookies.get('userId');

    // functionality: handle the action associated with pressing add event
    const handleEventAdd = async(event) => {
        event.preventDefault();
        let response = await fetch(`http://localhost:4000/comments/create/${user_id}`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "event_id": inputs.event_id, // CHECK HOW YOU ARE GETTING THIS VALUE
                "comments": inputs.comment_text
            })
        });

        if (response.status === 201) {
            response.text().then((value) => {
                alert("Successfully created comment")
                window.location.href ='/'
            })
        } else {
            alert("Unable to create comment")
            // perhaps navigate to a page
        }
    }
    
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    return (
        // empty fragment allows us to return all jsx elements wrapped in one
        <>
            {/*Within an event box we need to be able to add a comment - Joshua Kim*/}
            {/*Create a comment/form box below the event and this will need to be below every event*/}
            <form onSubmit={handleEventAdd}>
                <input
                    type="text"
                    placeholder="comment"
                    name="comment_text"
                    class="form-control"
                    values={inputs.comment_text || ""}
                    onChange={handleChange}
                />
            </form>
            
        </>
    )
} 

export default Event