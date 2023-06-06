import {useState, createContext, useEffect} from "react";

const UserContext = createContext({});

const UserProvider = ({ children, setLoading }) => {
    const [users, setUsers] = useState([]);
    const [currentUser, serCurrentUser] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        fetch('/me')
        .then(resp => resp.json())
        .then(data => {
            if(!data.errors) {
                loginUser(data)
            } else {
                setLoading(false);
            }
        })
    }, [setLoading])

    useEffect(() => {
        if(loggedIn) {
            fetch("/users")
            .then(resp => resp.json())
            .then(data => {
                setUsers(data)
                setLoading(false);
            })
        }
    }, [loggedIn, setLoading])

    const loginUser = user => {
        serCurrentUser(user);
        setLoggedIn(true)
    }

    const logoutUser = () => {
        serCurrentUser(null);
        setLoggedIn(false);
    }

    const addUser = user => {
        setUsers([...users, user])
    }

    return <UserContext.Provider value={{ users, loggedIn, currentUser, addUser, loginUser, logoutUser }}>{ children }</UserContext.Provider>
}

export { UserContext, UserProvider };