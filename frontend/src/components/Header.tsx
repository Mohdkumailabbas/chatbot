// import React from 'react'

import { AppBar, Box, Toolbar } from "@mui/material"
import Logo from "./shared/Logo"
import { useAuth } from "../context/AuthContext"
import Navlink from "./shared/Navlink"

const Header = () => {
  const auth =useAuth()
  const AuthLinks = () => {
    console.log(auth?.isLoggedIn,auth?.user)
    return auth?.isLoggedIn ? (
      <>
        <Navlink 
        bg="#51538f" 
        to="/chat" 
        text="Go to Chat" 
        textColor="white" />
        <Navlink
          bg="#51538f"
          textColor="white"
          to="/"
          text="Logout"
          onClick={auth.logout}
        />
      </>
    ) : (
      <>
        <Navlink bg="white" to="/login" text="Login" textColor="black" />
        <Navlink bg="white" textColor="black" to="/signup" text="Sign Up" />
      </>
    );
  };
  return (
    <AppBar sx={{bgcolor:"transparent", position:"static",}}>
      <Toolbar sx={{display:"flex",justifyContent: "space-between", width: "100%"}}>
       <Logo/>
       <Box sx={{ display: "flex", alignItems: "center",gap:2,marginRight:4 }}>
          <AuthLinks />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header ;