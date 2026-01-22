import React, { useState } from 'react';
import '../pages/auth.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🔐 Logging in with:', { email, password, role });

    try {
      const res = await axios.post( 
        `${import.meta.env.VITE_API_URL}/login`, {
        email,
        password,
        role,
      });

      console.log('✅ Login response:', res.data);

      if (res.data.token) {
        const { token, role: returnedRole, email: returnedEmail, name } = res.data;

        const userObj = {
          email: returnedEmail,
          role: returnedRole,
          name,
        };

        // 🔥 IMPORTANT FIX: update App.jsx state
        onLoginSuccess(userObj, token);

        // 🔁 role based redirect
        if (returnedRole === "admin") {
          navigate("/adminpannel1");
        } else if (returnedRole === "agent") {
          navigate("/support-dashboard");
        } else {
          navigate("/user-dashboard");
        }


      } else {
        alert(res.data.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Login failed, please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl"
  >
    <h2 className="text-2xl font-semibold text-white text-center">
      Login to <span className="text-teal-400">Ticketra</span>
    </h2>
    <p className="text-sm text-gray-300 text-center mt-1 mb-8">
      Welcome back! Please login to your account
    </p>

    {/* Email */}
    <div className="mb-5">
      <label className="block text-sm text-gray-300 mb-1">Email</label>
      <input
        type="email"
        placeholder="Enter your email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
      />
    </div>

    {/* Password */}
    <div className="mb-5">
      <label className="block text-sm text-gray-300 mb-1">Password</label>
      <input
        type="password"
        placeholder="Enter your password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
      />
    </div>

    {/* Role */}
    {/* <div className="mb-6">
      <label className="block text-sm text-gray-300 mb-1">Select Role</label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="w-full px-4 py-2.5 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
      >
        <option className="text-black" value="user">User</option>
        <option className="text-black" value="agent">Support Agent</option>
        <option className="text-black" value="admin">Admin</option>
      </select>
    </div> */}

    {/* Button */}
    <button
      type="submit"
      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 font-semibold text-sm hover:opacity-90 transition"
    >
      Login
    </button>

    <p className="text-sm text-gray-300 text-center mt-6">
      Don’t have an account?{" "}
      <Link to="/register" className="text-teal-400 hover:underline">
        Register
      </Link>
    </p>
  </form>
</div>

  );
};

export default Login;
