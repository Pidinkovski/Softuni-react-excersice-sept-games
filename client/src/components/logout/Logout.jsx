import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import UserContext from "../../contexts/UserContext";


export default function Logout() {

    const {onLogout , user} = useContext(UserContext)
    if(!user?.accessToken) {
        return
    }
     const navigate = useNavigate();

    useEffect(() => {
        async function handleLogout() {
            await onLogout()     
            navigate("/")       
        }

        handleLogout();
    }, []);
}