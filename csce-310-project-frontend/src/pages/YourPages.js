import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";

// made and edited by the best coder in the team: Jakob Evangelista
const  YourPages = () => {
    const [state, setState] = useState({
        pages : []
    });

    const style = {
        width:"18rem",
        marginTop: "1%",
    }

    // get all pages
    const getPages = () => {
        let adminId = Cookies.get('adminId')
        fetch(`http://localhost:4000/pages/get/${adminId}`)
        .then((response) => response.json())
        .then((responseJson) => {
            var pagesList = []
            responseJson.forEach(element => {
                pagesList.push(element)
            });

            setState({
                pages : pagesList
            })
        }).catch((error) => {
            console.error(error)
        })
    }

    // delete page
    const handleDeletePage = async (e) => {
        e.preventDefault()
        const inputs = Object.values(e.target)
        .filter(c => typeof c.tagName === 'string' && c.tagName.toLowerCase() === 'input')
        .reduce((acc, curr) => ({ ...acc, [curr.name]: curr.value }), {});
        const page_id = inputs.page_id

        axios.delete(`http://localhost:4000/pages/delete/${page_id}`).then((response) => {
            if(response.status === 200) {
                alert('Successully Removed Page')
                window.location.href = '/yourpages'
            } else {
                alert('Error in Deleting Page')
                window.location.href = '/yourpages'
            }
        })
    }

    // Ensure state change happens only once
    useEffect(() => {
        getPages()
    },[])

    return (
        <>
            <center>
            <h3>Your Pages</h3>
            {state.pages.map((key, value) => {
                return(
                    <>
                        <center>
                            <div class="card" style={style}>
                                <div class="card-body">
                                    <h5 class="card-title">{key.page_name}</h5>
                                    <p class = "card-text">{key.description}</p>
                                    <p class = "card-text">Member Count: {key.member_count}</p>
                                    {/* need to figure out how to link to edit page */}
                                    <a href={"/editpage/" + key.page_id} class="card-link">Edit Page</a>
                                    <a href={"/pageevents/" + key.page_id} class="card-link">Page Events</a>
                                    <form onSubmit={handleDeletePage} style ={{}}>
                                            <input type = "hidden" value = {key.page_id} name = "page_id"/>
                                            <input type="submit" class="btn btn-primary" value = "Delete Page"/>
                                    </form>
                                </div>
                            </div>
                        </center>
                    </>
                )
            })}
            </center>
        </>
    )
}

export default YourPages