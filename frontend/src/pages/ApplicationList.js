import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000";

export default function ApplicationList() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔐 AUTH CHECK
    if (!token) {
      navigate("/login");
      return;
    }

    if (role !== "recruiter") {
      alert("Access denied");
      navigate("/");
      return;
    }

    // 📡 FETCH APPLICATIONS
    const fetchApplications = async () => {
      try {
        const res = await fetch(`${API}/applications`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data = await res.json();
        setApplications(data);
      } catch (err) {
        console.error(err);
        alert("Error loading applications");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [token, role, navigate]);

  if (loading) {
    return <p className="p-8 text-center">Loading applications...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline font-semibold"
      >
        ← Back
      </button>
      <h1 className="text-3xl font-bold mb-8">Applications</h1>

      {applications.length === 0 ? (
        <p className="text-gray-600">No applications found</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">
          <table className="w-full">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-4 text-left">Candidate Name</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Job ID</th>
                <th className="p-4 text-left">Resume</th>
              </tr>
            </thead>
            <tbody>
              {applications.map(app => (
                <tr key={app.id} className="border-t">
                  <td className="p-4">{app.candidate_name}</td>
                  <td className="p-4">{app.candidate_email}</td>
                  <td className="p-4">{app.job_id}</td>
                  <td className="p-4">
                    {app.resume ? (
                      <a
                        href={`http://localhost:5000/${app.resume.replace(
                          /\\/g,
                          "/"
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        View Resume
                      </a>
                    ) : (
                      "N/A"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
