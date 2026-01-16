import React, { useState } from "react";
import { useNavigate } from "react-router";
import { loginUser } from "../../api/auth";

// Define User type
interface User {
  role: "admin" | "crew" | "user";
}

interface LoginProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Call login API
      const data = await loginUser(email, password);
      const { token, user } = data;

      // Save token & user in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);

      // Redirect based on role
      if (user.role === "admin" || user.role === "crew") {
        navigate("/admin"); // AdminLayout will handle what crew/admin sees
      } else {
        navigate("/"); // Normal user stays on main site
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[75vh] flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className="w-full px-3 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-purple)] text-white py-2 rounded hover:opacity-95 cursor-pointer transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Not a member?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-[var(--color-purple)] font-medium cursor-pointer hover:underline"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
