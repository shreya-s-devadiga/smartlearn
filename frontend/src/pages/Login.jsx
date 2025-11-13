import React, { useState } from "react";
import { login } from "../services_api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      // ✅ FIX: Pass as an object, not two params
      const res = await login({ username, password });

      // Safely extract user payload
      const payload = res?.data?.id ? res.data : res?.data?.data || res?.data;

      if (!payload || !payload.id) {
        setErr("Unexpected server response. Missing user payload.");
        return;
      }

      // ✅ Store user in localStorage
      localStorage.setItem("user", JSON.stringify(payload));

      // ✅ Create or maintain reward profile for the user
      const REWARD_KEY = `smartlearn_profile_${payload.id}`;
      if (!localStorage.getItem(REWARD_KEY)) {
        localStorage.setItem(REWARD_KEY, JSON.stringify({ stars: 0, badges: [] }));
      }

      // Cleanup legacy key if exists
      localStorage.removeItem("smartlearn_profile");

      // ✅ Redirect based on user role
      const role = (payload.role || "").toUpperCase();
      const target = role === "ADMIN" ? "/admin" : "/dashboard";
      window.location.replace(target);

    } catch (e) {
      console.error("Login error:", e);
      const msg =
        e?.response?.data && typeof e.response.data === "string"
          ? e.response.data
          : "Invalid username or password";
      setErr(msg);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card p-4 shadow-lg rounded-4 border-0">
          <h3 className="mb-3 text-center fw-bold text-primary">Login</h3>
          <form onSubmit={submit}>
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Username</label>
              <input
                className="form-control p-3"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Password</label>
              <input
                type="password"
                className="form-control p-3"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {err && (
              <div className="alert alert-danger text-center mt-3 py-2">
                {err}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-100 mt-3 py-2 fw-semibold"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
