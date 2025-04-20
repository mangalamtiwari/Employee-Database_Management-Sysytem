import { redirect } from 'next/navigation';
import React from 'react'

function Navbar() {
  // redirect("/home");
  return (
    <div style={{alignItems: "center", justifyContent: "center", display: "flex", height: "60px", backgroundColor: "#f0f0f6"}}>
      This is Navbar
    </div>
  )
}

export default Navbar
