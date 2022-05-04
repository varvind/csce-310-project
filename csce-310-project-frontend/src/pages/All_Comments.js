import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios'

// developed by Joshua Kim
const All_Comments = () => {
    const [state, setState] = useState( {
        comments: []
    });
    /*
    const [inputs, setInputs] = useState({});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value})) // maybe incorrect
    }
    */
    const style = {
        width: "18rem",
        marginTop: "1%",
    }
    let user_id = Cookies.get('userId');

    // Get All Comments for the User
    const getComments = () => {
        let user_id = Cookies.get('userId')
        fetch(`http://localhost:4000/comments/get/${user_id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            var commentList = []
            responseJson.forEach(element => {
                commentList.push(element)
            });
            
            setState({
                comments : commentList
            })
        }).catch((error) => {
            console.error(error)
        })
    }

    const handleDeleteComments = async (e) => {
        console.log("Deleting Comment")
        e.preventDefault()
        const inputs = Object.values(e.target)
        .filter(c => typeof c.tagName === 'string' && c.tagName.toLowerCase() === 'input')
        .reduce((acc, curr) => ({ ...acc, [curr.name]: curr.value }), {});
        const comment_id = inputs.comment_id
        
        axios.delete(`http://localhost:4000/comments/delete/${user_id}/${comment_id}`)
        .then((response) => {
            if (response.status === 200) {
                alert('Successfully deleted comment')
                window.location.href = '/comments'
            } else {
                alert('Error in deleting comment')
                window.location.href='/comments'
            }
        })
    }

    const handleEditComments = async (e) => {
        console.log("Editing comment")
        e.preventDefault()
        const inputs = Object.values(e.target)
        .filter(c => typeof c.tagName === 'string' && c.tagName.toLowerCase() === 'input')
        .reduce((acc, curr) => ({ ...acc, [curr.name]: curr.value }), {});
        /*
        let comment_id = prompt('Enter comment id');
        axios.post(`http://localhost:4000/comments/update/${user_id}/${comment_id}`,{
            comment_id: inputs.comment_id,
            new_comment: inputs.new_comment_text
        })
        .then((response) => {
            if (response.status === 200) {
                alert('Successfully edited comment')
                window.location.href = '/comments'
            } else {
                alert('Error in editing comment')
                window.location.href='/comments'
            }
        })
        */
        
        // inputs retrieved from form
        
        const comment_id = inputs.comment_id
        const new_comment_text = inputs.new_comment_text

        let response = await fetch(`http://localhost:4000/comments/update/${user_id}`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "comment_id": comment_id,
                "new_comment": new_comment_text
            })
        });
        
        if (response.status === 200) {
            response.text().then(async (comment_id) => {
                alert("Successfully updated comment")
                window.location.href = '/comments'
            })
        } else {
            alert("Unable to update comment")
            window.location.href = "/comments"
        }
    }

    useEffect(() => {
        getComments()
    }, [])

    return (
        <>
        
        <center>
            <h3>Comments</h3>
            {state.comments.map((key, value) => {
                return(
                    <>
                        <center>
                            <div class="card" style={style}>
                                <h5 class="card-body">
                                    <h5 class="card-title">{key.Title}</h5>
                                    {key.comments}
                                    <a href={"/change/comment/" + key.user_id} class="card-link">Change Comment</a>
                                    <form onSubmit={handleEditComments} style ={{}}>
                                        <input type = "hidden" value = {key.comment_id} name = "comment_id"/>
                                        <input type = "text" value = {key.new_comment_text || ""}/>
                                        <input type = "submit" class="btn btn-primary" value = "Edit Comment"/>
                                    </form>
                                    <form onSubmit={handleDeleteComments} style={{}}>
                                        <input type = "hidden" value = {key.comment_id} name = "comment_id"/>
                                        <input type = "submit" class="btn btn-primary" value = "Delete Comment"/>
                                    </form>
                                </h5>
                            </div>
                        </center>
                    </>
                )
            })}
        </center>
        </>
    )
}

export default All_Comments