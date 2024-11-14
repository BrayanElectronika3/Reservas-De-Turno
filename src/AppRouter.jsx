import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import PropTypes from 'prop-types'

import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import ConsultReservationPage from './pages/consultReservationPage/consultReservationPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import ReservationPage from './pages/ReservationPage/ReservationPage'
import SummaryPage from './pages/SummaryPage/SummaryPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

import PrivateGuard from './guards/PrivateGuard'

// Animacion
const Animated = ({ children }) => {
    const pageVariants = { initial: { opacity: 0, x: 500 }, enter: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -500 }, }
    const pageTransition = { type: 'tween', ease: 'anticipate', duration: 1.5, }
    const handleAnimationStart = () => { document.body.style.overflow = 'hidden' }
    const handleAnimationComplete = () => { document.body.style.overflow = '' }

    return (
        <motion.div 
            initial="initial" 
            animate="enter" 
            exit="exit" 
            variants={pageVariants} 
            transition={pageTransition} 
            onAnimationStart={handleAnimationStart} 
            onAnimationComplete={handleAnimationComplete}
        > 
            {children} 
        </motion.div>
    )
}

Animated.propTypes = {
    children: PropTypes.node
}

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
                </Route>
                <Route path='/404' element={<NotFoundPage/>}/>
                <Route path="*" element={<Navigate to={'/404'}/>} />
            </Routes>
        </AnimatePresence>
    )
}

// App router
const AppRouter = () => {
    return (
        <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
            <AnimatedRoutes />
        </BrowserRouter>
    )
}

export default AppRouter