import { useEffect } from "react";
import { Navigate } from "react-router";

export default function Logout({ onLogout }) {

    useEffect(() => {
        onLogout()
    }, []);

    return <Navigate to="/" />;
}