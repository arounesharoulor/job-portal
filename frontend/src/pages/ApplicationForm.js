import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API = "http://localhost:5000";


export default function ApplicationForm({ showToast }) {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [candidateName, setCandidateName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      showToast && showToast("Please login first");
      return;
    }

    const formData = new FormData();
    formData.append("jobId", jobId);
    formData.append("candidateName", candidateName);
    formData.append("candidateEmail", candidateEmail);
    formData.append("resume", resume);

    const res = await fetch(`${API}/applications`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    const data = await res.json();

    if (!res.ok) {
      showToast && showToast(data.error || "Failed to submit application");
      return;
    }

    showToast && showToast("Application submitted successfully");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 py-12 px-2">
      <div className="w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="bg-white p-12 rounded-2xl shadow-2xl w-full space-y-6 border border-blue-100">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mb-2 text-blue-600 hover:underline font-semibold"
          >
            ← Back
          </button>
          <h2 className="text-3xl font-extrabold text-blue-900 mb-6 text-center tracking-tight">Apply for Job <span className="text-blue-700">#{jobId}</span></h2>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setCandidateName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setCandidateEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 font-medium">Resume (PDF)</label>
            <input
              type="file"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={(e) => setResume(e.target.files[0])}
              required
            />
          </div>

          <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg shadow transition text-lg">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
}
