import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  selectUserById,
  selectClientByUserId,
  selectFreelancerByUserId,
  selectAverageRatingForUser,
  selectOrdersByClientId,
  selectFeedbackForUser,
  selectOrdersByFreelancerId,
  selectUserById as selectReviewerById,
  selectOffersByFreelancerId,
  selectJobsByClientId
} from "../../store/slices/slices.js";

import {
  AdminCard,
  ClientCard,
  FreelancerCard,
  InfoRow,
  StatCard
} from "../../components/profile";

import { LogoutButton } from "../../components/buttons";

const ProfilePage = () => {
  const { id } = useParams();
  const userId = parseInt(id);

  // Main user
  const user = useSelector((state) => selectUserById(state, userId));
  const clientInfo = useSelector((state) => selectClientByUserId(state, userId));
  const freelancerInfo = useSelector((state) => selectFreelancerByUserId(state, userId));

  // Feedback & Stats
  const feedbackList = useSelector((state) => selectFeedbackForUser(state, userId));
  const averageRating = useSelector((state) => selectAverageRatingForUser(state, userId));

  // Orders for Completed Count
  const clientOrders = clientInfo
    ? useSelector((state) => selectOrdersByClientId(state, clientInfo.client_id))
    : [];

  const freelancerOrders = freelancerInfo
    ? useSelector((state) => selectOrdersByFreelancerId(state, freelancerInfo.freelancer_id))
    : [];

  const completedOrdersCount = [...clientOrders, ...freelancerOrders].filter(
    (o) => o.status === "completed"
  ).length;

  if (!user) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <p className="text-gray-500 text-xl">User not found...</p>
      </div>
    );
  }

  // ROLE
  const isClient = user.role === "client";
  const isFreelancer = user.role === "freelancer";
  const isAdmin = user.role === "admin";

  // NEW: ROLE BASED QUERY
  const openOffers = isFreelancer && freelancerInfo
    ? useSelector((state) =>
      selectOffersByFreelancerId(state, freelancerInfo.freelancer_id)
    )
    : [];

  const openJobs = isClient && clientInfo
    ? useSelector((state) =>
      selectJobsByClientId(state, clientInfo.client_id)
    )
    : [];

  // Helper
  const getReviewerName = (reviewerId) => {
    const reviewer = useSelector((state) => selectReviewerById(state, reviewerId));
    return reviewer ? reviewer.name : "Anonymous User";
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">


      {/* HEADER CARD */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 flex flex-col md:flex-row items-center gap-8">

          <div className="relative">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-5xl font-bold bg-indigo-800">
              {user.name.charAt(0).toUpperCase()}
            </div>
            {user.suspended_status && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-semibold">
                Suspended
              </span>
            )}
          </div>

          <div className="text-center md:text-left slect-none">
            <h1 className="text-4xl font-bold">{user.name}</h1>
            <p className="text-xl opacity-90 mt-1">{user.email}</p>

            <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
              <span
                className={`px-5 py-2 rounded-full text-sm font-bold ${isAdmin
                  ? "bg-yellow-500"
                  : isFreelancer
                    ? "bg-green-500"
                    : "bg-blue-500"
                  }`}
              >
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </span>

              {isFreelancer && freelancerInfo && (
                <span className="px-5 py-2 bg-white text-indigo-700 rounded-full font-semibold">
                  ${freelancerInfo.hourly_rate}/hr
                </span>
              )}
            </div>
          </div>

        </div>

        <div className="lg:hidden ">
          <LogoutButton />
        </div>
      </div>




      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT COLUMN */}
        <div className="space-y-6">

          {/* BASIC INFO */}
          <div className="bg-white p-6 rounded-xl shadow-[1px_-1px_5px_1px_blue] ">
            <h2 className="text-2xl font-bold text-indigo-700 mb-5">Basic Information</h2>

            <div className="space-y-4 text-gray-700">
              <InfoRow label="Full Name" value={user.name} />
              <InfoRow label="Email" value={user.email} />
              <InfoRow label="Phone" value={user.phone || "Not provided"} />
              <InfoRow
                label="Member Since"
                value={new Date(user.created_at).toLocaleDateString()}
              />
              <InfoRow label="Completed Orders" value={completedOrdersCount} bold />
            </div>
          </div>

          {isClient && clientInfo && <ClientCard info={clientInfo} />}
          {isFreelancer && freelancerInfo && <FreelancerCard info={freelancerInfo} />}
          {isAdmin && <AdminCard />}

          <NavLink to={`../edit-profile/${userId}`} className="block">
            <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition">
              Edit Profile
            </button>
          </NavLink>

          <div className="lg:block hidden">
            <LogoutButton />
          </div>
        </div>




        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-8">


          {/* STATS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            <StatCard label="Completed Jobs" value={completedOrdersCount} color="indigo" />
            <StatCard
              label="Rating"
              value={averageRating > 0 ? averageRating.toFixed(1) : "—"}
              color="yellow"
            />

            {isFreelancer && freelancerInfo && (
              <>
                <StatCard label="AI Score" value={freelancerInfo.ai_skill_score} color="green" />
                <StatCard label="Hourly Rate" value={`$${freelancerInfo.hourly_rate}`} color="purple" />
              </>
            )}

            {isClient && clientInfo && (
              <>
                <StatCard label="Total Spent" value={`$${clientInfo.total_spent}`} color="blue" />
                <StatCard label="Active Orders" value={clientOrders.length} color="teal" />
              </>
            )}
          </div>




          {/* ABOUT */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4">About</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {isFreelancer && freelancerInfo?.bio ||
                isClient && clientInfo?.bio ||
                "This user has not added a bio yet."}
            </p>
          </div>



          {/* =============================== */}
          {/*   ROLE BASED SECTION BELOW     */}
          {/* =============================== */}

          {/* FREELANCER → SHOW OPEN OFFERS */}
          {isFreelancer && (
            <div className="bg-white rounded-xl p-6 shadow-xl select-none">
              <h2 className="text-2xl font-bold text-purple-700 mb-4">My Open Offers</h2>

              {openOffers.length === 0 ? (
                <p className="text-gray-500">You haven't created any open offers.</p>
              ) : (
                <div className="space-y-4">
                  {openOffers.map((offer) => (
                    <div
                      key={offer.offer_id}
                      className="p-4 border rounded-xl hover:bg-indigo-50 transition shadow-sm flex items-start justify-between"
                    >
                      <div>
                        <h3 className="font-bold text-lg text-indigo-700">{offer.title}</h3>
                        <p className="text-gray-700 mt-1">{offer.description}</p>

                        {/* PRICE BADGE */}
                        <span className="inline-block mt-3 px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full">
                          ${offer.price}
                        </span>
                      </div>

                      {/* EDIT BUTTON */}
                      <NavLink to={`../edit-offer/${offer.offer_id}`}
                        className="ml-4 px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm shadow"
                      >
                        Edit
                      </NavLink>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}



          {/* CLIENT → SHOW OPEN JOBS */}
          {isClient && (
            <div className="bg-white rounded-xl p-6 shadow-xl select-none">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">My Open Jobs</h2>

              {openJobs.length === 0 ? (
                <p className="text-gray-500">You haven't created any open jobs.</p>
              ) : (
                <div className="space-y-4">
                  {openJobs.map((job) => (
                    <div
                      key={job.job_id}
                      className="p-4 border rounded-xl hover:bg-blue-50 transition shadow-sm flex items-start justify-between"
                    >
                      <div>
                        <h3 className="font-bold text-lg text-blue-700">{job.title}</h3>
                        <p className="text-gray-700 mt-1">{job.description}</p>

                        {/* BUDGET BADGE */}
                        <span className="inline-block mt-3 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                          ${job.budget}
                        </span>
                      </div>

                      {/* EDIT BUTTON */}
                      <button
                        className="ml-4 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm shadow"
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}




          {/* RATING SUMMARY */}
          {feedbackList.length > 0 && (
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-xl shadow-lg border border-yellow-200">
              <h2 className="text-2xl font-bold text-amber-800 mb-4">Overall Rating</h2>

              <div className="flex items-center gap-6">
                <div className="text-6xl font-bold text-amber-600">{averageRating.toFixed(1)}</div>
                <div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-4xl ${i < Math.round(averageRating)
                          ? "text-amber-500"
                          : "text-gray-300"
                          }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700 text-lg mt-1">
                    Based on {feedbackList.length} review
                    {feedbackList.length > 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </div>
          )}



          {/* INDIVIDUAL FEEDBACK */}
          {feedbackList.length > 0 && (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-5">
                <h2 className="text-2xl font-bold">Reviews</h2>
              </div>

              <div className="divide-y divide-gray-200">
                {feedbackList.map((fb) => (
                  <div key={fb.feedback_id} className="p-6 hover:bg-gray-50 transition">

                    <div className="flex items-start justify-between">
                      <div className="flex-1">

                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-xl ${i < fb.rating ? "text-yellow-500" : "text-gray-300"
                                  }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>

                          <span className="font-semibold text-gray-800">
                            {getReviewerName(fb.reviewer_id)}
                          </span>

                          <span className="text-sm text-gray-500">
                            • {new Date(fb.created_at).toLocaleDateString()}
                          </span>
                        </div>

                        <p className="text-gray-700 mt-2 leading-relaxed">
                          {fb.review_text || "No comment provided."}
                        </p>

                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}




          {/* NO FEEDBACK */}
          {feedbackList.length === 0 && (
            <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-12 text-center">
              <div className="text-gray-500">

                <svg
                  className="w-16 h-16 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <p className="text-xl font-medium">No reviews yet</p>
                <p className="mt-2">This user hasn't received any feedback.</p>

              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
