// import React from 'react'

import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./pages/Home"
import Login from "./pages/login"
import Signup from "./pages/signup"
import Chat from "./pages/chat"
import Notfound from "./pages/Notfound"

const App = () => {
  return (
    <main>
      <Header/>
       <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/signup" element={<Signup/>}/>
         <Route path="/chat" element={<Chat/>}/>
         <Route path="*" element={<Notfound/>}/>
       </Routes>
    </main>
  )
}

export default App