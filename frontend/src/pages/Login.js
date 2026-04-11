import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch {
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[380px]">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-blue-600 p-3 rounded-xl">
            <FileText className="text-white" size={24} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-1">Welcome Back</h2>
        <p className="text-center text-gray-500 mb-6">
          Sign in to access your notes
        </p>

        <input
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="you@example.com"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Sign In
        </button>

        <p className="text-center text-sm mt-4 text-gray-500">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
