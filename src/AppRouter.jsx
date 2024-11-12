import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import ConsultReservationPage from './pages/consultReservationPage/consultReservationPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import ReservationPage from './pages/ReservationPage/ReservationPage'
import SummaryPage from './pages/SummaryPage/SummaryPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

import PrivateGuard from './guards/PrivateGuard'

const AppRouter = () => {
    return (
        <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
            <Routes>
                <Route path='/:tenant' element={<HomePage/>}/>
                <Route path='/login' element={<LoginPage/>}/>
                <Route path='/consultReservation' element={<ConsultReservationPage/>}/>
                <Route path='/register' element={<RegisterPage/>}/>
                <Route element={<PrivateGuard/>}>
                    <Route path='/reservation' element={<ReservationPage/>}/>
                    <Route path='/summary' element={<SummaryPage/>}/>
                </Route>
                <Route path='/404' element={<NotFoundPage/>}/>
                <Route path="*" element={<Navigate to={'/404'}/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter