import { useContext } from "react"
import { Link } from "react-router"
import UserContext from "../../contexts/userContext.jsx"
export default function Header() {
    const {isAuthenticated} = useContext(UserContext)
    return (
        <header>
            <nav>
                <Link className="home" to="/"> <img src="./images/logo.png" alt="logo" /> </Link>
                <Link to="/games">Catalog</Link>

                {isAuthenticated 
                ? (<div id="user">
                        <Link to="/create">Add Game</Link>
                        <Link to="/logout">Logout</Link>
                    </div>)
                : (<div id="guest">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>)
        }
            </nav>
        </header>

    )
}