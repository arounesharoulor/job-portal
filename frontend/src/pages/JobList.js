import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000";

export default function JobList({ showToast }) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  /* =====================
     AUTH CHECK
  ===================== */
  useEffect(() => {
    if (!token) navigate("/login");
  }, [token, navigate]);

  /* =====================
     STATE
  ===================== */
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  /* =====================
     FETCH JOBS
  ===================== */
  const fetchJobs = async (t = "", l = "", p = 1) => {
    try {
      const res = await fetch(
        `${API}/jobs?title=${t}&location=${l}&page=${p}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) return;

      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  /* =====================
     SEARCH & CLEAR
  ===================== */
  const handleSearch = () => {
    setPage(1);
    fetchJobs(title.trim(), location.trim(), 1);
  };

  const handleClear = () => {
    setTitle("");
    setLocation("");
    setPage(1);
    fetchJobs("", "", 1);
  };

  /* =====================
     SAVE JOB (FIXED)
  ===================== */
  const handleSaveJob = async (jobId) => {
    try {
      const res = await fetch(`${API}/saved-jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ jobId }),
      });

      const data = await res.json();

      if (!res.ok) {
        showToast && showToast(data.error || "Failed to save job");
        return;
      }

      showToast && showToast("Job saved successfully!");
    } catch (err) {
      console.error(err);
      showToast && showToast("Server error");
    }
  };

  /* =====================
     UI
  ===================== */
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        Available Jobs
      </h1>

      {/* FILTER */}
      <div className="bg-white max-w-5xl mx-auto rounded-xl shadow-lg p-6 mb-10">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Filter Jobs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Job Title"
            className="border px-4 py-3 rounded"
          />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
            className="border px-4 py-3 rounded"
          />
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={handleClear}
            className="px-6 py-2 bg-gray-300 rounded"
          >
            Clear
          </button>

          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded"
          >
            Search Jobs
          </button>
        </div>
      </div>

      {/* JOB TABLE */}
      <div className="max-w-6xl mx-auto overflow-x-auto">
        <table className="w-full bg-white rounded-xl shadow border border-gray-200">
          <thead className="bg-blue-100">
            <tr>
              <th className="p-4 border-b text-left">Title</th>
              <th className="p-4 border-b text-left">Company</th>
              <th className="p-4 border-b text-left">Location</th>
              {role === "candidate" && (
                <th className="p-4 border-b text-left">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {jobs.length === 0 && (
              <tr>
                <td
                  colSpan={role === "candidate" ? 4 : 3}
                  className="text-center p-6"
                >
                  No jobs found
                </td>
              </tr>
            )}

            {jobs.map((job, idx) => (
              <tr
                key={job.id}
                className={`${
                  idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                } border-b hover:bg-blue-50`}
              >
                <td className="p-4">{job.title}</td>
                <td className="p-4">{job.company}</td>
                <td className="p-4">{job.location}</td>

                {role === "candidate" && (
                  <td className="p-4 flex gap-2">
                    <button
                      className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                      onClick={() =>
                        navigate(`/apply/${job.id}`)
                      }
                    >
                      Apply
                    </button>

                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => handleSaveJob(job.id)}
                    >
                      Save
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
