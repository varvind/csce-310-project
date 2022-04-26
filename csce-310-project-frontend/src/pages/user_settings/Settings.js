import styles from "../css/user_settings.module.css"
import React, { useState } from 'react';
import ProfileSettings from './ProfileSettings'
import PasswordSettings from './PasswordSettings'
import DeleteProfile from "./DeleteProfile";

// Developed by Arvind V.
const Settings = () => {
    let [choice, setState] = useState("Profile")

    // Change Render Based on Button Press
    const changeRender = (event) => {
        choice = event.target.innerText
        setState(choice)  
    }

    // JSX Element
    return (
        <>
            <center>
                <div class="container" style={{marginTop:"5%"}}>
                    <div class="row">
                        <div class="col-sm-5">
                            <div className= {styles.vertical_menu} >
                                <a onClick={changeRender} class="active">Profile</a>
                                <a onClick={changeRender} >Password Reset</a>
                                <a onClick={changeRender} >Delete Profile</a>
                            </div>
                        </div>
                        <div class = "col-sm-3">
                            { choice === "Profile" && <ProfileSettings/>}
                            { choice === "Password Reset" && <PasswordSettings/>}
                            { choice === "Delete Profile" && <DeleteProfile/>}
                        </div>
                        
                    </div>
                </div>
            </center>
        </>
        
    )
}


export default Settings