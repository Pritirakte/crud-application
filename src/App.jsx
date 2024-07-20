import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import AddUser from './components/AddUser'
import EditUser from './components/EditUser'

const App = () => {
  return (
    
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/add-user' element={<AddUser/>}/>
            <Route path='/edit-user/:id' element={<AddUser/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App