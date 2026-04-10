import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", data);
      alert("Registered Successfully");
      navigate("/");
    } catch (err) {
      alert("Register Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#333]">
      <div className="backdrop-blur-lg bg-white/10 p-8 rounded-2xl shadow-2xl w-[350px] border border-white/20">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Create Account
        </h2>

        {/* 👇 Name Input */}
        <input
          className="w-full mb-4 px-4 py-2 bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 transition"
          placeholder="Full Name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          className="w-full mb-4 px-4 py-2 bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 transition"
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full mb-4 px-4 py-2 bg-white/10 text-white placeholder-gray-300 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 transition"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-white/90 text-black py-2 rounded-lg hover:bg-black hover:text-white transition duration-300 font-semibold"
        >
          Register
        </button>

        <p className="text-center text-sm mt-4 text-gray-300">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-white cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
