import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  const username = localStorage.getItem('username');
  return username ? children : <Navigate to="/login" replace />;
}
