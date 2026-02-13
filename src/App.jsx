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
import PrivateRoute from './components/Routing/PrivateRoute';

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
        <Route element={<PrivateRoute allowedRoles={['student']} />}>
          <Route
            path="/student"
            element={<StudentDashboard />}
          />

          <Route
            path="/student/courses"
            element={<MyCourses />}
          />

          <Route
            path="/student/courses/:id"
            element={<CourseDetail />}
          />

          <Route
            path="/student/assignments"
            element={<Assignments />}
          />

          <Route
            path="/student/quizzes"
            element={<Quizzes />}
          />

          <Route
            path="/student/live-classes"
            element={<LiveClasses />}
          />

          <Route
            path="/student/progress"
            element={<ProgressReport />}
          />

          <Route
            path="/student/messages"
            element={<Messages />}
          />

          <Route
            path="/student/settings"
            element={<Settings />}
          />
        </Route>

        {/* ---------- Teacher Routes ---------- */}
        <Route element={<PrivateRoute allowedRoles={['teacher']} />}>
          <Route
            path="/teacher"
            element={
              <PageTransition>
                <TeacherDashboard />
              </PageTransition>
            }
          />

          <Route
            path="/teacher/courses"
            element={
              <PageTransition>
                <TeacherCourses />
              </PageTransition>
            }
          />

          <Route
            path="/teacher/create-course"
            element={
              <PageTransition>
                <CreateCourse />
              </PageTransition>
            }
          />

          <Route
            path="/teacher/upload"
            element={
              <PageTransition>
                <UploadContent />
              </PageTransition>
            }
          />

          <Route
            path="/teacher/assignments"
            element={
              <PageTransition>
                <TeacherAssignments />
              </PageTransition>
            }
          />

          <Route
            path="/teacher/quizzes"
            element={
              <PageTransition>
                <TeacherQuizzes />
              </PageTransition>
            }
          />

          <Route
            path="/teacher/students"
            element={
              <PageTransition>
                <StudentsList />
              </PageTransition>
            }
          />

          <Route
            path="/teacher/reports"
            element={
              <PageTransition>
                <Reports />
              </PageTransition>
            }
          />

          <Route
            path="/teacher/messages"
            element={
              <PageTransition>
                <TeacherMessages />
              </PageTransition>
            }
          />
        </Route>

        {/* ---------- Fallback ---------- */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </AnimatePresence>
  );
}

export default App;
