import Cookies from 'js-cookie';
import React, { useState, useEffect } from 'react';

const  YourPages = () => {
    const [state, setState] = useState({
        pages : []
    });
    const style = {
        width:"18rem",
        marginTop: "1%",
    }
    const adminId = Cookies.get('adminId')

    const getPages = () => {
        let adminId = Cookies.get('adminId')
        fetch(`http://localhost:4000/pages/get/${adminId}`)
        .then((response) => response.json())
        .then((responseJson) => {
            var pages = []
            responseJson.forEach(element => {
                pages.push(element)
            });
        }).catch((error) => {
            console.error(error)
        })
    }

    // Delete Friend Handler
    const handleDeletePage = async (e) => {
        console.log("deleting page")
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

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setPages(values => ({...values, [name]: value}))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        let response = await fetch(`http://localhost:4000/pages/create/${adminId}`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                "description": pages.description,
                "member_count": pages.member_count,
                "name": pages.name,
            })
        });

        if(response.status === 201) {
            response.text().then(async (page_id) => {
                alert("Successfully Created Page")
                // Cookies.set('page_id', page_id)
            })
        } else {
            alert("Unable to create page")
        }
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
                                    <h5 class="card-title">{key.name}</h5>
                                    <p class = "card-text">{key.description}</p>
                                    <p class = "card-text">Member Count: {key.member_count}</p>
                                    {/* need to figure out how to link to edit page */}
                                    <a href={"/change/status/" + key.adminId} class="card-link">Edit Page</a>
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
            <h3>Create Page</h3>
            <form onSubmit={handleSubmit}>
                <label>Page Name
                <input 
                    type="text" 
                    name="page_name"
                    class="form-control"
                    value={pages.name || ""} 
                    onChange={handleChange}
                />
                </label>
                <br/>
                <label>Description
                    <input 
                    type="text" 
                    name="description"
                    class="form-control"
                    value={pages.description || ""} 
                    onChange={handleChange}
                    />
                </label>
                <br/>
                <label>Member Count
                    <input 
                    type="text" 
                    name="member_count"
                    class="form-control"
                    value={pages.member_count || ""} 
                    onChange={handleChange}
                    />
                </label>
                <br/>
                <input type="submit" class="btn btn-primary" />
            </form>
            </center>
        </>
    )
}