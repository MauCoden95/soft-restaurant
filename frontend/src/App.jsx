import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import { Dashboard } from './components/Dashboard'
import { Login } from './components/Login'
import { Users } from './components/Users'
import { Dishes } from './components/Dishes'
import { Categories } from './components/Categories'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/usuarios' element={<Users/>}></Route>
          <Route path='/categorias' element={<Categories/>}></Route>
          <Route path='/insumos' element={<Dishes/>}></Route>
      </Routes>
    </>
  )
}

export default App
