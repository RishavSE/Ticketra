import React from 'react';
import Navbar from './Navbar';
import TicketForm from './Ticketform';
import TicketList from './Ticketlist';

const UserDashboard = () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

 
  const [refreshKey, setRefreshKey] = React.useState(0);
  const refreshTickets = () => setRefreshKey((oldKey) => oldKey + 1);

  return (
    <div className="min-h-screen bg-slate-900 text-white ">
  {/* Navbar */}
  <Navbar user={user} onLogout={handleLogout} />

  {/* Main Content */}
  <div className="max-w-5xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-semibold mb-6">
      <span className="text-teal-400">User Dashboard</span>
    </h1>

    {/* Ticket Form Card */}
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 mb-8 shadow-xl">
      <TicketForm onTicketCreated={refreshTickets} />
    </div>

    {/* Ticket List Card */}
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
      <TicketList key={refreshKey} />
    </div>
  </div>
</div>

  );
};

export default UserDashboard;
