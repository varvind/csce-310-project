import {useParams} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';

// Developed by Joshua Kim
const changeEventStatus = () => {
    // store the various required states and intilize necessary variables
    const [inputs, setInputs] = useState({});
    const [event, setEvent] = useState("");
    let user_id = Cookies.get('userId');
    let { event_id } = useParams();

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

    const getEvent = () => {
        
    }


    // run getComment when page is loaded
    useEffect(() => {
        getEvent();
    }, [])

    return(
        <>
            <a href = '/allevents'> Back to My Events Page</a>

            <center>

            </center>
        </>
    )
}

export default changeEventStatus

