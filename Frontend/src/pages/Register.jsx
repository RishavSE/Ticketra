import React, { useState } from 'react';
import axios from 'axios'; // ✅ import Axios
import '../pages/auth.css';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
          `${import.meta.env.VITE_API_URL}register`, formData);
      alert("registered sucessfully "); 
      navigate('/login'); 
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-4">
  <form
    onSubmit={handleSubmit}
    className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl mt-5 mb-5"
  >
    <h2 className="text-2xl font-semibold text-white text-center">
      Create your <span className="text-teal-400">Ticketra</span> account
    </h2>
    <p className="text-sm text-gray-300 text-center mt-1 mb-8">
      Get started by creating your account
    </p>

    {/* Full Name */}
    <div className="mb-5">
      <label className="block text-sm text-gray-300 mb-1">Full Name</label>
      <input
        type="text"
        name="name"
        placeholder="Enter full name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full px-4 py-2.5 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
      />
    </div>

    {/* Email */}
    <div className="mb-5">
      <label className="block text-sm text-gray-300 mb-1">Email</label>
      <input
        type="email"
        name="email"
        placeholder="Enter email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-2.5 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
      />
    </div>

    {/* Password */}
    <div className="mb-5">
      <label className="block text-sm text-gray-300 mb-1">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Create password"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full px-4 py-2.5 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
      />
    </div>

    {/* Role */}
    <div className="mb-6">
      <label className="block text-sm text-gray-300 mb-1">Choose Role</label>
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full px-4 py-2.5 rounded-lg bg-white/10 text-white border border-white/20 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
      >
        <option className="text-black" value="user">User</option>
        <option className="text-black" value="agent">Support Agent</option>
        <option className="text-black" value="admin">Admin</option>
      </select>
    </div>

    {/* Button */}
    <button
      type="submit"
      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 font-semibold text-sm hover:opacity-90 transition"
    >
      Register
    </button>

    <p className="text-sm text-gray-300 text-center mt-6">
      Already have an account?{" "}
      <Link to="/login" className="text-teal-400 hover:underline">
        Login
      </Link>
    </p>
  </form>
</div>

  );
};

export default Register;
