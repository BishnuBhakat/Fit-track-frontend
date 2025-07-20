import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated'); // ekhane je check korchi user login kora ache kina
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
