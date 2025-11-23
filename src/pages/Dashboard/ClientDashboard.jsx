import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";
import {
  selectUsersList,
  selectClientsList,
  selectJobs,
  selectJobApplications,
  selectOpenOffers,
  selectOrders,
  selectTotalSpendByClientId,
  selectFreelancersList
} from "../../store/slices/slices.js";

const ClientDashboard = () => {
  const users = useSelector(selectUsersList);
  const clients = useSelector(selectClientsList);
  const jobs = useSelector(selectJobs);
  const jobApplications = useSelector(selectJobApplications);
  const openOffers = useSelector(selectOpenOffers);
  const orders = useSelector(selectOrders);
  const freelancers = useSelector(selectFreelancersList);

  // Get current user from localStorage
  const currentUserData = localStorage.getItem('currentUser');
  const currentUser = currentUserData ? JSON.parse(currentUserData) : null;

  // Get current client profile
  const currentClient = clients.find(c => c.user_id === currentUser?.user_id);

  if (!currentClient || !currentUser) return <div className="p-8 text-center">Loading...</div>;

  // Get client's jobs
  const clientJobs = jobs.filter(j => j.client_id === currentClient.client_id);

  // Get client's active orders
  const clientOrders = orders.filter(o => o.client_id === currentClient.client_id);

  // Get job applications for client's jobs
  const clientApplications = jobApplications.filter(app =>
    clientJobs.some(job => job.job_id === app.job_id)
  );

  // Calculate stats
  const activeJobsCount = clientJobs.filter(j => j.status === 'open').length;
  const totalApplications = clientApplications.length;

  const totalSpent = useSelector(state =>
    selectTotalSpendByClientId(state, currentClient.client_id)
  );

  // Get category breakdown
  const categoryCount = openOffers.reduce((acc, offer) => {
    acc[offer.category] = (acc[offer.category] || 0) + 1;
    return acc;
  }, {});

  const getFreelancerName = (freelancer_id) => {
    const freelancer = freelancers.find(f => f.freelancer_id === freelancer_id);
    if (!freelancer) return "Unknown Freelancer";

    const user = users.find(u => u.user_id === freelancer.user_id);
    return user ? user.name : "Unknown Freelancer";
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {currentUser?.name?.split(" ")[0]}! 👋
          </h2>
          <p className="text-gray-600">
            Find the perfect freelancer for your project. Browse OpenOffers or post a new job.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Jobs</p>
                <p className="text-3xl font-bold text-gray-900">{activeJobsCount}</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Orders</p>
                <p className="text-3xl font-bold text-gray-900">{clientOrders.filter(o => o.status === 'in-progress').length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Spent</p>
                <p className="text-3xl font-bold text-gray-900">${totalSpent}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-pink-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Proposals Received</p>
                <p className="text-3xl font-bold text-gray-900">{totalApplications}</p>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - OpenOffers List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Available OpenOffers</h3>
                  <p className="text-sm text-gray-600 mt-1">Browse skilled freelancers ready to work</p>
                </div>
                <NavLink to={"view-offers"} className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold">
                  View All →
                </NavLink>
              </div>

              <div className="space-y-6">
                {openOffers.slice(0, 4).map((offer) => (
                  <div
                    key={offer.offer_id}
                    className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all flex flex-col"
                  >
                    {/* Top Section */}
                    <div className="flex items-start space-x-4 mb-4">
                      {/* Avatar */}
                      <div className="w-14 h-14 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {offer.title.charAt(0).toUpperCase()}
                      </div>

                      {/* Title & Category */}
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-900">
                          {offer.title}
                        </h4>
                        <p className="text-sm text-indigo-600 font-medium">
                          {offer.category}
                        </p>
                      </div>

                      {/* Price & Delivery */}
                      <div className="text-right flex-shrink-0">
                        <p className="text-lg font-bold text-gray-900">
                          ${offer.price}
                        </p>
                        <p className="text-xs text-gray-500">
                          {offer.delivery_time_days} days
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {offer.description}
                    </p>

                    {/* Freelancer Info */}
                    <p className="text-sm text-gray-500 mb-4">
                      🕒 Posted on: {offer.created_at} • 👤 {getFreelancerName(offer.freelancer_id)}
                    </p>

                    {/* Skills */}
                    {offer.skills && offer.skills.length > 0 && (
                      <div className="mb-4">
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Skills I have: </h2>
                        <div className="flex flex-wrap gap-2">
                          {offer.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="bg-indigo-100 text-indigo-700 text-sm px-3 py-1 rounded-full font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    {/* Action Buttons */}
                    <div className="mt-auto flex flex-wrap gap-2">
                      <button className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg text-center">
                        Contact Freelancer
                      </button>
                      <NavLink
                        to={`offer-detail/${offer.offer_id}`}
                        state={{ offer }}
                        className="flex-1 px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-all text-center"
                      >
                        View Details
                      </NavLink>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Right Column - Actions & Info */}
          <div className="space-y-6">
            {/* Create OpenJob Button */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold mb-1">Create OpenJob</h3>
                  <p className="text-sm text-indigo-100">Post a job to find skilled freelancers</p>
                </div>
                <svg className="w-12 h-12 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <NavLink to={`post-job/${currentClient.client_id}`} className="w-full bg-white text-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <span>Post New Job</span>
              </NavLink>
            </div>

            {/* Active Jobs */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Active Jobs</h3>
              <div className="space-y-4">
                {
                  clientJobs.length > 0 ? clientJobs.slice(0, 5).map((job, idx) => (
                    <div key={idx} className="border-l-4 border-indigo-500 pl-4 py-2">
                      <h4 className="font-semibold text-gray-900 text-sm">{job.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {clientApplications.filter(a => a.job_id === job.job_id).length} proposals received
                      </p>
                      <p className="text-xs text-indigo-600 mt-1">Budget: ${job.budget}</p>
                    </div>
                  )) : (
                    <p className="text-sm text-gray-600">No active jobs posted yet</p>
                  )
                }
              </div>
              <button className="w-full mt-4 text-sm text-indigo-600 hover:text-indigo-700 font-semibold">
                View All Jobs →
              </button>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Browse by Category</h3>
              <div className="space-y-2">
                {
                  Object.entries(categoryCount).map(([category, count], idx) => (
                    <button key={idx} className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-indigo-50 rounded-lg transition-colors group">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-900 group-hover:text-indigo-600">{category}</span>
                        <span className="text-xs text-gray-500">{count} offers</span>
                      </div>
                    </button>
                  ))
                }
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-md p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-lg font-semibold transition-all">
                  View All Proposals
                </button>
                <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-lg font-semibold transition-all">
                  Manage Contracts
                </button>
                <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm py-3 rounded-lg font-semibold transition-all">
                  Payment History
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
