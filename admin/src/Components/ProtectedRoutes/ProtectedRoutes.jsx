import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ element, isAuthenticated }) => {
    return isAuthenticated ? element : <Navigate to="/" />;
};

export default ProtectedRoutes;
