import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const API = "http://localhost:5000";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`${API}/jobs/${id}`)
      .then(res => res.json())
      .then(setJob);
  }, [id]);

  if (!job) return <p>Loading...</p>;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="bg-white p-6 rounded shadow max-w-xl mx-auto">
        <h1 className="text-2xl font-bold">{job.title}</h1>
        <p className="text-gray-700">{job.company}</p>
        <p>{job.description}</p>

        <Link
          to={`/apply/${job.id}`}
          className="inline-block mt-4 bg-green-600 text-white px-4 py-2 rounded"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
}
