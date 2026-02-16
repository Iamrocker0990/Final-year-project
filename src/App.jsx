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
import CourseContent from './pages/teacher/CourseContent';
import CreateAssignment from './pages/teacher/CreateAssignment';
import CreateQuiz from './pages/teacher/CreateQuiz';
import AdminDashboard from './pages/admin/AdminDashboard'; // Import AdminDashboard
import AdminLogin from './pages/admin/AdminLogin'; // Import AdminLogin
import AdminCourseReview from './pages/admin/AdminCourseReview'; // Import AdminCourseReview
import StudentCourseList from './pages/student/StudentCourseList'; // Import StudentCourseList
import MyEnrollments from './pages/student/MyEnrollments'; // Import MyEnrollments
import TakeQuiz from './pages/student/TakeQuiz';
import AssignmentSubmission from './pages/student/AssignmentSubmission';

// Layout
// import PageTransition from './components/layout/PageTransition'; // Removed in favor of minimalistic transitions
import PrivateRoute from './components/Routing/PrivateRoute';

/* =======================
        App
======================= */
function App() {
  const location = useLocation();

  return (
    <Routes location={location}>

      {/* ---------- Public Routes ---------- */}
      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/signup"
        element={<SignupPage />}
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

        <Route
          path="/student/catalog"
          element={<StudentCourseList />}
        />

        <Route
          path="/student/learn"
          element={<MyEnrollments />}
        />

        <Route
          path="/student/quiz/:id"
          element={<TakeQuiz />}
        />

        <Route
          path="/student/assignment/:id"
          element={<AssignmentSubmission />}
        />
      </Route>

      {/* ---------- Teacher Routes ---------- */}
      <Route element={<PrivateRoute allowedRoles={['teacher']} />}>
        <Route
          path="/teacher"
          element={<TeacherDashboard />}
        />

        <Route
          path="/teacher/courses"
          element={<TeacherCourses />}
        />

        <Route
          path="/teacher/create-course"
          element={<CreateCourse />}
        />

        <Route
          path="/teacher/upload"
          element={<UploadContent />}
        />

        <Route
          path="/teacher/assignments"
          element={<TeacherAssignments />}
        />

        <Route
          path="/teacher/quizzes"
          element={<TeacherQuizzes />}
        />

        <Route
          path="/teacher/students"
          element={<StudentsList />}
        />

        <Route
          path="/teacher/reports"
          element={<Reports />}
        />

        <Route
          path="/teacher/messages"
          element={<TeacherMessages />}
        />
        <Route
          path="/teacher/messages"
          element={<TeacherMessages />}
        />

        <Route
          path="/teacher/course/:courseId/content"
          element={<CourseContent />}
        />

        <Route
          path="/teacher/course/:courseId/assignments/create"
          element={<CreateAssignment />}
        />
        <Route
          path="/teacher/course/:courseId/quiz/create"
          element={<CreateQuiz />}
        />
      </Route>

      {/* ---------- Admin Routes ---------- */}
      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      <Route element={<PrivateRoute allowedRoles={['admin']} />}>
        <Route
          path="/admin"
          element={<AdminDashboard />}
        />
        <Route
          path="/admin/course/:id/review"
          element={<AdminCourseReview />}
        />
      </Route>

      {/* ---------- Fallback ---------- */}
      <Route path="*" element={<Navigate to="/" replace />} />

    </Routes>
  );
}

export default App;
