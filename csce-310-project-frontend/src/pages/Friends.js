import { useCookies } from 'react-cookie';
import React from 'react';

class Friends extends React.Component{

    constructor() {
        super()
        this.state = {
            
        };
    }


    componentWillMount() {
        this.getFriends()
    }

    getFriends = () => {

    }


    render() {
        return(
            <h2>friends</h2>
        )
    }
    
}


export default Friends