import { useCookies } from 'react-cookie';
import React from 'react';
import styles from './css/profile.module.css'


class Profile extends React.Component{

    constructor() {
        super()
        this.state = {
            first_name : null,
            last_name: null,
            profile_bio: null
        };
    }


    componentWillMount() {
        this.getUser()
    }

    getUser = () => {
        fetch(`http://localhost:4000/user/get/${16}`)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState(
                {
                    first_name: responseJson.first_name,
                    last_name: responseJson.last_name,
                    profile_bio: responseJson.profile_bio
                })
        }).catch((error) => {
            console.error(error)
        })
    }


    render() {
        return(
            <>
            <div className = {styles.backsplash}>
                
            </div>
            <center>
                <h2 className = {styles.name}>{this.state.first_name + " " + this.state.last_name}</h2>
                <p className = {styles.profile_bio}>{this.state.profile_bio}</p>
            </center>
            </>
        )
    }
    
}


export default Profile