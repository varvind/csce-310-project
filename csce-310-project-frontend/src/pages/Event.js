import React from 'react'
import {Link} from "react-router-dom"

// Developed by Joshua Kim
const Event = ( {event_name} ) => { 
    const handleEventAdd = async(event) => {
        
    }
    /*
    const handleEventAdd = async(event) => {
        const { user_id } = useParams();

        let response = await fetch(`http://localhost:4000/events/create/${user_id}`, {
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
    */
    return (
        // empty fragment allows us to return all jsx elements wrapped in one
        <>
            <div>
                <label>
                    <Link to="/">{event_name.name}</Link>
                    <button onClick={handleEventAdd}>add</button>
                </label>
            </div>
        </>
    )
} 

export default Event