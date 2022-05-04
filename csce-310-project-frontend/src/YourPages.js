import Cookies from 'js-cookie';
import React, { useState } from 'react';

export default function YourPages(props) {
    const [pages, setPages] = useState([]);
    const adminId = Cookies.get('adminId')

    const handleSubmit = async (event) => {
        event.preventDefault();

        let response = await fetch('http://localhost:4000/pages/create/${adminId}', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({})
        });
        if(response.status === 201) {}
    }

    return (
        <div className="d-flex">
            <center>
                <h3>Your Pages</h3>
                {pages.map(page => {
                    return (
                        <React.Fragment>
                            <a href={"/page/" + page.page_id}>{page.page_id}</a>
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
                        value={""} 
                        onChange={() => {}}
                        />
                    </label>
                    <input type="submit" class="btn btn-primary" />
                </form>
            </center>
        </div>
    );
}