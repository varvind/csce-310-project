import React, { useEffect } from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import {useParams} from "react-router-dom";


// made and edited by the best coder in the team: Jakob Evangelista
// all member features made by the even better coder Jason Hirsch
const EditPage = () => {
    const [inputs, setInputs] = useState({});
    const [members, setMembers] = useState([]);
    const [admins, setAdmins] = useState([]);
    const navigate = useNavigate();
    const {page_id} = useParams();

    useEffect(() => {
        getMembers()
    },[])

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const searchAdmins = async (event) => { //Backend request to search for admin users to add as members
        const search = event.target.value
        if(search === "") {
            setAdmins([])
            return
        }
        let response = await fetch(`http://localhost:4000/members/getadmins/${search}`)
        const json = await response.json();
        setAdmins(json)
    }

    const addMember = async (event) => { //Add admin member using backend request
        const admin_id = event.target.value
        let response = await fetch(`http://localhost:4000/members/add`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                 page_id: page_id,
                 admin_id: admin_id
            })
        })
        getMembers();
    }

    const deleteMember = async (event) => { //Delete admin member using backend request
        const admin_id = event.target.value
        let response = await fetch(`http://localhost:4000/members/delete`, {
            method: 'DELETE',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                 page_id: page_id,
                 admin_id: admin_id
            })
        })
        getMembers();
    }

    const getMembers = async () => { //Get all current admin members
        let response = await fetch(`http://localhost:4000/members/get/${page_id}`);
        const json = await response.json();
        setMembers(json);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let response = await fetch(`http://localhost:4000/pages/update/${page_id}`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                 "name": inputs.page_name,
                 "description": inputs.description
            })
         });
        if(response.status === 201) {
            alert("Page Updated")
            navigate('/yourpages')
        } else {
            response.text().then((result) => {
                alert(result)
                navigate('/editpage')
            })
        }
    }

    return (
    <>
        <center>
        <h3>Edit Page</h3>
        <form onSubmit={handleSubmit}>
            <label>Page Name
            <input 
                type="text" 
                name="page_name"
                class="form-control" 
                value={inputs.page_name || ""} 
                onChange={handleChange}

            />
            </label>
            <br/>
            <label>Description
            <input 
                type="text" 
                name="description"
                class="form-control" 
                value={inputs.description || ""} 
                onChange={handleChange}

            />
            </label>
            <br/>
            <input type="submit" class="btn btn-primary" />
        </form>
        <br />

        <p>Page Members</p>
        {members.map(member => {
            return (
                <React.Fragment key={member.admin_id}>
                    <p style={{ display: "inline", marginRight: "1rem" }}>{member.username}</p>
                        <button value={member.admin_id} onClick={deleteMember}>Delete Member</button>
                    <br />
                </React.Fragment>
            );
        })}
        <br />
        
        <p>Search Admins to Add Members</p>
        <input type="text" onChange={searchAdmins} />
        <br />
        {admins.map(admin => {
            return (
                <React.Fragment key={admin.admin_id}>
                    <p style={{ display: "inline", marginRight: "1rem" }}>{admin.username}</p>
                    <button value={admin.admin_id} onClick={addMember}>Add Member</button>
                    <br />
                </React.Fragment>
            );
        })}
        </center>
    </>
    )
}

export default EditPage