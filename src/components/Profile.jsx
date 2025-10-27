import React from "react";
import { auth } from "../firebase.js";
import dice20 from "../assets/dice20.png";
import "../css_modules/Profile.css";
import Navbar from "./Navbar.jsx";
import ProfileBox from "./ProfileBox.jsx";

export default function Profile({ user }) {
  const u = user ?? auth.currentUser ?? {};
  const username = u.username ?? (u.email ? u.email.split("@")[0] : "");
  const displayName = u.displayName ?? "";
  const email = u.email ?? "";

  return (
    <div> 
      <Navbar />
      <ProfileBox user={{ username, displayName, email }} />  
    
    </div>
  );
}