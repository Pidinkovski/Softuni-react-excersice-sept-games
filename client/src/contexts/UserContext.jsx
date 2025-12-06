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

    const [user, setUser] = useState(() => {
        const currentUser = localStorage.getItem('auth')
        if(!currentUser) {
            return null
        }
        
        try {
            return JSON.parse(currentUser)
        }catch {
            return null
        }
    })

    const setUserData = (user) => {
        if (user) {
            const userToSet = {
                email : user.email,
                accessToken : user.accessToken,
                _id : user._id,
                _createdOn : user._createdOn
            }
            localStorage.setItem('auth', JSON.stringify(userToSet))
            
        } else {
            localStorage.removeItem('auth')
        }
        setUser(user)

    }
    const { request } = useRequest()

    async function onRegisterHandler({ email, password }) {


        const newUser = { email, password }
        const result = await request('http://localhost:3030/users/register', 'POST', newUser)

        setUserData(result)
    }

    async function onLoginHandler({ email, password }) {
        try{
            const result = await request('http://localhost:3030/users/login', 'POST', { email, password })
            setUserData(result)
        } catch (err) {
            alert(err.message)
        }
        
    }

    async function onLogout(currentUser) {
        await request('http://localhost:3030/users/logout', 'GET', null, {accessToken : currentUser.accessToken })
        localStorage.clear()
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
        <UserContext.Provider value={contextValues}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext