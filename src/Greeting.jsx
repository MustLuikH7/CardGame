import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Greeting.css'
import { BrowserRouter } from 'react-router-dom'

function Greeting() {
  return (
    < div className="App" >
      <button className='host'>Host</button>
      <button className='join'>Join</button>
    </div >
  )
}

export default Greeting
