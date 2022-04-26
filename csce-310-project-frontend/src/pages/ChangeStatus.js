import {useParams} from "react-router-dom";
import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

// Developed by Arvind V.
const ChangeStatus = () => {
    let [name, setName] = useState("")
    let [relationship, setRelationship] = useState("")
    let [new_relationship, setNewRelationship] = useState("")
    const navigate = useNavigate();
    let user_id = Cookies.get('userId')
    let { friend_id } = useParams();

    // Get Current User Relationship with This Person to determine
    // whether or not to render add friend button
    const getRelationship = () => {
        fetch(`http://localhost:4000/friends/get/status/${user_id}/${friend_id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            setRelationship(responseJson.relationship)
        }).catch((error) => {
            console.error(error)
        })
    }

    // Get friends name
    const getName = () => {
        fetch(`http://localhost:4000/user/get/${friend_id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            setName(responseJson.first_name + " " + responseJson.last_name)
            getRelationship()
        }).catch((error) => {
            console.error(error)
        })
    }
    
    // form change handler
    const handleChange = (event) => {
        const value = event.target.value;
        setNewRelationship(value)
    }

    // for submit handler
    const handleSubmit = async (event) => {
        event.preventDefault();
        let response = await fetch(`http://localhost:4000/friends/update/status/${user_id}/${friend_id}`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                status: new_relationship
            })
         });

        if(response.status === 201) {
            navigate('/friends')
        } else {
            navigate(`/change/status/${friend_id}`)
        }
    }

    // Make sure state change runs only once
    useEffect(() => {
        getName()
    },[])

    // JSX Element
    return (
        <>
            <a href = '/friends'> Back to Friends Page</a>
            <center>
                <h2>Change Status for friend {name}</h2>
                <h4>Current Relationship: {relationship}</h4>
                <form onSubmit={handleSubmit}>
                    <label>New Relationship
                    <select value={new_relationship} onChange={handleChange}>
                        <option value = ""></option>
                        <option value="Family">Family</option>
                        <option value="Work">Work</option>
                        <option value="Friend">Friend</option>
                    </select>
                    </label>
                    <br/>
                    <input type="submit" class="btn btn-primary" />
                </form>
            </center>
        </>
    )
}

export default ChangeStatus