import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import Hero from './components/Hero'
import NewsCards from './components/NewsCards'
import Home from './Pages/Home'
import Login from './components/Login'
import RegisterPage from './components/RegisterPage'
import ReactDom from 'react-dom/client'
import { createBrowserRouter ,BrowserRouter, Routes, Route, RouterProvider   } from 'react-router-dom'


export default function App() {
  const router = createBrowserRouter([{
    path: "/",
    element: <Home/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",
    element: <RegisterPage/>  
  }])
  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

