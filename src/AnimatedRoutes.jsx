import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import ConsultReservationPage from './pages/ConsultReservationPage/ConsultReservationPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import ReservationPage from './pages/ReservationPage/ReservationPage'
import SummaryPage from './pages/SummaryPage/SummaryPage'
import ReviewPage from './pages/ReviewPage/ReviewPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

import Animated from './Animated'
import PrivateGuard from './guards/PrivateGuard'

// Asignacion de animaciones
const AnimatedRoutes = () => {
    const location = useLocation()

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path='/:tenant' element={<HomePage/>}/>
                <Route path='/login' element={ <Animated> <LoginPage/> </Animated> } />
                <Route path='/consultReservation' element={ <Animated> <ConsultReservationPage/> </Animated> } />
                <Route path='/register' element={ <Animated> <RegisterPage/> </Animated> } />
                <Route element={<PrivateGuard/>}>
                    <Route path='/reservation' element={ <Animated> <ReservationPage/> </Animated> } />
                    <Route path='/summary' element={ <Animated> <SummaryPage/> </Animated> }/>
                    <Route path='/review' element={ <Animated> <ReviewPage/> </Animated> }/>
                </Route>
                <Route path='/404' element={<NotFoundPage/>}/>
                <Route path="*" element={<Navigate to={'/404'}/>} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes