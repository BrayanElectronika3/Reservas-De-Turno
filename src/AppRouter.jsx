import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import ReservationPage from './pages/ReservationPage/ReservationPage'
import PrivateGuard from './guards/PrivateGuard'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>

                <Route element={<PrivateGuard/>}>
                    <Route path='/reservation' element={<ReservationPage/>}/>
                </Route>

                <Route path='*' element={ <Navigate to={'/404'}/> }/>
                <Route path='/404' element={<h1>Page not found</h1>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter