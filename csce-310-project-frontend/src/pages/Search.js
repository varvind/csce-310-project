import {useParams, useLocation} from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';


const Search = () => {
    const search = useLocation().search;
    const search_query = new URLSearchParams(search).get("query")
    console.log(search_query)

    const [searchResults, setResults] = useState({
        users: []
    })

    const getUsers = () => {
        fetch(`http://localhost:4000/user/search?name=${search_query}`)
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson)
            setResults(
            {
                users : responseJson
            })
        }).catch((error) => {
            console.error(error)
        })
    }
    useEffect(() => {
        getUsers()
    },[])
    
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