import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import PrivateGuard from './guards/PrivateGuard'

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/login' element={<LoginPage/>}/>

                <Route element={<PrivateGuard/>}>
                    <Route path='/private' element={<h1>Private</h1>}/>
                </Route>

                <Route path='*' element={ <Navigate to={'/404'}/> }/>
                <Route path='/404' element={<h1>Page not found</h1>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter