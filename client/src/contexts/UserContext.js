import { createContext } from "react"

const UserContext = createContext({
    user : {
            email: "",
            password: "",
            _createdOn: 0,
            _id: "",
            accessToken: ""
        },
        isAuthenticated : false,
        onRegisterHandler() {},
        onLoginHandler() {},
        onLogout() {}

}) 

export default UserContext