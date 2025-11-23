import { NavLink } from 'react-router-dom';
import { useSelector } from "react-redux";

// ====== NEW SELECTORS (from selectors.js) ======
import {
  selectFreelancersList as selectAllFreelancers,
  selectJobs as selectAllJobs,
  selectOrders as selectAllOrders,
  selectPayments as selectAllPayments,
  selectTotalEarningsByFreelancerId
} from "../../store/slices/slices.js";

const FreelanceDashboard = () => {
  // Redux state selectors
  const freelancers = useSelector(selectAllFreelancers);
  const jobs = useSelector(selectAllJobs);
  const orders = useSelector(selectAllOrders);
  const payments = useSelector(selectAllPayments);

  // Get current user from localStorage
  const currentUserData = localStorage.getItem('currentUser');
  const currentUser = currentUserData ? JSON.parse(currentUserData) : null;

  // Get freelancer profile based on user_id
  const freelancer = freelancers.find(f => f.user_id === currentUser?.user_id);

  if (!freelancer || !currentUser)
    return <div className="p-8 text-center">Loading...</div>;

  // Get freelancer's active orders
  const activeOrders = orders.filter(
    o => o.freelancer_id === freelancer.freelancer_id && o.status === "in-progress"
  );

  // Calculate earnings
  const totalEarnings = useSelector(state =>
    selectTotalEarningsByFreelancerId(state, freelancer.freelancer_id)
  );

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {currentUser?.name.split(" ")[0] || "Freelancer"}! 👋
          </h2>
          <p className="text-gray-600">
            Ready to find your next opportunity? Browse available projects below.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          {/* Active Orders */}
          <NavLink to={'active-orders'}>
            <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Orders</p>
                  <p className="text-3xl font-bold text-gray-900">{activeOrders.length}</p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </NavLink>

          {/* Hourly Rate */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Hourly Rate</p>
                <p className="text-3xl font-bold text-gray-900">${freelancer?.hourly_rate || 0}/hr</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zM12 2a10 10 0 110 20 10 10 0 010-20z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Earnings */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
                <p className="text-3xl font-bold text-gray-900">${totalEarnings}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zM12 2a10 10 0 110 20 10 10 0 010-20z" />
                </svg>
              </div>
            </div>
          </div>

          {/* AI Skill Score */}
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-pink-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">AI Skill Score</p>
                <p className="text-3xl font-bold text-gray-900">{freelancer?.ai_skill_score || 0}</p>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zM12 2a10 10 0 110 20 10 10 0 010-20z" />
                </svg>
              </div>
            </div>
          </div>

        </div>


        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Jobs Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Available Jobs</h3>
                <NavLink
                  to={"view-jobs"}
                  className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  View All →
                </NavLink>
              </div>

              <div className="space-y-6">
                {jobs.slice(0, 3).map((job) => (
                  <div
                    key={job.job_id}
                    className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-indigo-300 transition-all cursor-pointer"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                      {/* Job Info */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-indigo-800 mb-2 hover:text-indigo-900 transition-colors">
                          {job.title}
                        </h3>

                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {job.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4 text-gray-700 text-sm mb-3">
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zM12 2a10 10 0 110 20 10 10 0 010-20z" />
                            </svg>
                            <span>Budget: ${job.budget}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2-1.343-2-3-2zM12 2a10 10 0 110 20 10 10 0 010-20z" />
                            </svg>
                            <span>Duration: {job.duration_days} days</span>
                          </div>
                        </div>

                        <p className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                          {job.category}
                        </p>
                      </div>

                      {/* Apply Button */}
                      <NavLink
                        to={`job-detail/${job.job_id}`}
                        className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all"
                      >
                        Apply
                      </NavLink>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">

            {/* Create Offer */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg p-6 text-white">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-bold mb-1">Create OpenOffer</h3>
                  <p className="text-sm text-indigo-100">
                    Create an open offer for clients
                  </p>
                </div>
                <svg className="w-12 h-12 text-white/30" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>

              <NavLink
                to={"create-offer"}
                className="w-full bg-white text-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
              >
                <span>Post New Offer</span>
              </NavLink>
            </div>

            {/* Profile Info */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Info</h3>

              <div className="space-y-4">

                <div>
                  <p className="text-sm text-gray-600 mb-1">Skills</p>
                  <p className="text-sm font-medium text-gray-900">
                    {freelancer?.skills || "No skills added"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Experience Level</p>
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {freelancer?.experience_level || "Not specified"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-1">Portfolio</p>

                  {freelancer?.portfolio_link ? (
                    <a
                      href={freelancer.portfolio_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                    >
                      View Portfolio →
                    </a>
                  ) : (
                    <p className="text-sm text-gray-600">No portfolio linked</p>
                  )}
                </div>

              </div>
            </div>

            {/* Active Orders */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Active Orders ({activeOrders.length})
              </h3>

              <div className="space-y-3">
                {activeOrders.length > 0 ? (
                  activeOrders.map(order => (
                    <div key={order.order_id} className="border-l-4 border-indigo-500 pl-4 py-2">
                      <p className="text-sm font-semibold text-gray-900">
                        Order #{order.order_id}
                      </p>
                      <p className="text-xs text-gray-600">
                        Amount: ${order.total_amount}
                      </p>
                      <p className="text-xs text-indigo-600">
                        Delivery: {order.delivery_date}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-600">No active orders</p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-md p-6 text-white">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>

              <div className="space-y-3">
                <button className="w-full bg-white/20 hover:bg-white/30 py-3 rounded-lg font-semibold transition-all">
                  View All Jobs
                </button>

                <button className="w-full bg-white/20 hover:bg-white/30 py-3 rounded-lg font-semibold transition-all">
                  View Proposals
                </button>

                <button className="w-full bg-white/20 hover:bg-white/30 py-3 rounded-lg font-semibold transition-all">
                  Earnings Report
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default FreelanceDashboard;
