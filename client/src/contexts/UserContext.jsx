import { createContext, useState } from "react"
import useRequest from "../hooks/useRequest"

const UserContext = createContext({
    user: {
        email: "",
        password: "",
        _createdOn: 0,
        _id: "",
        accessToken: ""
    },
    isAuthenticated: false,
    onRegisterHandler() { },
    onLoginHandler() { },
    onLogout() { }

})

export function UserProvider({
    children
}) {
    const [user, setUser] = useState(null)
    const { request } = useRequest()

    async function onRegisterHandler({ email, password }) {


        const newUser = { email, password }
        const result = await request('http://localhost:3030/users/register', 'POST', newUser)

        setUser(result)
    }

    async function onLoginHandler({ email, password }) {
        const result = await request('http://localhost:3030/users/login', 'POST', { email, password })
        setUser(result)
    }

    async function onLogout(currentUser) {
        await request('http://localhost:3030/users/logout', 'GET', {}, { accessToken: currentUser.accessToken })
        setUser(null)
    }
    const contextValues = {
        user,
        onRegisterHandler,
        onLoginHandler,
        onLogout,
        isAuthenticated: !!user?.accessToken,
    }

    return (
        <UserContext.Provider value={contextValues }>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext