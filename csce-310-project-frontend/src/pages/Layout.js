import {Outlet, Link} from "react-router-dom"
import { useCookies } from 'react-cookie';
const Layout = () => {

    const [cookies, setCookie] = useCookies(['user']);

    const logout = (e) => {

        cookies.remove('userId');
        window.location.href = '/';
        return false;
    }


    const userId = cookies.userId
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
                                <Link class = "nav-link" to='/friends'>Friends</Link>
                            </li>
                            <li class="nav-item">
                                <Link class = "nav-link" to='/logout'>Logout</Link>
                            </li>
                        </>
                    } 
                    </ul>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default Layout