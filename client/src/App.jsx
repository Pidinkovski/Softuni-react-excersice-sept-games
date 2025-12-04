import { Route, Routes } from "react-router"
import { useState } from "react"

import Header from "./components/header/Header"
import Footer from "./components/footer/Footer"
import Home from "./components/home/Home"
import Catalog from "./components/catalog/Catalog"
import CardDetails from "./components/card-details/CardDetails"
import Create from "./components/create/Create"
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import Logout from "./components/logout/Logout"
import Edit from "./components/edit/Edit"
import UserContext from "./contexts/userContext"
import useRequest from "./hooks/useRequest"


function App() {
  const [user , setUser] = useState(null)
  const { request } = useRequest()

  async function onRegisterHandler({email , password}) {


    const newUser = {email , password}
      const result = await request('http://localhost:3030/users/register' , 'POST' , newUser)
      console.log(result);
      
      setUser(result)
  }

  async function onLoginHandler({email , password}) {
     const result = await request('http://localhost:3030/users/login', 'POST' , {email , password})
     setUser(result)
  }

  async function onLogout(currentUser) {
    await request('http://localhost:3030/users/logout','GET', {} , {accessToken : currentUser.accessToken})
    setUser(null)
  }
  const contextValues = {
    user ,
    onRegisterHandler,
    onLoginHandler ,
    onLogout,
    isAuthenticated : !!user?.accessToken,
  }

  return (
    <UserContext.Provider value={contextValues}>
    <Header/>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/games" element={<Catalog/>} />
      <Route path="/games/:id/details" element={<CardDetails user={user}/>} />
      <Route path="/games/:id/edit" element={<Edit />} />
      <Route path="/create" element={<Create/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout/>} />
    </Routes>

    <Footer />

    </UserContext.Provider>
  )
}

export default App
