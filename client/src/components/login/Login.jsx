import { useState } from "react"
import { useNavigate } from "react-router"

const initialValues = {
    email : '',
    password : ''
}
export default function Login({
    onLogin,
    registeredUsers
}) {
    const navigate = useNavigate()
    const [currentData , setCurrentData] = useState(initialValues)
     function onChangeHandler(e){
        setCurrentData(state => ({
            ...state,
            [e.target.name] : e.target.value
        }))
    }

    function loginHandler() {
        if(!currentData.email || !currentData.password) {
            return alert('All the field are required')
        }
        const user = registeredUsers.find(user => user.email === currentData.email)

        if(!user) {
            return alert('Invalid email or password')
        }

        if(user && user.password !== currentData.password) {
            return alert('Invalid name or password')
        }
        const logedUser = {email :currentData.email}
        onLogin(logedUser)
        navigate('/')
        

    }
    return (
        <section id="login-page">

            <form id="login" action={loginHandler}>
                <div className="container">
                    <h1>Login</h1>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email"
                        onChange={onChangeHandler}
                        value={currentData.email}
                        placeholder="Your Email"
                     />

                    <label htmlFor="login-pass">Password</label>
                    <input 
                        type="password" 
                        id="login-password" 
                        name="password" 
                        onChange={onChangeHandler}
                        value = {currentData.password}
                        placeholder="Password"
                     />
                    <input type="submit" className="btn submit" value="Login" />
                </div>
            </form>
        </section>

    )
}