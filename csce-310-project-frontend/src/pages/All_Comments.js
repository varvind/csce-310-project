import React, {useState, useEffect} from 'react';
import styles from './css/comments.module.css';
import Cookies from 'js-cookie';
import axios from 'axios'

// developed by Joshua Kim
const All_Comments = () => {
    const [state, setState] = useState( {
        comments: []
    });
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
            })
            
            setState({
                comments : commentList
            })
        }).catch((error) => {
            console.error(error)
        })
    }

    const deleteComments = async (e) => {
        console.log("Deleting Comment")
        e.preventDefault()
        let comment_id = prompt('Enter comment id');
        
        axios.delete(`http://localhost:4000/comments/delete/${user_id}/${comment_id}`).then((response) => {
            if (response.status === 200) {
                alert('Successfully deleted comment')
                window.location.href = '/comments'
            } else {
                alert('Error in deleting comment')
                window.location.href='/comments'
            }
        })
    }

    const updateCommnets = async (e) => {
        console.log("Editing comment")
        e.preventDefault()
        let comment_id = prompt('Enter comment id');
        
        axios.post(`http://localhost:4000/comments/update/${user_id}/${comment_id}`).then((response) => {
            if (response.status === 200) {
                alert('Successfully edited comment')
                window.location.href = '/comments'
            } else {
                alert('Error in editing comment')
                window.location.href='/comments'
            }
        })
    }

    useEffect(() => {
        getComments()
    }, [])

    return (
        <center>
            
        </center>
    /*
    <center>

        <h2>
            {user.first_name + " " + user.last_name}
                
        </h2>
        { showButton && 
            <form onSubmit={handleSubmit} style ={{}}>
                    <input type="submit" class="btn btn-primary" value = "Add Friend"/>
            </form>
        }
        <p className = {styles.profile_bio}>@{user.username}</p>
        <p className = {styles.profile_bio}>{user.profile_bio}</p>
    </center>
    */
    )
}

export default All_Comments