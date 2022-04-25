import { useCookies } from 'react-cookie';
import React from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';


class Friends extends React.Component{
    constructor() {
        super()
        this.state = {
            friends : []
        };
        
    }


    componentDidMount() {
        this.getFriends()
    }

    getFriends = () => {
        let user_id = Cookies.get('userId')
        fetch(`http://localhost:4000/friends/get/${user_id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            var friends = []
            responseJson.forEach(element => {
                friends.push(element)
            });

            this.setState(
                {
                    friends : friends
                })
        }).catch((error) => {
            console.error(error)
        })
    }

    handleSubmit(user_id) {
        alert("hi")
    }


    render() {
        console.log(this.state.friends)
        const style = {
            width:"18rem",
            marginTop: "1%",
        }
        return(
            <>
                {this.state.friends.map((key, value) => {
                    return(
                        <>
                            <center>
                                <div class="card" style={style}>
                                    <div class="card-body">
                                        <h5 class="card-title">{key.first_name + " " + key.last_name}</h5>
                                        <a href={"/change/status/" + key.user_id} class="card-link">Change Status</a>
                                    </div>
                                </div>
                            </center>
                        </>
                    )
                })}
            </>
        )
    }
    
}


export default Friends