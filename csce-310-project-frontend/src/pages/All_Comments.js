import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios'

// developed by Joshua Kim
const All_Comments = () => {
    const [state, setState] = useState( {
        comments: []
    });
    
    // Stylings for different parts
    const style = {
        width: "26rem",
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
    
    // grab user_id from Cookies
    let user_id = Cookies.get('userId');

    // Get All Comments for the User
    const getComments = () => {
        let user_id = Cookies.get('userId')
        fetch(`http://localhost:4000/comments/get/${user_id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            // store it in an array and set the state
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

        // grabs input vals
        const inputs = Object.values(e.target)
        .filter(c => typeof c.tagName === 'string' && c.tagName.toLowerCase() === 'input')
        .reduce((acc, curr) => ({ ...acc, [curr.name]: curr.value }), {});
        const comment_id = inputs.comment_id
        
        axios.delete(`http://localhost:4000/comments/delete/${user_id}/${comment_id}`).then((response) => {
            if (response.status === 200) {
                alert('Successfully deleted comment')
                window.location.href = '/allcomments'
            } else {
                alert('Error in deleting comment')
                window.location.href='/allcomments'
            }
        })
    }

    // Function run when page is loaded
    useEffect(() => {
        getComments()
    }, [])

    // JSX element
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
                                    <h4 class="card-title"><u>{key.title}</u></h4>
                                    <h6 class="font-weight-normal">{key.comments}</h6>
                                    <div style={buttonStyle}>
                                        <a href={"/change/comment/" + key.comment_id} class="card-link"><h6>Edit Comment</h6></a>
                                        <form onSubmit={handleDeleteComments} style={deleteFormStyle}>
                                            <input type = "hidden" value = {key.comment_id} name = "comment_id"/>
                                            <input type = "submit" class="btn btn-primary" value = "Delete Comment"/>
                                        </form>
                                    </div>
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