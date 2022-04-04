import { Navigate, Outlet } from 'react-router-dom';
import * as authService from '../features/auth/authAPI.js';

const PublicRoutes = () => {
    const isAuthenticated = authService.isAuthenticated();

    if (isAuthenticated) {
        return <Navigate to="/home" />
    } else {
        return <Outlet />;
    }
}

export default PublicRoutes;