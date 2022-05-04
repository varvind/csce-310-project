import React, {useState, useEffect} from 'react';
import styles from './css/profile.module.css'
import {useParams} from "react-router-dom";
import Cookies from 'js-cookie';

// Developed by Arvind V.
const UserProfile = () => {
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        profile_bio: "",
        username: ""
    })
    const [showButton, setState] = useState(false)
    const loggedInUserId = Cookies.get('userId')
    const { user_id } = useParams();

    // Get User Profile
    const getUser = () => {
        fetch(`http://localhost:4000/user/get/${user_id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            setUser(
                {
                    first_name: responseJson.first_name,
                    last_name: responseJson.last_name,
                    profile_bio: responseJson.profile_bio,
                    username: responseJson.username
                })
        }).catch((error) => {
            console.error(error)
        })
    }

    // Check to see if Friends with this User
    const verifyIfFriendExists = () => {
        if(!loggedInUserId) {
            setState(false)
        } else {
            fetch(`http://localhost:4000/friends/get/status/${loggedInUserId}/${user_id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                if(Object.keys(responseJson).length === 0) {
                    setState(true)
                }
            }).catch((error) => {
                console.error(error)
            })
        } 
    }

    // Form Submit Handler
    const handleSubmit = async () => {
        if(!loggedInUserId) {
            alert('Must Be Signed in To Add Friends')
        } else {
            fetch(`http://localhost:4000/friends/create/request/${loggedInUserId}/${user_id}`, {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
            }).then((response) => {
                console.log(response)
                if(response.status === 201) {
                    alert('Friend Request Added')
                    window.location.href = '/friends';
                } else {
                    alert("Friend Request Pending")
                }
            });
            
        }
    }

    // Make sure state change happens only once
    useEffect(() => {
        getUser()
        verifyIfFriendExists()
    },[])

    // JSX Element
    return(
        <>
        <div className = {styles.backsplash}> 
        </div>
        
        <center>

            <h2 className = {styles.user_name}>
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
        </>
    )
}

export default UserProfile