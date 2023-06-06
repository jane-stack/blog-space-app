import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const { loggedIn, logoutUser, currentUser } = useContext(UserContext);

    const handleLogout = () => {
        fetch('/logout', {
            method: "DELETE"
        })
        logoutUser();
    }

    const loggedInLinks = () => {
        return (
            <>
            {/* <li>{ currentUser.username }</li> */}
            <li><NavLink to="/blogs">Blogs</NavLink></li>
            <li><NavLink to="/blogs/new">Create Blogs</NavLink></li>
            <li><NavLink to="#" onClick={handleLogout}>Logout</NavLink></li>
            </>
        )
    }

    const loggedOutLinks = () => {
        return (
            <>
            <li><NavLink to="/signup">Signup</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
            </>
        )
    }

    return (
        <ul>
            <li><NavLink to="/">Home</NavLink></li>
            { loggedIn ? loggedInLinks() : loggedOutLinks() }
        </ul>
    )
}

export default Navbar;