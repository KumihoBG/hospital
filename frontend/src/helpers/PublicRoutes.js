import { Navigate, Outlet } from 'react-router-dom';
import * as authService from '../features/auth/authAPI.js';
import { toast } from 'react-toastify';

const PublicRoutes = () => {
    const isAuthenticated = authService.isAuthenticated();

    if (isAuthenticated) {
        toast('Already authenticated!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        return <Navigate to="/home" />
    } else {
        return <Outlet />;
    }
}

export default PublicRoutes;