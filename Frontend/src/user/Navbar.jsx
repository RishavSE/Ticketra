import React from 'react';

const Navbar = ({ user, onLogout }) => {
  return (
   <nav className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-6 py-3 flex items-center justify-between shadow-lg">
  {/* Logo */}
  <div className="text-xl font-semibold tracking-wide ml-6">
    <span className="text-teal-400 ">Ticketra</span>
  </div>

  {/* Right Section */}
  <div className="flex items-center gap-4 ">
    {user ? (
      <>
        <span className="text-sm text-gray-300">
          Welcome,{" "}
          <strong className="text-white">
            {user.name || user.email}
          </strong>
        </span>

        <button
          onClick={onLogout}
          className="px-4 py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-sm font-medium transition"
        >
          Logout
        </button>
      </>
    ) : (
      <a
        href="/login"
        className="text-sm font-medium text-teal-400 hover:underline"
      >
        Login
      </a>
    )}
  </div>
</nav>

  );
};

export default Navbar;
