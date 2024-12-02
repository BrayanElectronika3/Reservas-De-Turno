import { BrowserRouter } from 'react-router-dom'
import AnimatedRoutes from './AnimatedRoutes'

// App router
const AppRouter = () => {
    return (
        <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
            <AnimatedRoutes />
        </BrowserRouter>
    )
}

export default AppRouter