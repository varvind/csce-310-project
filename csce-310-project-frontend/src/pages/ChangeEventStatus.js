import {useParams} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';

// Developed by Joshua Kim
const changeEventStatus = () => {
    // store the various required states for different components and intilize necessary variables
    let [eventName, setEventName] = useState("");
    let [status, setStatus] = useState("")
    let [new_status, setNewStatus] = useState("")
    let { event_id } = useParams();
    let user_id = Cookies.get('userId');

    // runs upon load. Gets the status of the event. 
    const getEventStatus = () => {
        fetch(`http://localhost:4000/events/get/specific/status/${event_id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            setStatus(responseJson.status)
        }).catch((error) => {
            console.error(error)
        })
    }

    // runs upon load. Gets the events title
    const getEventName = () => {
        console.log(event_id)
        fetch(`http://localhost:4000/events/get/specific/name/${event_id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson.title)
            setEventName(responseJson.title)
            getEventStatus()
        }).catch((error) => {
            console.error(error)
        })
    }

    // Grabs value in textbox and saves to new_status state
    const handleChange = (event) => {
        const value = event.target.value;
        setNewStatus(value)
    }

    // Form Submit Handler: handles the event when the user presses the submit button
    const handleSubmit = async (e) => {
        console.log("Editing Event Status")
        console.log("status:", new_status, typeof(new_status))
        e.preventDefault()

        // text retrieved from form
        let response = await fetch(`http://localhost:4000/events/update/${user_id}/${event_id}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                status: new_status
            })
        });

        if (response.status === 201) {
            alert("Successfully updated status")
            setStatus(new_status)
            window.location.href = '/allevents'
        } else {
            alert("Unable to update status")
            window.location.href = `/change/event/status/${event_id}`
        }
        
    }

    // run getComment when page is loaded
    useEffect(() => {
        getEventName();
    }, [])

    return(
        <>
            <a href = '/allevents'> Back to My Events Page</a>

            <center>
                {/* Display header and current event with identifier */}
                <h1>Change Event Status: {eventName}</h1>
                <header style={{ borderBottom: "1px" }}>
                    <h4 style={{ display: "inline-block" }}>Event Status:</h4>
                    <span class="h4 font-weight-normal">{" " + status}</span>
                </header>

                <form onSubmit={handleSubmit}>
                    <label> New Event
                    <select value={new_status} onChange={handleChange}>
                        <option value=""></option>
                        <option value="Going">Going</option>
                        <option value="Maybe">Maybe</option>
                    </select>
                    </label>
                    <br/>
                    <input type="submit" class="btn btn-primary"/>
                </form>
            </center>
        </>
    )
}

export default changeEventStatus