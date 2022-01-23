import { Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Index'
import Dashboard from './pages/Dashboard'

export default function App(){
    return (
            <Routes>
                <Route  path='/' element={<Login/>}/>
                <Route  path='/home' element={<Home/>}/>
                <Route  path='/register' element={<Register/>}/> 
                <Route  path='/dashboard' element={<Dashboard/>}/>
            </Routes>
    )
}