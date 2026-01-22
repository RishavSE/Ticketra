import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('No token found, redirect to login.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
           `${import.meta.env.VITE_API_URL}/tickets`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTickets(response.data);
      } catch (error) {
        console.error('Failed to fetch tickets:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const getStatusClass = (status) => {
    if (status === 'pending') return 'status pending';
    if (status === 'in progress') return 'status in-progress';
    if (status === 'resolved') return 'status resolved';
    return 'status';
  };

 const handleCommentSubmit = async () => {
  if (!commentText.trim() || !selectedTicket?._id) return;

  setSubmitting(true);
  const token = localStorage.getItem('token');

  try {
    const response = await axios.put(
       `${import.meta.env.VITE_API_URL}/tickets/update/${selectedTicket._id}`,
      { comment: commentText.trim() },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const updatedTicket = response.data.ticket;

    setSelectedTicket(updatedTicket);

    setTickets((prev) =>
      prev.map((t) =>
        t._id === updatedTicket._id ? updatedTicket : t
      )
    );

    setCommentText('');
  } catch (error) {
    console.error(
      'Failed to submit comment:',
      error.response?.data || error.message
    );
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
  <h2 className="text-2xl font-semibold text-white mb-4">
    My <span className="text-teal-400">Tickets</span>
  </h2>

  {loading ? (
    <p className="text-gray-300">Loading...</p>
  ) : tickets.length === 0 ? (
    <p className="text-gray-400">No tickets found.</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="text-left text-sm text-gray-300 border-b border-white/20">
            <th className="py-3 px-2">Title</th>
            <th className="py-3 px-2">Status</th>
            <th className="py-3 px-2">Created At</th>
            <th className="py-3 px-2">View</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr
              key={ticket._id}
              className="border-b border-white/10 text-gray-200 hover:bg-white/5 transition"
            >
              <td className="py-3 px-2">{ticket.title}</td>

              <td className="py-3 px-2">
                <span className={getStatusClass(ticket.status)}>
                  {ticket.status}
                </span>
              </td>

              <td className="py-3 px-2">
                {new Date(ticket.createdAt).toLocaleDateString()}
              </td>

              <td className="py-3 px-2">
                <button
                  onClick={() => setSelectedTicket(ticket)}
                  className="text-sm px-3 py-1 rounded-lg bg-teal-400 text-slate-900 font-medium hover:opacity-90 transition"
                >
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}

  {/* ===== MODAL ===== */}
  {selectedTicket && (
  <div className="mb-8 bg-slate-900 border border-white/20 rounded-2xl p-6 shadow-xl">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-semibold text-white">
        Ticket Details
      </h3>

      <button
        onClick={() => setSelectedTicket(null)}
        className="text-sm px-3 py-1 rounded-lg bg-red-500 hover:bg-red-600 text-white"
      >
        Close
      </button>
    </div>

    <p className="text-gray-300 mb-2">
      <strong>Title:</strong> {selectedTicket.title}
    </p>

    <p className="text-gray-300 mb-2">
      <strong>Description:</strong> {selectedTicket.description}
    </p>

    <p className="text-gray-300 mb-4">
      <strong>Status:</strong>{" "}
      <span className={getStatusClass(selectedTicket.status)}>
        {selectedTicket.status}
      </span>
    </p>

    {/* COMMENTS */}
    <div className="border-t border-white/20 pt-4">
      <h4 className="text-lg font-medium mb-3 text-white">
        Comments
      </h4>

      <div className="max-h-40 overflow-y-auto space-y-2 mb-4">
        {selectedTicket.comments?.length > 0 ? (
          selectedTicket.comments.map((comment, index) => (
            <div
              key={index}
              className="text-sm bg-white/5 rounded-lg p-2 text-gray-200"
            >
              <strong className="text-teal-400">
                {comment.author || "Support"}:
              </strong>{" "}
              {comment.text}
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-sm">
            No comments yet.
          </p>
        )}
      </div>

      {/* ADD COMMENT */}
      <textarea
        rows="3"
        placeholder="Add a comment..."
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="w-full px-3 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:border-teal-400 mb-3"
      />

      <button
        onClick={handleCommentSubmit}
        disabled={submitting}
        className="px-4 py-2 rounded-lg bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-900 font-semibold text-sm disabled:opacity-50"
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </div>
  </div>
)}
</div>

  );
};

export default TicketList;
