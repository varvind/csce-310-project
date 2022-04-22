import {useParams} from "react-router-dom";
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";


const ChangeStatus = () => {
    let [name, setName] = useState("")
    let [relationship, setRelationship] = useState("")
    let [new_relationship, setNewRelationship] = useState("")
    const navigate = useNavigate();


    let user_id = Cookies.get('userId')

    let { friend_id } = useParams();
    console.log(friend_id)

    const getRelationship = () => {
        fetch(`http://localhost:4000/friends/get/status/${user_id}/${friend_id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            setRelationship(responseJson.relationship)
        }).catch((error) => {
            console.error(error)
        })
    }

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
    

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setNewRelationship(value)
    }

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

    getName()
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