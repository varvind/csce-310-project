import Cookies from 'js-cookie';
import React, { useState } from 'react';

export default function YourPages(props) {
    const [pages, setPages] = useState([]);
    const adminId = Cookies.get('adminId')

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

    return (
        <div className="d-flex">
            <center>
                <h3>Your Pages</h3>
                {pages.map(page => {
                    return (
                        <React.Fragment>
                            <a href={"/page/" + page.page_id}>{page.page_id}</a>
                            <p>{page.name}</p>
                            <p>{page.description}</p>
                            <p>{page.member_count} members</p>
                        </React.Fragment>
                    );
                })}
            </center>
            <center>
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
                    <label>description
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
        </div>
    );
}