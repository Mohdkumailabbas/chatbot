import { Link } from "react-router-dom";

// import React from 'react'
type Props={
    to:string;
    bg:string;
    text:string;
    textColor:string;
    onClick?:()=> Promise<void>
}
const Navlink = (props:Props) => {
  return (
    <Link 
     to={props.to} style={{background:props.bg, color:props.textColor,  padding: "8px 16px",borderRadius: "4px",
      textDecoration: "none",
      fontWeight: "bold",
      transition: "all 0.3s ease",

     }}>{props.text}
     
     </Link>
  ) 
}

export default Navlink