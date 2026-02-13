import { Navigate, Outlet } from 'react-router-dom';

const getUserFromStorage = () => {
  const userInfoString = localStorage.getItem('userInfo');
  if (!userInfoString) return null;

  try {
    return JSON.parse(userInfoString);
  } catch {
    localStorage.removeItem('userInfo');
    return null;
  }
};

const PrivateRoute = ({ allowedRoles }) => {
  // 1. Get User Info
  const user = getUserFromStorage();

  // 2. Not Logged In or malformed data? -> Go to Login
  if (!user || !user.role || !user.token) {
    return <Navigate to="/login" replace />;
  }

  const { role } = user;

  // 3. Wrong Role? -> Redirect to their correct home
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to={role === 'student' ? '/student' : '/teacher'} replace />;
  }

  // 4. Allowed? -> Render the page
  return <Outlet />;
};

export default PrivateRoute;