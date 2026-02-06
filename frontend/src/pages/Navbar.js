import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context";

export default function Navbar() {
  const { token, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-8 py-4 flex justify-between items-center">
      <h2 className="text-xl font-bold">Job Portal</h2>

      <div className="flex gap-6 items-center">
        {token && <Link to="/">Jobs</Link>}

        {/* Recruiter-only links */}
        {token && role === "recruiter" && (
          <>
            <Link to="/post-job">Post Job</Link>
            <Link to="/applications">View Candidates</Link>
          </>
        )}

        {/* Candidate-only links */}
        {token && role === "candidate" && (
          <>
            <Link to="/applications">My Applications</Link>
            <Link to="/saved-jobs">Saved Jobs</Link>
            <Link to="/track-applications">Track Applications</Link>
          </>
        )}

        {!token && <Link to="/login">Login</Link>}
        {!token && <Link to="/register">Register</Link>}

        {token && (
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-4 py-1 rounded font-semibold"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
