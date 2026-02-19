import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
import SignupPage from './pages/public/SignupPage';

// Routes Components
import StudentRoutes from './routes/StudentRoutes';
import TeacherRoutes from './routes/TeacherRoutes';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLogin from './pages/admin/AdminLogin';
import AdminCourseReview from './pages/admin/AdminCourseReview';

// Layout
import PrivateRoute from './components/Routing/PrivateRoute';

/* =======================
        App
======================= */
function App() {
  const location = useLocation();

  return (
    <Routes location={location}>

      {/* ---------- Public Routes ---------- */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* ---------- Student Routes ---------- */}
      <Route element={<PrivateRoute allowedRoles={['student']} />}>
        <Route path="/student/*" element={<StudentRoutes />} />
      </Route>

      {/* ---------- Teacher Routes ---------- */}
      <Route element={<PrivateRoute allowedRoles={['teacher']} />}>
        <Route path="/teacher/*" element={<TeacherRoutes />} />
      </Route>

      {/* ---------- Admin Routes ---------- */}
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<PrivateRoute allowedRoles={['admin']} />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/course/:id/review" element={<AdminCourseReview />} />
      </Route>

      {/* ---------- Fallback ---------- */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default App;
