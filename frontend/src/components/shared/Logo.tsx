// import React from 'react'

import { Typography } from "@mui/material"
import { Link } from "react-router-dom"

// 
const Logo = () => {
  return (
    <div className="flex items-center gap-[8px] mr-auto">
      <Link to={"/"}>
       <img src="openai.png" alt="opneai" width={'30px'} height={'30px'} className="image-inverted"></img>
      </Link>
      <Typography sx={{display:{ md:"block",sm:"none" ,xs:"none",mr:"auto",fontWeight :"800", textShadow:"2px 2px 20px #000", lineHeight: 1 }}}>
        <span className="font-semibold text-red-600">Cerebro</span>-GPT
       </Typography>
    </div>
  )
}

export default Logo