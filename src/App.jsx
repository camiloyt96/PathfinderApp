import './App.css'
import Home from './Pages/Home'
import Login from './components/Login'
import RegisterPage from './components/RegisterPage'
import ChatPage from './Pages/ChatPage'

import { createBrowserRouter ,BrowserRouter, Routes, Route, RouterProvider   } from 'react-router-dom'


export default function App() {
  const router = createBrowserRouter([
    {
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
  },
  {
    path: "/chat",
    element: <ChatPage/>
}])
  return (
    <>
     <RouterProvider router={router}/>
    </>
  )
}

