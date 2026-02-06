import { useState, useEffect } from "react";

const API = "http://localhost:5000";

export default function SavedJobs() {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch saved jobs for the candidate
    fetch(`${API}/saved-jobs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async res => {
        if (!res.ok) {
          // If forbidden or error, return empty array
          return [];
        }
        const data = await res.json();
        // If data is not an array, return empty array
        if (!Array.isArray(data)) return [];
        return data;
      })
      .then(setJobs)
      .catch(() => setJobs([]));
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
        type="button"
        onClick={() => window.history.length > 1 ? window.history.back() : window.location.assign("/")}
        className="mb-4 text-blue-600 hover:underline font-semibold"
      >
        ← Back to Job List
      </button>
      <h1 className="text-3xl font-bold mb-8">Saved Jobs</h1>
      {jobs.length === 0 ? (
        <p className="text-gray-600">No saved jobs found.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-4 text-left">Title</th>
                <th className="p-4 text-left">Company</th>
                <th className="p-4 text-left">Location</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map(job => (
                <tr key={job.id} className="border-t">
                  <td className="p-4">{job.title}</td>
                  <td className="p-4">{job.company}</td>
                  <td className="p-4">{job.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
