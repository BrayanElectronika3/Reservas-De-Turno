import { Navigate, Outlet } from "react-router-dom"

const PrivateGuard = () => {
    const user = localStorage.getItem('user')
    return user ? <Outlet/> : <Navigate to={'/'} replace={true}/>
}

export default PrivateGuard