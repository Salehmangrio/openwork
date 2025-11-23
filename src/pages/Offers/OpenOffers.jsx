import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { 
  selectOpenOffers, 
  selectUsersList, 
  selectFreelancersList 
} from "../../store/slices/slices.js";

const OpenOffers = () => {
  const openOffers = useSelector(selectOpenOffers);    // offers array
  const usersList = useSelector(selectUsersList);      // users array
  const freelancers = useSelector(selectFreelancersList); // freelancers array

  // FIXED: Correct Freelancer → User Finder
  const getFreelancerName = (freelancer_id) => {
    const freelancer = freelancers.find(
      (f) => f.freelancer_id === freelancer_id
    );

    if (!freelancer) return "Unknown Freelancer";

    const user = usersList.find(
      (u) => u.user_id === freelancer.user_id
    );

    return user ? user.name : "Unknown Freelancer";
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-7xl mx-auto">

        {/* Page Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10">
          Open Freelancer Offers
        </h1>

        {/* No Offers */}
        {openOffers.length === 0 && (
          <p className="text-center text-gray-500 text-lg">
            No offers available at the moment.
          </p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {openOffers.map((offer) => (
            <div
              key={offer.offer_id}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all flex flex-col"
            >
              <div className="flex items-start space-x-4 mb-4">

                {/* Avatar */}
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {offer.title.charAt(0).toUpperCase()}
                </div>

                {/* Title */}
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900">
                    {offer.title}
                  </h4>
                  <p className="text-sm text-indigo-600 font-medium">
                    {offer.category}
                  </p>
                </div>

                {/* Price */}
                <div className="text-right flex-shrink-0">
                  <p className="text-lg font-bold text-gray-900">
                    ${offer.price}
                  </p>
                  <p className="text-xs text-gray-500">
                    {offer.delivery_time_days} days
                  </p>
                </div>
              </div>

              {/* Desc */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {offer.description}
              </p>

              {/* Freelancer Name */}
              <p className="text-sm text-gray-500 mb-4">
                🕒 Posted on: {offer.created_at} • 👤 {getFreelancerName(offer.freelancer_id)}
              </p>

              {/* Skills */}
              {offer.skills?.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-gray-700 mb-2">
                    Skills I have:
                  </h2>
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

              {/* Buttons */}
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
  );
};

export default OpenOffers;
