import { Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Index'
import Dashboard from './pages/Dashboard'

import { ProtectedRoutes } from './Components/ProtectedRoutes'
import { PublicRoutes } from './Components/PublicRoutes'

export default function App(){

    return (
        <Routes>
            <Route  path='/' element={
                <ProtectedRoutes>
                    <Home/>
                </ProtectedRoutes>
            }/>
            <Route  path='/login' element={
                <PublicRoutes>
                    <Login/>
                </PublicRoutes>
            }/>
            <Route  path='/register' element={
                <PublicRoutes>
                    <Register/>
                </PublicRoutes>
            }/> 
            <Route  path='/dashboard' element={
                <ProtectedRoutes>
                    <Dashboard/>
                </ProtectedRoutes>
            }/>
        </Routes>
    )
}
