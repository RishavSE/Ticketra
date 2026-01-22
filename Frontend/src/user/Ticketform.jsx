import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TicketForm = ({ onTicketCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [email, setEmail] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    // Decode token if you stored email in localStorage
    const storedEmail = localStorage.getItem('email');
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');

    if (!title.trim() || !description.trim()) {
      setError('Please fill in both title and description.');
      return;
    }

    try {
      const res = await axios.post(
         `${import.meta.env.VITE_API_URL}/tickets`,
        { title, description, email }, // ✅ include email now
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!res.data || typeof res.data !== 'object') {
        setError('Unexpected response from server.');
        return;
      }

      setTitle('');
      setDescription('');
      setSuccessMsg('Ticket created successfully!');
      if (onTicketCreated) onTicketCreated();

    } catch (err) {
      console.error('Ticket creation failed:', err);
      setError(
        err.response?.data?.message || 'Failed to create ticket.'
      );
    }
  };

  return (
    <section className="max-w-xl mx-auto mb-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
  <h2 className="text-2xl font-semibold text-white mb-6">
    Create a New <span className="text-teal-400">Support Ticket</span>
  </h2>

  <form onSubmit={handleSubmit} className="space-y-5">
    {/* Title */}
    <div>
      <label
        htmlFor="title"
        className="block text-sm text-gray-300 mb-1"
      >
        Title
      </label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        placeholder="Enter ticket title"
        className="w-full px-4 py-2.5 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400"
      />
    </div>

    {/* Description */}
    <div>
      <label
        htmlFor="description"
        className="block text-sm text-gray-300 mb-1"
      >
        Description
      </label>
      <textarea
        id="description"
        rows={5}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        placeholder="Describe your issue"
        className="w-full px-4 py-2.5 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 resize-none"
      />
    </div>

    {/* Submit */}
    <button
      type="submit"
      className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 font-semibold text-sm hover:opacity-90 transition"
    >
      Submit Ticket
    </button>

    {/* Messages */}
    {error && (
      <p className="text-red-400 font-medium mt-2">
        {error}
      </p>
    )}
    {successMsg && (
      <p className="text-green-400 font-medium mt-2">
        {successMsg}
      </p>
    )}
  </form>
</section>

  );
};

export default TicketForm;
