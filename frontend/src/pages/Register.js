import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { FileText } from "lucide-react";

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
    } catch {
      alert("Register Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-[380px]">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-600 p-3 rounded-xl">
            <FileText className="text-white" size={24} />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-1">Create Account</h2>

        <p className="text-center text-gray-500 mb-6">
          Start managing your notes
        </p>

        <input
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          placeholder="Full Name"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

        <input
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          placeholder="Email"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <input
          type="password"
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
        >
          Register
        </button>

        <p className="text-center text-sm mt-4 text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
