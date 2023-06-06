import React, {useState, useEffect, useContext} from "react";
import { ErrorsContext } from "../context/ErrorsContext";
import { UserContext } from "../context/UserContext";
import { useHistory } from "react-router-dom";

const Login = ({ loading }) => {
    const {setErrors} = useContext(ErrorsContext);
    const { loginUser, loggedIn } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useHistory();

    useEffect(() => {
        if(!loading && loggedIn) {
            navigate.push('/')
        }
        return () => {
            setErrors([])
        }
    }, [loading, loggedIn, navigate, setErrors])

    const handleSubmit = e => {
        e.preventDefault();
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password})
        })
        .then(resp => resp.json())
        .then(data => {
            if(data.errors) {
                setErrors(data.errors);
            } else {
                loginUser(data)
                setErrors([])
                navigate.push("/blogs")
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3>Login</h3>

            <div>
                Username &nbsp;
                <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={ e => setUsername(e.target.value) }
                required={true}
                />
            </div>
            <div>
                Password &nbsp;
                <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={ e => setPassword(e.target.value) }
                required={true}
                />
            </div>

            <input type="submit" value="login" />
        </form>
    )
}

export default Login;