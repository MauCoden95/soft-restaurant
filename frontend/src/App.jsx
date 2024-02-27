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
import { EditDishes } from './components/EditDishes'
import { EditCategories } from './components/EditCategories'
import { Tables } from './components/Tables'
import { Orders } from './components/Orders'
import { EditUsers } from './components/EditUsers'
import { Settings } from './components/Settings'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/dashboard' element={<Dashboard/>}></Route>
          <Route path='/usuarios' element={<Users/>}></Route>
          <Route path='/editar-usuario/:id' element={<EditUsers/>}></Route>
          <Route path='/categorias' element={<Categories/>}></Route>
          <Route path='/editar-categoria/:id' element={<EditCategories/>}></Route>
          <Route path='/insumos' element={<Dishes/>}></Route>
          <Route path='/editar-insumo/:id' element={<EditDishes/>}></Route>
          <Route path='/mesas' element={<Tables/>}></Route>
          <Route path='/mesa/:id' element={<Orders/>}></Route>
          <Route path='/configuracion/:id' element={<Settings/>}></Route>
      </Routes>
    </>
  )
}

export default App
