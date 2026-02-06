import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context";

import Navbar from "./pages/Navbar";
import JobList from "./pages/JobList";
import JobDetails from "./pages/JobDetails";
import ApplicationForm from "./pages/ApplicationForm";
import ApplicationList from "./pages/ApplicationList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import PostJob from "./pages/PostJob";
import SavedJobs from "./pages/SavedJobs";
import TrackApplications from "./pages/TrackApplications";
import Toast from "./Toast";
import useToast from "./useToast";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/login" replace />;
};

export default function App() {
  const { role } = useContext(AuthContext);
  const toastApi = useToast();
  return (
    <>
      <Navbar />
      <Toast message={toastApi.toast} onClose={toastApi.hideToast} />
      <Routes>
        {/* 🔒 PROTECTED */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <JobList showToast={toastApi.showToast} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/jobs/:id"
          element={
            <ProtectedRoute>
              <JobDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/apply/:jobId"
          element={
            <ProtectedRoute>
              {role === "candidate" ? <ApplicationForm showToast={toastApi.showToast} /> : <Navigate to="/" replace />}
            </ProtectedRoute>
          }
        />

        {/* Recruiter-only: Post Job */}
        <Route
          path="/post-job"
          element={
            <ProtectedRoute>
              {role === "recruiter" ? <PostJob showToast={toastApi.showToast} /> : <Navigate to="/" replace />}
            </ProtectedRoute>
          }
        />























































        {/* Recruiter-only: View Candidates/Applications */}
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              {role === "recruiter" ? <ApplicationList /> : <Navigate to="/" replace />}
            </ProtectedRoute>
          }
        />

        {/* Candidate-only: My Applications, Saved Jobs, Track Applications */}
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              {role === "candidate" ? <div className="p-8 text-center">My Applications Page (Candidate only)</div> : <Navigate to="/" replace />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/saved-jobs"
          element={
            <ProtectedRoute>
              {role === "candidate" ? <SavedJobs /> : <Navigate to="/" replace />}
            </ProtectedRoute>
          }
        />
        <Route
          path="/track-applications"
          element={
            <ProtectedRoute>
              {role === "candidate" ? <TrackApplications /> : <Navigate to="/" replace />}
            </ProtectedRoute>
          }
        />

        {/* 🔓 PUBLIC */}
        <Route path="/login" element={<Login showToast={toastApi.showToast} />} />
        <Route path="/register" element={<Register showToast={toastApi.showToast} />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
