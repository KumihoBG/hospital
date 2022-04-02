import { Navigate, Outlet } from 'react-router-dom';
import * as authService from '../features/auth/authAPI.js';
import { toast } from 'react-toastify';

const PrivateRoute = () => {
    const isAuthenticated = authService.isAuthenticated();
    toast('Not authenticated!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    })
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute;