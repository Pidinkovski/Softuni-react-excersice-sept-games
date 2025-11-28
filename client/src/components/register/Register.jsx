import {useState} from  'react'
import { useNavigate } from 'react-router';


const initialValues = {
    email : "",
    password : "",
    rePass : ""
}
export default function Register({
    onRegister
}) {
    const navigate = useNavigate()
    const [data , setData] = useState(initialValues);

    const dataSetterHandler = (e) => {
        setData(state => ({
            ...state,
            [e.target.name] : e.target.value
        }));
    }
    function onClickRegister() {
        if(!data.email || !data.password || !data.rePass) {
            return alert('All the field are required')
        }

        if(data.email.length < 5) {
           return alert('Email should be at least 5 characters long')
        }

        if(data.password !== data.rePass) {
           return alert('Passwords missmatch!')
        }
        
        const newUser = {
            email : data.email,
            password : data.password
        }
        
        onRegister(newUser)
        navigate('/')
        
    }

    return (

        <section id="register-page" className="content auth">
            <form id="register" action={onClickRegister}>
                <div className="container">
                    <div className="brand-logo"></div>
                    <h1>Register</h1>

                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email"
                        id="email"
                        name="email"
                        value={data.email}
                        onChange = {dataSetterHandler}
                        placeholder="Your Email"
                            />

                    <label htmlFor="pass">Password:</label>
                    <input 
                        type="password" 
                        name="password" 
                        onChange = {dataSetterHandler}
                        value={data.password}
                        id="register-password" 
                        placeholder="Password" 
                    />

                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input 
                    type="password" 
                    name="rePass" 
                    onChange = {dataSetterHandler}
                    value={data.rePass}
                    id="confirm-password" 
                    placeholder="Repeat Password"
                     />

                    <input className="btn submit" type="submit" value="Register" />
                </div>
            </form>
        </section>

    )
}