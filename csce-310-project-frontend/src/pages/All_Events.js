import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios'

const All_Events = ( {event_name} ) => {
    const [state, setState] = useState( {
        events: []
    });
    let user_id = Cookies.get('userId');

    const getAllEvents = () => {
        let user_id = Cookies.get('userId')
        fetch(`http://localhost:4000/events/get/${user_id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            var commentList = []
            responseJson.forEach(element => {
                commentList.push(element)
            })
            
            setState({
                comments : commentList
            })
        }).catch((error) => {
            console.error(error)
        })
    }
    
    const handleEditStatus = () => {

    }

    const handleDeleteEvent = () => {

    }

    // jsx element
    return (
        <>
        </>
    )
}

export default All_Events