import { useState } from 'react'
import Navbar from './components/Navbar'
import './App.css'
import Hero from './components/Hero'
import NewsCards from './components/NewsCards'

export default function App() {
  
  return (
    <>
      <Navbar />
     <Hero />
     <NewsCards/>
    </>
  )
}

