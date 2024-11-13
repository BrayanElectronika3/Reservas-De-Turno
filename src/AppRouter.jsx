import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import ConsultReservationPage from './pages/consultReservationPage/consultReservationPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import ReservationPage from './pages/ReservationPage/ReservationPage'
import SummaryPage from './pages/SummaryPage/SummaryPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

import PrivateGuard from './guards/PrivateGuard'

const AnimatedRoutes = () => {
    const location = useLocation()
    const pageVariants = { initial: { opacity: 0, x: 400 }, enter: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -400 }, }
    const pageTransition = { type: 'tween', ease: 'anticipate', duration: 1.5, }

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path='/:tenant' element={<HomePage/>}/>
                <Route path='/login' element={ <motion.div initial="initial" animate="enter" exit="exit" variants={pageVariants} transition={pageTransition} > <LoginPage /> </motion.div> } />
                <Route path='/consultReservation' element={ <motion.div initial="initial" animate="enter" exit="exit" variants={pageVariants} transition={pageTransition}> <ConsultReservationPage /> </motion.div> } />
                <Route path='/register' element={ <motion.div initial="initial" animate="enter" exit="exit" variants={pageVariants} transition={pageTransition}> <RegisterPage /> </motion.div> } />
                <Route element={<PrivateGuard/>}>
                    <Route path='/reservation' element={ <motion.div initial="initial" animate="enter" exit="exit" variants={pageVariants} transition={pageTransition}> <ReservationPage /> </motion.div> } />
                    <Route path='/summary' element={ <motion.div initial="initial" animate="enter" exit="exit" variants={pageVariants} transition={pageTransition}> <SummaryPage /> </motion.div> }/>
                </Route>
                <Route path='/404' element={<NotFoundPage/>}/>
                <Route path="*" element={<Navigate to={'/404'}/>} />
            </Routes>
        </AnimatePresence>
    )
}

const AppRouter = () => {
    return (
        <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
            <AnimatedRoutes />
        </BrowserRouter>
    )
}

export default AppRouter