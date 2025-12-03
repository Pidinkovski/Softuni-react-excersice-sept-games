import { useNavigate } from "react-router"
import { useContext } from "react"

import useForm from "../../hooks/useForm"
import UserContext from "../../contexts/userContext"


const initialValues = {
    email : '',
    password : ''
}
export default function Login() {
    const navigate = useNavigate()

    const {onLoginHandler} = useContext(UserContext)

    const {
        data : currentData,
        formAction,
        dataSetterHandler
    } = useForm(onLogin , initialValues)

    function onLogin() {
        if(!currentData.email || !currentData.password) {
            return alert('All the field are required')
        }

        const currentUser = {
            email : currentData.email,
            password : currentData.password
        }

        onLoginHandler(currentUser)
        navigate('/')
        

    }
    return (
        <section id="login-page">

            <form id="login" action={formAction}>
                <div className="container">
                    <h1>Login</h1>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email"
                        onChange={dataSetterHandler}
                        value={currentData.email}
                        placeholder="Your Email"
                     />

                    <label htmlFor="login-pass">Password</label>
                    <input 
                        type="password" 
                        id="login-password" 
                        name="password" 
                        onChange={dataSetterHandler}
                        value = {currentData.password}
                        placeholder="Password"
                     />
                    <input type="submit" className="btn submit" value="Login" />
                </div>
            </form>
        </section>

    )
}