import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import {useParams} from "react-router-dom";

// Developed by Joshua Kimm
const EventComments = () => {
    // initialize states
    const [state, setState] = useState( {
        comments: []
    });
    const [eventName, setEventName] = useState("")
    const [inputs, setInputs] = useState("")

    // create styles
    const style = {
        width: "100%",
        marginTop: "1%"
    }

    // initialize variables
    const user_id = Cookies.get('userId');
    const { event_id } = useParams();
    
    const getName = () => {
        fetch(`http://localhost:4000/events/get/specific/name/${event_id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson.title)
            setEventName(responseJson.title)
        }).catch((error) => {
            console.error(error)
        })
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
        console.log("val:", value)
    }

    // Function: upon loading, get all comments and event details
    const getComments = () => {
        fetch(`http://localhost:4000/comments/get/from/event/${event_id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            var commentList = []
            responseJson.forEach(element => {
                commentList.push(element)
            })

            setState({
                comments: commentList
            })
            getName();
        }).catch((error) => {
            console.error(error)
        })
    }

    // Functionality: User can post a comment to an event
    const addComment = async(e) => {
        console.log("Posting a comment")
        e.preventDefault()

        const new_comment_text = inputs.new_comment_text
        console.log("New_comment:" , new_comment_text)
        // takes url: user_id, body: event_id, user_comment
        let response = await fetch(`http://localhost:4000/comments/create/${user_id}`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "event_id": event_id,
                "new_comment": new_comment_text
            })
        });

        // display success or failure and reload page
        if (response.status === 201) {
            response.text().then(async (comment_id) => {
                alert("Successfully updated comment")
                window.location.href = `/event/comments/${event_id}`
            })
        } else {
            alert("Unable to post comment")
            window.location.href = `/event/comments/${event_id}`
        }
    }

    // run on load
    useEffect(() => {
        getComments()
    }, [])

    return (
        <>
            <a href = '/'> Back to Home Page</a>
            
                {/* If user is not logged in, just show events and details */}
                { (user_id == null) &&
                    <>
                    <h1><u>{eventName}</u></h1>
                    {state.comments.map((key, value) => {
                        return(
                            <>
                                <center>
                                    <div class="card" style={style}>
                                        
                                    </div>
                                </center>
                            </>
                        )
                    })}
                    </>
                }
                {/* If user is logged in, show follow and edit buttons */}
                { (user_id != null) &&
                    <>
                        <center>
                            <h1><u>{eventName}</u></h1>
                            <form onSubmit={addComment} style={{}}>
                                <label> New Comment
                                    <input
                                        type="text"
                                        name="new_comment_text"
                                        class="form-control"
                                        value={inputs.new_comment_text || ""}
                                        onChange={handleChange}
                                        style={{ paddingLeft: "15%", paddingRight: "15%"}}
                                    />
                                </label>
                                <input type="submit" class="btn btn-primary" value="post" style={{ marginLeft: "1%", paddingTop: ".5%", paddingBottom:"1%", paddingLeft: "1.5%", paddingRight: "1.5%"}}/>
                            </form>
                        </center>
                        {state.comments.map((key, value) => {
                            return(
                                <>
                                    <div class="card" style={style}>
                                        <div class="card-body justify-content-left">
                                            <h4 class="card-title text-align-cente"><u>{key.username}</u></h4>
                                            <p class="card-text">{key.comments}</p>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </>
                }
        </>
    )
}

export default  EventComments