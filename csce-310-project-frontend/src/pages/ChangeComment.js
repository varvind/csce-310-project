import {useParams} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';

// Developed by Joshua Kim
const changeComments = () => {
    // store the various required states and intilize necessary variables
    const [editInputs, seteditInputs] = useState({});
    const [comment, setComment] = useState("");
    let user_id = Cookies.get('userId');
    let { comment_id } = useParams();

    // This will handle any changes made on the form. This will allow the input values as the user types to be stored into the state
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        seteditInputs(values => ({...values, [name]: value}))
    }

    // Form Submit Handler: handles the event when the user presses the submit button
    const handleSubmit = async (e) => {
        console.log("Editing comment")

        // won't allow to submit as is
        e.preventDefault()
        
        // text retrieved from form
        const new_comment_text = editInputs.comments
        
        // updates the comment and passes the parameters
        //      params: user_id
        //      body_parameters: comment_id, new_comment
        let response = await fetch(`http://localhost:4000/comments/update/${user_id}`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "comment_id": comment_id,
                "user_comment": new_comment_text
            })
        });
        
        // display success or failure and send back to the My comments page
        if (response.status === 201) {
            response.text().then(async (comment_id) => {
                alert("Successfully updated comment")
                window.location.href = '/allcomments'
            })
        } else {
            alert("Unable to update comment")
            window.location.href = "/allcomments"
        }


    }

    // Functionality: Get the comment associated with the comment_id that is passed from the url parameter
    const getComment = () => {
        fetch(`http://localhost:4000/comments/get/specific/${comment_id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson.comments)
            setComment(responseJson.comments)
        }).catch((error) => {
            console.error(error)
        })
    }

    // run getComment when page is loaded
    useEffect(() => {
        getComment()
    }, [])

    return(
        <>
            <a href = '/allcomments'> Back to My Comments Page</a>

            <center>
            {/* Display current comment with identifier */}
            <header style={{ borderBottom: "1px"}}>
                <h4 style={{ display: "inline-block" }}>Current comment:</h4>
                <span class="h4 font-weight-normal">{" " + comment}</span>
            </header>

            {/* Creates a form that runs handleSubmit when submitted */}
            <form onSubmit={handleSubmit}>
                <label>New Comment
                <input 
                    type="text" 
                    name="comments"
                    class="form-control" 
                    value={editInputs.comments || ""} 
                    onChange={handleChange}
                />
                </label>
                <br></br>
                <input type="submit" class="btn btn-primary"/>
            </form>
            </center>
        </>
    )
}

export default changeComments

