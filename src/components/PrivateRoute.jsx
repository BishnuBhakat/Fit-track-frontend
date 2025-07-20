import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated'); // Set this on login/register
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
