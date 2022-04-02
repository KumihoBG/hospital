import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoute = () => {
    const user = sessionStorage.getItem('user');

    let isAuthenticated = user !== null;

    toast('Not authenticated yet. Please login or register new account', {
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