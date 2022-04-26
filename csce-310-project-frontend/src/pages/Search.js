import {useLocation} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

// Developed by Arvind V.
const Search = () => {
    const search = useLocation().search;
    const search_query = new URLSearchParams(search).get("query")
    const user_id = Cookies.get('userId')
    const [searchResults, setResults] = useState({
        users: []
    })

    // Search Users
    const getUsers = () => {
        fetch(`http://localhost:4000/user/search?name=${search_query}`)
        .then((response) => response.json())
        .then((responseJson) => {
            for (let x=0; x < responseJson.length; x++) {
                if(String(responseJson[x].user_id) === user_id) {
                    responseJson.splice(x,1)
                }
            }
            setResults(
            {
                users : responseJson
            })
        }).catch((error) => {
            console.error(error)
        })
    }

    // Make sure state updates only one
    useEffect(() => {
        getUsers()
    },[])
    
    // JSX Element
    return (
        <>
        <center>
        <h1>Search</h1>
            {
                searchResults.users.map((user, value) => {
                    return(
                        <>
                        <a href={`/profile/${user.user_id}`}>
                            <div class="card" style = {{width : "18rem", marginTop:"1%"}} >
                                <div class="card-body">
                                    <h5 class="card-title">{user.first_name + " " + user.last_name}</h5>
                                </div>
                            </div>
                        </a>
                        </>
                    )
                })
            }
        </center>
        </>
    )
}

export default Search