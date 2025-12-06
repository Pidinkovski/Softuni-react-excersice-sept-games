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

import { UserProvider } from "./contexts/UserContext"


function App() {

  return (
    <UserProvider >
    <Header/>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/games" element={<Catalog/>} />
      <Route path="/games/:id/details" element={<CardDetails/>} />
      <Route path="/games/:id/edit" element={<Edit />} />
      <Route path="/create" element={<Create/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout/>} />
    </Routes>

    <Footer />

    </UserProvider>
  )
}

export default App
