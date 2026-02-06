import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000";

export default function TrackApplications() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [applications, setApplications] = useState([]); // ✅ MUST be array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await fetch(`${API}/my-applications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      // ✅ SAFETY CHECK
      if (Array.isArray(data)) {
        setApplications(data);
      } else {
        console.error("Invalid response:", data);
        setApplications([]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading applications...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        type="button"
        onClick={() => navigate("/")}
        className="mb-4 text-blue-600 hover:underline font-semibold"
      >
        ← Back to Job List
      </button>
      <h1 className="text-3xl font-bold text-center mb-8">
        Track Applications
      </h1>

      <div className="max-w-5xl mx-auto bg-white rounded shadow">
        {applications.length === 0 ? (
          <p className="text-center p-6 text-gray-600">
            No applications found.
          </p>
        ) : (
          <table className="w-full border-collapse">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-3 border">Job Title</th>
                <th className="p-3 border">Company</th>
                <th className="p-3 border">Location</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Applied On</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.id} className="text-center">
                  <td className="p-3 border">{app.title}</td>
                  <td className="p-3 border">{app.company}</td>
                  <td className="p-3 border">{app.location}</td>
                  <td className="p-3 border capitalize">
                    {app.status || "pending"}
                  </td>
                  <td className="p-3 border">
                    {app.applied_at ? new Date(app.applied_at).toLocaleDateString() : ''}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}