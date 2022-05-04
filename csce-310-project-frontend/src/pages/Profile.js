import React from 'react';
import styles from './css/profile.module.css'
import Cookies from 'js-cookie';

// Developed by Arvind V
// Admin features developed by Jason Hirsch
class Profile extends React.Component{

    constructor() {
        super()
        this.state = {
            first_name : null,
            last_name: null,
            profile_bio: null,
            username: null,
            isAdmin: false
        };
    }


    componentDidMount() {
        this.getUser()
        if(Cookies.get('adminId') != null) {
            this.setState({ isAdmin: true })
        }
    }

    // Get User Elements for Profile
    getUser = () => {
        let user_id = Cookies.get('userId')
        fetch(`http://localhost:4000/user/get/${user_id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState(
                {
                    first_name: responseJson.first_name,
                    last_name: responseJson.last_name,
                    profile_bio: responseJson.profile_bio,
                    username: responseJson.username
                })
        }).catch((error) => {
            console.error(error)
        })
    }

    // JSX Element
    render() {
        console.log(this.state)
        return(
            <>
            <div className = {styles.backsplash}> 
            </div>
            <center>
                <h2 className = {styles.name}>{this.state.first_name + " " + this.state.last_name}</h2>
                {
                    (this.state.isAdmin) &&
                    <h3 className = {styles.admin_text}>You are an Admin</h3>
                }
                <p className = {styles.profile_bio}>@{this.state.username}</p>
                <p className = {styles.profile_bio}>{this.state.profile_bio}</p>
            </center>
            </>
        )
    }
    
}


export default Profile