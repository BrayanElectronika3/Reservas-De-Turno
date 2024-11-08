import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import ReservationPage from './pages/ReservationPage/ReservationPage'
import PrivateGuard from './guards/PrivateGuard'

const AppRouter = () => {
    return (
        <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
            <Routes>
                <Route path='/:IDTenant' element={<HomePage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>

                <Route element={<PrivateGuard/>}>
                    <Route path='/reservation' element={<ReservationPage/>}/>
                </Route>

                <Route path='/404' element={<h1>Page not found</h1>}/>
                <Route path="*" element={<Navigate to={'/404'}/>} />

            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter