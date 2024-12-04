import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
// import { AnimatePresence } from 'framer-motion'

import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import ConsultReservationPage from './pages/ConsultReservationPage/ConsultReservationPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import ReservationPage from './pages/ReservationPage/ReservationPage'
import SummaryPage from './pages/SummaryPage/SummaryPage'
import ReviewPage from './pages/ReviewPage/ReviewPage'
import ReservationEditPage from './pages/ReservationEditPage/ReservationEditPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

// import Animated from './Animated'
import PrivateGuard from './guards/PrivateGuard'

// Asignacion de animaciones
const AnimatedRoutes = () => {
    const location = useLocation()

    return (
        <Routes location={location} key={location.pathname}>
            <Route path='/:tenant' element={ <HomePage/> }/>
            <Route path='/login' element={ <LoginPage/> } />
            <Route path='/consultReservation' element={ <ConsultReservationPage/> } />
            <Route path='/register' element={ <RegisterPage/> } />
            <Route element={<PrivateGuard/>}>
                <Route path='/reservation' element={ <ReservationPage/> } />
                <Route path='/summary' element={ <SummaryPage/> }/>
                <Route path='/review' element={ <ReviewPage/> }/>
                <Route path='/reservationEdit' element={ <ReservationEditPage/> } />
            </Route>
            <Route path='/404' element={<NotFoundPage/>}/>
            <Route path="*" element={<Navigate to={'/404'}/>} />
        </Routes>
    )
}

export default AnimatedRoutes