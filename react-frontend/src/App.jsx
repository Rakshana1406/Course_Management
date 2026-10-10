import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminRegister from "./pages/AdminRegister";
import StudentDashboard from "./pages/StudentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import MyCourses from "./pages/MyCourses";
import StartCourse from "./pages/StartCourse";
import Certificate from "./pages/Certificate";
import EnrollmentSuccess from "./pages/EnrollmentSuccess";
import ManageEnrollment from "./pages/ManageEnrollment";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound"; // 1. Import NotFound component

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin-register" element={<AdminRegister />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/courses" element={<Courses />} />
            
            {/* Dynamic route parameters */}
            <Route path="/courses/:id" element={<CourseDetails />} />
            <Route path="/edit-course/:id" element={<EditCourse />} />
            
            <Route path="/my-courses" element={<MyCourses />} />
            <Route path="/start-course" element={<StartCourse />} />
            <Route path="/certificate" element={<Certificate />} />
            <Route path="/enrollment-success" element={<EnrollmentSuccess />} />
            <Route path="/manage-enrollment" element={<ManageEnrollment />} />
            <Route path="/add-course" element={<AddCourse />} />

            {/* 2. Catch-all 404 Route (Must be placed at the bottom) */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;