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
<<<<<<< HEAD
import AdminDashboard from './pages/admin/AdminDashboard'; // Import AdminDashboard

// Layout
// import PageTransition from './components/layout/PageTransition';
=======

// Layout
import PageTransition from './components/layout/PageTransition';
>>>>>>> origin/otp-updates
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
<<<<<<< HEAD
          element={<LandingPage />}
=======
          element={
            <PageTransition>
              <LandingPage />
            </PageTransition>
          }
>>>>>>> origin/otp-updates
        />

        <Route
          path="/login"
<<<<<<< HEAD
          element={<LoginPage />}
=======
          element={
            <PageTransition>
              <LoginPage />
            </PageTransition>
          }
>>>>>>> origin/otp-updates
        />

        <Route
          path="/signup"
<<<<<<< HEAD
          element={<SignupPage />}
=======
          element={
            <PageTransition>
              <SignupPage />
            </PageTransition>
          }
>>>>>>> origin/otp-updates
        />

        {/* ---------- Student Routes ---------- */}
        <Route element={<PrivateRoute allowedRoles={['student']} />}>
          <Route
            path="/student"
<<<<<<< HEAD
            element={<StudentDashboard />}
=======
            element={
              <PageTransition>
                <StudentDashboard />
              </PageTransition>
            }
>>>>>>> origin/otp-updates
          />

          <Route
            path="/student/courses"
<<<<<<< HEAD
            element={<MyCourses />}
=======
            element={
              <PageTransition>
                <MyCourses />
              </PageTransition>
            }
>>>>>>> origin/otp-updates
          />

          <Route
            path="/student/courses/:id"
<<<<<<< HEAD
            element={<CourseDetail />}
=======
            element={
              <PageTransition>
                <CourseDetail />
              </PageTransition>
            }
>>>>>>> origin/otp-updates
          />

          <Route
            path="/student/assignments"
<<<<<<< HEAD
            element={<Assignments />}
=======
            element={
              <PageTransition>
                <Assignments />
              </PageTransition>
            }
>>>>>>> origin/otp-updates
          />

          <Route
            path="/student/quizzes"
<<<<<<< HEAD
            element={<Quizzes />}
=======
            element={
              <PageTransition>
                <Quizzes />
              </PageTransition>
            }
>>>>>>> origin/otp-updates
          />

          <Route
            path="/student/live-classes"
<<<<<<< HEAD
            element={<LiveClasses />}
=======
            element={
              <PageTransition>
                <LiveClasses />
              </PageTransition>
            }
>>>>>>> origin/otp-updates
          />

          <Route
            path="/student/progress"
<<<<<<< HEAD
            element={<ProgressReport />}
=======
            element={
              <PageTransition>
                <ProgressReport />
              </PageTransition>
            }
>>>>>>> origin/otp-updates
          />

          <Route
            path="/student/messages"
<<<<<<< HEAD
            element={<Messages />}
=======
            element={
              <PageTransition>
                <Messages />
              </PageTransition>
            }
>>>>>>> origin/otp-updates
          />

          <Route
            path="/student/settings"
<<<<<<< HEAD
            element={<Settings />}
=======
            element={
              <PageTransition>
                <Settings />
              </PageTransition>
            }
>>>>>>> origin/otp-updates
          />
        </Route>

        {/* ---------- Teacher Routes ---------- */}
        <Route element={<PrivateRoute allowedRoles={['teacher']} />}>
          <Route
            path="/teacher"
<<<<<<< HEAD
            element={<TeacherDashboard />}
=======
            element={
              <PageTransition>
                <TeacherDashboard />
              </PageTransition>
            }
>>>>>>> origin/otp-updates
          />

          <Route
            path="/teacher/courses"
<<<<<<< HEAD
            element={<TeacherCourses />}
=======
            element={
              <PageTransition>
                <TeacherCourses />
              </PageTransition>
            }
>>>>>>> origin/otp-updates
          />

          <Route
            path="/teacher/create-course"
<<<<<<< HEAD
            element={<CreateCourse />}
=======
            element={
              <PageTransition>
                <CreateCourse />
              </PageTransition>
            }
>>>>>>> origin/otp-updates
          />

          <Route
            path="/teacher/upload"
<<<<<<< HEAD
            element={<UploadContent />}
=======
            element={
              <PageTransition>
                <UploadContent />
              </PageTransition>
            }
>>>>>>> origin/otp-updates
          />

          <Route
            path="/teacher/assignments"
<<<<<<< HEAD
            element={<TeacherAssignments />}
=======
            element={
              <PageTransition>
                <TeacherAssignments />
              </PageTransition>
            }
>>>>>>> origin/otp-updates
          />

          <Route
            path="/teacher/quizzes"
<<<<<<< HEAD
            element={<TeacherQuizzes />}
=======
            element={
              <PageTransition>
                <TeacherQuizzes />
              </PageTransition>
            }
>>>>>>> origin/otp-updates
          />

          <Route
            path="/teacher/students"
<<<<<<< HEAD
            element={<StudentsList />}
=======
            element={
              <PageTransition>
                <StudentsList />
              </PageTransition>
            }
>>>>>>> origin/otp-updates
          />

          <Route
            path="/teacher/reports"
<<<<<<< HEAD
            element={<Reports />}
=======
            element={
              <PageTransition>
                <Reports />
              </PageTransition>
            }
>>>>>>> origin/otp-updates
          />

          <Route
            path="/teacher/messages"
<<<<<<< HEAD
            element={<TeacherMessages />}
          />
        </Route>

        {/* ---------- Admin Routes ---------- */}
        <Route element={<PrivateRoute allowedRoles={['admin']} />}>
          <Route
            path="/admin"
            element={<AdminDashboard />}
=======
            element={
              <PageTransition>
                <TeacherMessages />
              </PageTransition>
            }
>>>>>>> origin/otp-updates
          />
        </Route>

        {/* ---------- Fallback ---------- */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </AnimatePresence>
  );
}

export default App;
