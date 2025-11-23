import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react";

const ClientsLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Get current user from localStorage
  const currentUserData = localStorage.getItem("currentUser");
  const currentUser = currentUserData ? JSON.parse(currentUserData) : null;

  // Get client data from Redux
  const clients = useSelector((state) => state.clients?.list || []);
  const currentClient = clients.find(
    (c) => c.user_id === currentUser?.user_id
  );

  if (!currentClient || !currentUser)
    return (
      <div className="p-8 text-center text-gray-600">Loading...</div>
    );

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <NavLink to={"/client"}>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  OpenWork
                </h1>
              </NavLink>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for freelancers, skills, services..."
                  className="w-full px-4 py-2.5 pl-12 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                />
                <svg
                  className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <NavLink to={`notification/${parseInt(currentUser?.user_id)}`} className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </NavLink>

              <NavLink
                to={"chat"}
                className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full"></span>
              </NavLink>

              <NavLink to={`profile/${currentClient.user_id}`}>
                <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {currentUser.name}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">Client</p>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer hover:shadow-lg transition-all">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                </div>
              </NavLink>
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4">
            <input
              type="text"
              placeholder="Search for freelancers, skills, services..."
              className="w-full px-4 py-2 mb-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
            />
            <div className="flex flex-col gap-3">
              <NavLink
                to={"chat"}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                Chat
              </NavLink>
              <NavLink
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                to={`profile/${currentClient.user_id}`}
                className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                Profile
              </NavLink>
            </div>
          </div>
        )}
      </nav>

      {/* Outlet for sub-pages */}
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default ClientsLayout;
