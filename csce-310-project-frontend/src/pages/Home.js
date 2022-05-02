import React, {useState} from 'react';
import All_Comments from './All_Comments'
import EventsList from './EventsList.js'
import styles from './css/home_page.css'

const Home = () => {
    const [events, setEvents] = useState([{id: 1, name: 'Event 1', complete: false}, {id: 2, name: 'Event 2', complete: true}])
    return (
        <>
            <h1><u>Upcoming Events</u></h1>
            <EventsList eventss = {events}/>
        </>
    )
}


export default Home