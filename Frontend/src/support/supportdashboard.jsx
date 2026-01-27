import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SupportDashboard.css";

const SupportDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [commentMap, setCommentMap] = useState({});

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setTickets([]);

      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) throw new Error("User not logged in");

      const role = user.role;
      if (role !== "admin" && role !== "agent") {
        throw new Error(
          "Access denied: only admin or agent can fetch all tickets",
        );
      }

      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/tickets/agent`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const sortedTickets = response.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );

      setTickets(sortedTickets);
    } catch (error) {
      console.error("Error fetching tickets:", error.message);
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (ticketId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/tickets/update/${ticketId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setTickets((prev) =>
        prev.map((ticket) =>
          ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket,
        ),
      );
    } catch (error) {
      console.error(
        "Error updating status:",
        error.response?.data || error.message,
      );
    }
  };

  const handleCommentSubmit = async (ticketId) => {
    try {
      const token = localStorage.getItem("token");
      const commentText = commentMap[ticketId];

      if (!token || !commentText?.trim()) return;

      await axios.put(
        `${import.meta.env.VITE_API_URL}/tickets/update/${ticketId}`,
        { comment: commentText.trim() }, 
        { headers: { Authorization: `Bearer ${token}` } },
      );

     
      setTickets((prev) =>
        prev.map((ticket) =>
          ticket._id === ticketId
            ? {
                ...ticket,
                comments: [
                  ...(ticket.comments || []),
                  {
                    text: commentText.trim(),
                    author: "Support",
                    createdAt: new Date(),
                  },
                ],
              }
            : ticket,
        ),
      );

     
      setCommentMap((prev) => ({ ...prev, [ticketId]: "" }));
    } catch (error) {
      console.error(
        "Error submitting comment:",
        error.response?.data || error.message,
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen flex bg-slate-900 text-white">
      {/* ===== SIDEBAR ===== */}
      <aside className="w-64 bg-slate-950 border-r border-white/10 p-6 flex flex-col">
        <h2 className="text-2xl font-semibold mb-8">
          <span className="text-teal-400">Ticketra</span>
        </h2>

        <nav className="space-y-3">
          <button
            onClick={fetchTickets}
            className="w-full text-left px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            Dashboard
          </button>

          <button
            onClick={logout}
            className="w-full text-left px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
          >
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-semibold mb-6">
          <span className="text-teal-400">Support Agent Dashboard</span>
        </h1>

        {loading ? (
          <p className="text-gray-300">Loading tickets...</p>
        ) : tickets.length === 0 ? (
          <p className="text-gray-400">No tickets found.</p>
        ) : (
          <div className="grid gap-6">
            {tickets.map((ticket) => (
              <div
                key={ticket._id}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl"
              >
                <h3 className="text-xl font-semibold mb-2">
                  {ticket.title || "No Subject"}
                </h3>
                <p className="text-gray-400 text-xs mb-2">
                  🕒 Created on{" "}
                  {new Date(ticket.createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>

                <p className="text-gray-300 text-sm mb-1">
                  <strong>Email:</strong> {ticket.email}
                </p>

                <p className="text-gray-300 text-sm mb-2">
                  <strong>Message:</strong> {ticket.description || ticket.title}
                </p>

                <p className="text-gray-300 text-sm mb-4">
                  <strong>Status:</strong>{" "}
                  <span className="text-teal-400 font-medium">
                    {ticket.status}
                  </span>
                </p>

                {/* Status Actions */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => handleStatusChange(ticket._id, "pending")}
                    className="px-3 py-1.5 rounded-lg bg-yellow-400 text-slate-900 text-sm font-medium cursor-pointer"
                  >
                    Mark Pending
                  </button>

                  <button
                    onClick={() =>
                      handleStatusChange(ticket._id, "in-progress")
                    }
                    className="px-3 py-1.5 rounded-lg bg-blue-400 text-slate-900 text-sm font-medium cursor-pointer"
                  >
                    In Progress
                  </button>

                  <button
                    onClick={() => handleStatusChange(ticket._id, "resolved")}
                    className="px-3 py-1.5 rounded-lg bg-green-400 text-slate-900 text-sm font-medium cursor-pointer"
                  >
                    Resolved
                  </button>
                </div>

                {/* Add Comment */}
                <div className="mb-4">
                  <textarea
                    rows={3}
                    value={commentMap[ticket._id] || ""}
                    onChange={(e) =>
                      setCommentMap((prev) => ({
                        ...prev,
                        [ticket._id]: e.target.value,
                      }))
                    }
                    placeholder="Add a comment..."
                    className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-teal-400 mb-2"
                  />

                  <button
                    disabled={!commentMap[ticket._id]?.trim()}
                    onClick={() => handleCommentSubmit(ticket._id)}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 font-semibold text-sm disabled:opacity-50"
                  >
                    Submit Comment
                  </button>
                </div>

                {/* Comment History */}
                {ticket.comments?.length > 0 && (
                  <div className="border-t border-white/20 pt-4">
                    <h4 className="text-lg font-medium mb-2">Comments</h4>

                    <ul className="space-y-2 max-h-40 overflow-y-auto">
                      {ticket.comments.map((c, index) => (
                        <li
                          key={index}
                          className="text-sm bg-white/5 rounded-lg p-2"
                        >
                          <p>{c.text}</p>
                          <small className="text-gray-400">
                            By: {c.author} {/* fixed from commentedBy */}
                          </small>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default SupportDashboard;
