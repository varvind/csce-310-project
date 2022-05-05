import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios'

// developed by Joshua Kim
const All_Events = () => {
    // initializing states
    const [state, setState] = useState( {
        events: []
    });

    // styling
    const style = {
        width: "18rem",
        marginTop: "1%",
    }
    const buttonStyle = {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
    const deleteFormStyle = {
        marginTop: "1%"
    }

    // initialize user_id from cookies
    let user_id = Cookies.get('userId');

    // Function: Get all Events from the specified user
    const getAllEvents = () => {
        let user_id = Cookies.get('userId')
        fetch(`http://localhost:4000/events/get/${user_id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            var eventList = []
            responseJson.forEach(element => {
                eventList.push(element)
            })
            
            setState({
                events : eventList
            })
        }).catch((error) => {
            console.error(error)
        })
    }
    
    const handleEditStatus = async (e) => {

    }

    const handleDeleteEvent = async (e) => {
        console.log("Deleting Comment")
        e.preventDefault()
        const inputs = Object.values(e.target)
        .filter(c => typeof c.tagName === 'string' && c.tagName.toLowerCase() === 'input')
        .reduce((acc, curr) => ({ ...acc, [curr.name]: curr.value}), {});
        const event_id = inputs.event_id

        axios.delete(`http://localhost:4000/events/delete/${user_id}/${event_id}`)
        .then((response) => {
            if (response.status === 200) {
                alert('Succesfully deleted event')
                window.location.href = '/events'
            } else {
                alert('Error in deleting event')
                window.location.href = '/events'
            }
        })
    }

    useEffect(() => {
        getAllEvents()
    }, [])

    // jsx element
    return (
        <>
            <center>
                <h3>Events</h3>
                    {state.events.map((key, value) => {
                        return(
                            <>
                                <center>
                                    <div class="card" style={style}>
                                        Hi
                                    </div>
                                </center>
                            </>
                        )
                    })}
            </center>
        </>
    )
}

export default All_Events