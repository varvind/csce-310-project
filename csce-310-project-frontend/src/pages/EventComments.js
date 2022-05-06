import React, {useState, useEffect} from 'react';
import Cookies from 'js-cookie';

const EventComments = () => {
    // initialize states
    const [state, setState] = useState( {
        comments: []
    });

    // create styles
    const style = {
        width: "60rem",
        marginTop: "1%"
    }

    // initialize variables
    const user_id = Cookies.get('userId');

    const getComments = () => {
        
    }

    return(
        <>
            <a href = '/'> Back to Home Page</a>
            { (user_id == null) &&
                <>

                </>
            }
            { (user_id != null) &&
                <>

                </>
            }
        </>
    )
}

export default  EventComments