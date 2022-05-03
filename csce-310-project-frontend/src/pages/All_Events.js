import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios'

const All_Events = ( {event_name} ) => {
    const [state, setState] = useState( {
        events: []
    });
    const [inputs, setInputs] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value})) // maybe incorrect
    }

    

    // jsx element
    return (
        <>
        </>
    )
}

export default All_Events