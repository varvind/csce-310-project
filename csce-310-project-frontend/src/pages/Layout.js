import {Outlet, Link} from "react-router-dom"
import Cookies from 'js-cookie';
import React, { useState } from 'react';

const Layout = () => {
    const [inputs, setInputs] = useState({search:""});
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        window.location.href = `/search/items?query=${inputs.search}`
    }

    const logout = () => {
        console.log("hi")
        Cookies.remove('userId')
        window.location.href = '/';
    }

    const userId = Cookies.get('userId')
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <Link to='/' class="navbar-brand">MaroonLink</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                    <li class="nav-item active">
                        <Link class = "nav-link" to='/'>Home</Link>
                    </li>
                    { (userId == null) &&
                        <>
                        <li class="nav-item">
                            <Link class = "nav-link" to='/signup'>Sign Up</Link>
                        </li>
                        
                        <li class="nav-item">
                            <Link class = "nav-link" to='/login'>Login</Link>
                        </li>
                        </>
                    }
                    {   (userId != null) &&
                        <>
                            <li class="nav-item">
                                <Link class = "nav-link" to='/profile'>Profile</Link>
                            </li>
                            <li class="nav-item">
                                <Link class = "nav-link" to='/settings'>Settings</Link>
                            </li>
                            <li class="nav-item">
                                <Link class = "nav-link" to='/friends'>Friends</Link>
                            </li>
                            <li class="nav-item">
                                <Link class = "nav-link" to='/' onClick={logout}>Logout</Link>
                            </li>
                        </>
                    } 
                    </ul>
                    <form class="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
                        <input class="form-control mr-sm-2" type="search" placeholder="Find Friends" value = {inputs.search || ""} name = "search" aria-label="Search" onChange={handleChange}/>
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Find</button>
                    </form>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Layout