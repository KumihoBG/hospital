import { Navigate, Outlet } from 'react-router-dom';
import * as authService from '../features/auth/authAPI.js';

const PrivateRoute = () => {
    const isAuthenticated = authService.isAuthenticated();
    console.log('isAuthenticated: ', isAuthenticated);
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute;