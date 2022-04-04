import { Navigate, Outlet } from 'react-router-dom';
import * as authService from '../features/auth/authAPI.js';

const PrivateRoute = () => {
    const isAuthenticated = authService.isAuthenticated();
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute;