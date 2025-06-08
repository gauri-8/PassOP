import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/footer'

function App() {

  return (
    <>
    <Navbar/>
    <div>
     <Manager/>
</div>
     <Footer/>
    </>
  )
}

export default App
