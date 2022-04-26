import React, {useState, useEffect,} from 'react';
import Cookies from 'js-cookie';
import axios from 'axios'

// Developed by Arvind V.
const  Friends  = () => {
    const [state, setState] = useState( {
        friends : [],
        requests: []
    });
    const style = {
        width:"18rem",
        marginTop: "1%",
    }
    let user_id = Cookies.get('userId')
    
    // Get All Friends for the User
    const getFriends = () => {
        let user_id = Cookies.get('userId')
        fetch(`http://localhost:4000/friends/get/${user_id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            var friends = []
            responseJson.forEach(element => {
                friends.push(element)
            });
            fetch(`http://localhost:4000/friends/get/requests/${user_id}`)
            .then((response) => response.json())
            .then((responseJson) => {
                setState(
                    {
                        friends : friends,
                        requests: responseJson
                    })
            }).catch((error) => {
                console.error(error)
            })
        }).catch((error) => {
            console.error(error)
        })
    }

    // Delete Friend Handler
    const handleDeleteFriend = async (e) => {
        console.log("deleting friends")
        e.preventDefault()
        const inputs = Object.values(e.target)
        .filter(c => typeof c.tagName === 'string' && c.tagName.toLowerCase() === 'input')
        .reduce((acc, curr) => ({ ...acc, [curr.name]: curr.value }), {});
        const friend_id = inputs.friend_id

        axios.delete(`http://localhost:4000/friends/delete/${user_id}/${friend_id}`).then((response) => {
            if(response.status === 200) {
                alert('Successully Removed Friend')
                window.location.href = '/friends'
            } else {
                alert('Error in Deleting Friend')
                window.location.href = '/friends'
            }
        })
    }

    // Form Handler
    const handleSubmit = async (e) => {
        e.preventDefault()
        const inputs = Object.values(e.target)
        .filter(c => typeof c.tagName === 'string' && c.tagName.toLowerCase() === 'input')
        .reduce((acc, curr) => ({ ...acc, [curr.name]: curr.value }), {});
        let requested_id = inputs.requested_id

        let response = await fetch('http://localhost:4000/friends/add', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                 "requested_id": requested_id,
                 "user_id": user_id
            })
         });

        if(response.status === 201) {
            alert("Successfully Added Friend")
            window.location.href='/friends'
        } else {
            alert("Unable to Add Friend")
            window.location.href='/friends'
        }
    }

    // Ensure state change happens only once
    useEffect(() => {
        getFriends()
    },[])

    // JSX Element
    return(
        <>
            <center>
            <h3>Friends</h3>
            {state.friends.map((key, value) => {
                return(
                    <>
                        <center>
                            <div class="card" style={style}>
                                <div class="card-body">
                                    <h5 class="card-title">{key.first_name + " " + key.last_name}</h5>
                                    <a href={"/change/status/" + key.user_id} class="card-link">Change Status</a>
                                    <form onSubmit={handleDeleteFriend} style ={{}}>
                                            <input type = "hidden" value = {key.user_id} name = "friend_id"/>
                                            <input type="submit" class="btn btn-primary" value = "Delete Friend"/>
                                    </form>       
                                </div>
                            </div>
                        </center>
                    </>
                )
            })}
            <h3>Friend Requests</h3>
            {
                state.requests.map((key, value) => {
                    return(
                        <>
                            <center>
                                <div class="card" style={style}>
                                    <div class="card-body">
                                        <h5 class="card-title">@{key.username}</h5>
                                            <form onSubmit={handleSubmit} style ={{}}>
                                                <input type = "hidden" value = {key.user_id} name = "requested_id"/>
                                                <input type="submit" class="btn btn-primary" value = "Add Friend"/>
                                            </form>                                         </div>
                                </div>
                            </center>
                        </>
                    )
                })
            }
            </center>
        </>
    )
    
}


export default Friends