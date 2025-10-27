import React from "react";
import Profile from "../components/Profile";
import { auth } from "../firebase.js";

export default function ProfilePage() {
  const user = auth.currentUser;
  return <Profile user={user} />;
}