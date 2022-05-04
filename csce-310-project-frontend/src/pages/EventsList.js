import React from 'react'
import Event from './Event.js'

 const EventsList = ( { eventss } ) => {
     return (
         eventss.map(event => {
             return <Event key = {event.id} event_name = {event}/>
         })
     )
 }

 export default EventsList