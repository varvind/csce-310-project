import {useParams} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';

// Developed by Joshua Kim
const changeEventStatus = () => {
    // store the various required states and intilize necessary variables
    const [inputs, setInputs] = useState({});
    const [eventName, setEventName] = useState("");
    let event_id  = useParams();

    // This will handle any changes made on the form. This will allow the input values as the user types to be stored into the state
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    // Form Submit Handler: handles the event when the user presses the submit button
    const handleSubmit = async (e) => {
        console.log("Editing Event Status")
        e.preventDefault()

        // text retrieved from form
        
    }

    const getEventName = () => {
        console.log(event_id)
        fetch(`http://localhost:4000/events/get/specific/name/${event_id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson.title)
            console.log(responseJson.eventName)
            setEventName(responseJson.title)
        }).catch((error) => {
            console.error(error)
        })
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
            <h1>Change Event {eventName} Status</h1>
            <header style={{ borderBottom: "1px" }}>
                <h4 style={{ display: "inline-block" }}>Event Status:</h4>
                <span class="h4 font-weight-normal">{" "}</span>
            </header>
            </center>
        </>
    )
}

export default changeEventStatus

