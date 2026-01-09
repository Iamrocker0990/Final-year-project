import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import LoginPage from './pages/public/LoginPage';
import SignupPage from './pages/public/SignupPage';

// Student Pages
import StudentDashboard from './pages/student/StudentDashboard';
import MyCourses from './pages/student/MyCourses';
import CourseDetail from './pages/student/CourseDetail';
import Assignments from './pages/student/Assignments';
import Quizzes from './pages/student/Quizzes';
import LiveClasses from './pages/student/LiveClasses';
import ProgressReport from './pages/student/ProgressReport';
import Messages from './pages/student/Messages';
import Settings from './pages/student/Settings';

// Teacher Pages
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import TeacherCourses from './pages/teacher/TeacherCourses';
import CreateCourse from './pages/teacher/CreateCourse';
import UploadContent from './pages/teacher/UploadContent';
import TeacherAssignments from './pages/teacher/TeacherAssignments';
import TeacherQuizzes from './pages/teacher/TeacherQuizzes';
import StudentsList from './pages/teacher/StudentsList';
import Reports from './pages/teacher/Reports';
import TeacherMessages from './pages/teacher/TeacherMessages';

// Layout
import PageTransition from './components/layout/PageTransition';

/* =======================
   Protected Route Wrapper
======================= */
const ProtectedRoute = ({ children, role }) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  if (!userInfo) {
    return <Navigate to="/login" replace />;
  }

  if (role && userInfo.role !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

/* =======================
        App
======================= */
function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* ---------- Public Routes ---------- */}
        <Route
          path="/"
          element={
            <PageTransition>
              <LandingPage />
            </PageTransition>
          }
        />

        <Route
          path="/login"
          element={
            <PageTransition>
              <LoginPage />
            </PageTransition>
          }
        />

        <Route
          path="/signup"
          element={
            <PageTransition>
              <SignupPage />
            </PageTransition>
          }
        />

        {/* ---------- Student Routes ---------- */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <PageTransition>
                <StudentDashboard />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/courses"
          element={
            <ProtectedRoute role="student">
              <PageTransition>
                <MyCourses />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/courses/:id"
          element={
            <ProtectedRoute role="student">
              <PageTransition>
                <CourseDetail />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/assignments"
          element={
            <ProtectedRoute role="student">
              <PageTransition>
                <Assignments />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/quizzes"
          element={
            <ProtectedRoute role="student">
              <PageTransition>
                <Quizzes />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/live-classes"
          element={
            <ProtectedRoute role="student">
              <PageTransition>
                <LiveClasses />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/progress"
          element={
            <ProtectedRoute role="student">
              <PageTransition>
                <ProgressReport />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/messages"
          element={
            <ProtectedRoute role="student">
              <PageTransition>
                <Messages />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        <Route
          path="/student/settings"
          element={
            <ProtectedRoute role="student">
              <PageTransition>
                <Settings />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        {/* ---------- Teacher Routes ---------- */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute role="teacher">
              <PageTransition>
                <TeacherDashboard />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/courses"
          element={
            <ProtectedRoute role="teacher">
              <PageTransition>
                <TeacherCourses />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/create-course"
          element={
            <ProtectedRoute role="teacher">
              <PageTransition>
                <CreateCourse />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/upload"
          element={
            <ProtectedRoute role="teacher">
              <PageTransition>
                <UploadContent />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/assignments"
          element={
            <ProtectedRoute role="teacher">
              <PageTransition>
                <TeacherAssignments />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/quizzes"
          element={
            <ProtectedRoute role="teacher">
              <PageTransition>
                <TeacherQuizzes />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/students"
          element={
            <ProtectedRoute role="teacher">
              <PageTransition>
                <StudentsList />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/reports"
          element={
            <ProtectedRoute role="teacher">
              <PageTransition>
                <Reports />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        <Route
          path="/teacher/messages"
          element={
            <ProtectedRoute role="teacher">
              <PageTransition>
                <TeacherMessages />
              </PageTransition>
            </ProtectedRoute>
          }
        />

        {/* ---------- Fallback ---------- */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </AnimatePresence>
  );
}

export default App;
