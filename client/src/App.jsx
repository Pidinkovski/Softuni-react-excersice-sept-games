import { Route, Routes } from "react-router"
import { useContext, useState } from "react"

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
import requester from "./utils/requester"
import UserContext from "./contexts/userContext"


function App() {
  const [user , setUser] = useState({})
  async function onRegisterHandler({email , password}) {
    const newUser = {email , password}
      const result = await requester('http://localhost:3030/users/register' , 'POST' , newUser)
      setUser(result)
  }

  function onLoginHandler({email}) {
    setUser({email})
  }

  function onLogout() {
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
    <Header user={user} />

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/games" element={<Catalog/>} />
      <Route path="/games/:id/details" element={<CardDetails user={user}/>} />
      <Route path="/games/:id/edit" element={<Edit />} />
      <Route path="/create" element={<Create/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login onLogin = {onLoginHandler}/>} />
      <Route path="/logout" element={<Logout onLogout={onLogout} />} />
    </Routes>

    <Footer />

    </UserContext.Provider>
  )
}

export default App
