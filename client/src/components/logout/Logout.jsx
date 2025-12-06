import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import UserContext from "../../contexts/userContext.jsx"

export default function Logout() {

    const {onLogout , user} = useContext(UserContext)

     const navigate = useNavigate();

    useEffect(() => {
        async function handleLogout() {
            await onLogout(user)     
            navigate("/")       
        }

        handleLogout();
    }, []);
}