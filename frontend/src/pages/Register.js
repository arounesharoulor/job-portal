import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Register({ showToast }) {
  const [form, setForm] = useState({
    role: "candidate" // ✅ DEFAULT ROLE
  });

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      showToast && showToast(data.error || "Registration failed");
      return;
    }

    showToast && showToast("Registration successful! Please login.");
    setTimeout(() => navigate("/login"), 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
      <form
        onSubmit={submit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-5"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

        <input
          placeholder="Name"
          required
          className="w-full px-3 py-2 border rounded"
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          required
          className="w-full px-3 py-2 border rounded"
          onChange={e => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          required
          className="w-full px-3 py-2 border rounded"
          onChange={e => setForm({ ...form, password: e.target.value })}
        />

        <select
          value={form.role}
          onChange={e => setForm({ ...form, role: e.target.value })}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="candidate">Candidate</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Register
        </button>

        <div className="text-center mt-4">
          <span className="text-gray-600">Already have an account? </span>
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => navigate("/login")}
          >
            Login here
          </button>
        </div>
      </form>
    </div>
  );
}
