import { useContext, useEffect } from "react";
import { Navigate } from "react-router";
import UserContext from "../../contexts/userContext.jsx"

export default function Logout() {

    const {onLogout , user} = useContext(UserContext)

    useEffect(() => {
        
        onLogout(user)
    }, []);

    return <Navigate to="/" />;
}