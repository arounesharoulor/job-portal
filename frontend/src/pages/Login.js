import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context";


export default function Login({ showToast }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      showToast && showToast(data.error || "Login failed");
      return;
    }

    login(data.token, data.user.role);
    showToast && showToast("Login successful");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Login
        </button>

        <div className="text-center mt-4">
          <span className="text-gray-600">New user? </span>
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => navigate("/register")}
          >
            Register here
          </button>
        </div>
      </form>
    </div>
  );
}
