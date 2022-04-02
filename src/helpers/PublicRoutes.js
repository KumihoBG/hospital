import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = () => {
    const user = sessionStorage.getItem('user');

    let isAuthenticated = user !== null;
    
    return isAuthenticated ?  <Navigate to="/" /> : <Outlet />
}

export default PublicRoutes;