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
        console.log(user_id)
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

    // handles when delete is pressed
    const handleDeleteEvent = async (e) => {
        console.log("Deleting Event")
        e.preventDefault()
        const inputs = Object.values(e.target)
        .filter(c => typeof c.tagName === 'string' && c.tagName.toLowerCase() === 'input')
        .reduce((acc, curr) => ({ ...acc, [curr.name]: curr.value}), {});
        const event_id = inputs.event_id

        axios.delete(`http://localhost:4000/events/delete/${user_id}/${event_id}`)
        .then((response) => {
            if (response.status === 200) {
                alert('Succesfully deleted event')
                window.location.href = '/allevents'
            } else {
                alert('Error in deleting event')
                window.location.href = '/allevents'
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
                                        <div class="card-body">
                                            <h5 class="card-title"><u>{key.title}</u></h5>
                                            <h6 class="font-weight-normal">{key.description}</h6>
                                            <div style={buttonStyle}>
                                                <a href={"/change/event/status/" + key.event_id} class="card-link"><h6>Change Event Status</h6></a>
                                                <form onSubmit={handleDeleteEvent} style={deleteFormStyle}>
                                                    <input type="hidden" value={key.event_id} name="event_id"/>
                                                    <input type="submit" class="btn btn-primary" value="Delete Event"/>
                                                </form>
                                            </div>
                                        </div>
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