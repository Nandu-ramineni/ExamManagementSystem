import {jwtDecode} from 'jwt-decode';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ requiredRole, redirectPath }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/" />;
    }

    let decodedToken;
    try {
        decodedToken = jwtDecode(token);
    } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
        return <Navigate to="/" />;
    }

    const { role, exp } = decodedToken;
    const currentTime = Math.floor(Date.now() / 1000);

    if (exp && exp < currentTime) {
        localStorage.removeItem("token");
        return <Navigate to="/" />;
    }

    if (role !== requiredRole) {
        return <Navigate to={redirectPath || "/unauthorized"} />;
    }

    return <Outlet />;
};

export default PrivateRoute;
