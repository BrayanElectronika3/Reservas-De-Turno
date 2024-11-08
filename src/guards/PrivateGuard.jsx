import { Navigate, Outlet } from "react-router-dom";

const PrivateGuard = () => {
    const authenticated = localStorage.getItem('authenticated');

    return authenticated ? <Outlet/> : <Navigate to={'/'} replace={true}/>
}

export default PrivateGuard