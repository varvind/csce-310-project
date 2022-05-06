import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom";

// made and edited by the best coder in the team: Jakob Evangelista
const  PageEvents = () => {
    const [state, setState] = useState({
        events : []
    });
    const [eventsState, setEventsState] = useState({});
    const navigate = useNavigate();

    const style = {
        width:"18rem",
        marginTop: "1%",
    }
    const {page_id} = useParams();

    //get all events
    const getEvents = () => {
        // let page_id = Cookies.get('pageId')
        fetch(`http://localhost:4000/adminEvents/get/${page_id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            var eventsList = []
            responseJson.forEach(element => {
                eventsList.push(element)
            });

            setState({
                events : eventsList
            })
        }).catch((error) => {
            console.error(error)
        })
    }

    // delete event
    const handleDeleteEvent = async (e) => {
        console.log("deleting page")
        e.preventDefault()
        const inputs = Object.values(e.target)
        .filter(c => typeof c.tagName === 'string' && c.tagName.toLowerCase() === 'input')
        .reduce((acc, curr) => ({ ...acc, [curr.name]: curr.value }), {});
        const event_id = inputs.event_id

        axios.delete(`http://localhost:4000/adminEvents/delete/${event_id}`).then((response) => {
            if(response.status === 200) {
                alert('Successully Removed Event')
            } else {
                alert('Error in Deleting Event')
            }
        }) 
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setEventsState(values => ({...values, [name]: value}))
    }

    // add new event
    const handleSubmit = async (event) => {
        event.preventDefault();
        // let page_id = Cookies.get("pageId")

        let response = await fetch(`http://localhost:4000/adminEvents/create/${page_id}`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "description": eventsState.description,
                "location_stamp": eventsState.location_stamp,
                "title": eventsState.title
            })
        });

        if(response.status === 201) {
            response.text().then(async (page_id) => {
                alert("Successfully Created Event")
                // Cookies.set('page_id', page_id)
            })
        } else {
            alert("Unable to create event")
        }
    }

    // Ensure state change happens only once
    useEffect(() => {
        getEvents()
    },[])

    return (
        <>
            <center>
            <h3>Your Events</h3>
            {state.events.map((key, value) => {
                return(
                    <>
                        <center>
                            <div class="card" style={style}>
                                <div class="card-body">
                                    <h5 class="card-title">{key.title}</h5>
                                    <p class = "card-text">{key.description}</p>
                                    <p class = "card-text">Location: {key.location_stamp}</p>
                                    <a href={"/editevent/" + key.event_id} class="card-link">Edit Event</a>
                                    <form onSubmit={handleDeleteEvent} style ={{}}>
                                            <input type = "hidden" value = {key.event_id} name = "event_id"/>
                                            <input type="submit" class="btn btn-primary" value = "Delete Event"/>
                                    </form>
                                </div>
                            </div>
                        </center>
                    </>
                )
            })}
            <h3>Create Event</h3>
            <form onSubmit={handleSubmit}>
                <label>Event Title
                    <input 
                    type="text" 
                    name="title"
                    class="form-control"
                    value={eventsState.title || ""} 
                    onChange={handleChange}
                    />
                </label>
                <br/>
                <label>Description
                    <input 
                    type="text" 
                    name="description"
                    class="form-control"
                    value={eventsState.description || ""} 
                    onChange={handleChange}
                    />
                </label>
                <br/>
                <label>Location Stamp
                    <input 
                    type="text" 
                    name="location_stamp"
                    class="form-control"
                    value={eventsState.location_stamp || ""} 
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

export default PageEvents