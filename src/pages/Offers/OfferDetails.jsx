import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectOpenOffers as selectOffers, selectUsersList } from "../../store/slices/slices.js";

const OfferDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const offers = useSelector(selectOffers);
  const usersList = useSelector(selectUsersList);

  const offer = offers.find((o) => o.offer_id === parseInt(id));
  if (!offer) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
        Offer not found.
      </div>
    );
  }

  const freelancer = usersList.find((u) => u.user_id === offer.freelancer_id);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {offer.title}
          </h1>
          <span className="text-lg font-semibold text-green-600">
            ${offer.price}
          </span>
        </div>

        {/* Category & Delivery */}
        <div className="flex flex-wrap gap-4 mb-6">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full font-medium">
            {offer.category}
          </span>
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
            Delivery: {offer.delivery_time_days} days
          </span>
        </div>

        {/* Freelancer Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {freelancer ? freelancer.name.charAt(0).toUpperCase() : "F"}
          </div>
          <div>
            <p className="text-gray-800 font-semibold">
              {freelancer ? freelancer.name : "Unknown Freelancer"}
            </p>
            <p className="text-gray-500 text-sm">Posted on: {offer.created_at}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Description</h2>
          <p className="text-gray-600">{offer.description}</p>
        </div>

        {/* Skills */}
        {offer.skills && offer.skills.length > 0 && (
          <div className="mb-6">
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
        <div className="flex flex-wrap gap-4">
          <button
            className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all"
          >
            Contact Freelancer
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex-1 px-6 py-3 border-2 border-indigo-600 text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-all"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferDetails;
