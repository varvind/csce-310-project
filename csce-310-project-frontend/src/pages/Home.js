import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';

const Home = () => {
    // initialize states
    const [state, setState] = useState( {
        events: []
    });

    // create styles
    const style = {
        width: "60rem",
        marginTop: "1%"
    }

    // initialize variables
    const user_id = Cookies.get('userId');

    const getAllEvents = () => {
        fetch(`http://localhost:4000/adminEvents/get/all/pages/events`)
        .then((response) => response.json())
        .then((responseJson) => {
            var eventList = []
            responseJson.forEach(element => {
                eventList.push(element)
            })

            setState({
                events: eventList
            })
        }).catch((error) => {
            console.error(error)
        })
    }

    const addEvent = async (e) => {
        e.preventDefault();
        const inputs = Object.values(e.target)
        .filter(c => typeof c.tagName === 'string' && c.tagName.toLowerCase() === 'input')
        .reduce((acc, curr) => ({ ...acc, [curr.name]: curr.value }), {});
        const event_id = inputs.event_id

        let response = await fetch(`http://localhost:4000/events/create/${user_id}`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "event_id": event_id
            })
        })

        if (response.status === 201) {
            alert('Successfully followed event')
            window.location.href = '/'
        } else {
            alert('Error or Duplicate event')
            window.location.href = '/'
        }
    }

    useEffect(() => {
        getAllEvents()
    }, [])

    return (
        <>
            <center>
                { (user_id == null) &&
                    <>
                    <h1><u>Upcoming Events</u></h1>
                    {state.events.map((key, value) => {
                        return(
                            <>
                                <center>
                                    <div class="card" style={style}>
                                        <div class="card-body">
                                            <h5 class="card-title"><u>{key.title}</u></h5>
                                            <h6 class="font-weight-normal">{key.description}</h6>
                                        </div>
                                    </div>
                                </center>
                            </>
                        )
                    })}
                    </>
                }
                { (user_id != null) &&
                    <>
                        <h1><u>Upcoming Events</u></h1>
                        {state.events.map((key, value) => {
                            return(
                                <>
                                    <center>
                                        <div class="card" style={style}>
                                            <div class="card-body">
                                                <h5 class="card-title"><u>{key.title}</u></h5>
                                                <h6 class="font-weight-normal">{key.description}</h6>
                                                <div>
                                                    <a href={"/event/comments/" + key.event_id} class="card-link"><h6>Edit Comment</h6></a>
                                                    <form onSubmit={addEvent}>
                                                        <input type="hidden" value={key.event_id} name="event_id"/>
                                                        <input type="submit" class="btn btn-primary" value="Follow Event"/>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </center>
                                </>
                            )
                        })}
                    </>
                }
            </center>
        </>
    )
}


export default Home