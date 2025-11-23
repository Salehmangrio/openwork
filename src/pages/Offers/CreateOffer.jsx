import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { sliceReducers } from "../../store/slices/slices.js"; // contains openOffersSlice
import { openOffersSlice } from "../../store/slices/slices.js"; // import actions

const OfferCreatePage = () => {
  const dispatch = useDispatch();

  // Get current user from localStorage
  const currentUserData = localStorage.getItem('currentUser');
  const currentUser = currentUserData ? JSON.parse(currentUserData) : null;

  // Redux state
  const freelancers = useSelector(state => state.freelancers.list || []);
  const currentFreelancer = freelancers.find(f => f.user_id === currentUser?.user_id);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    skills: "",
    rate: "",
    completed: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentFreelancer) return;

    const newOffer = {
      offer_id: Date.now(),
      freelancer_id: currentFreelancer.freelancer_id,
      title: formData.title,
      category: formData.category,
      description: formData.description,
      skills: formData.skills.split(",").map(s => s.trim()),
      price: parseFloat(formData.rate) || 0,
      delivery_time_days: parseInt(formData.completed) || 1,
      created_at: new Date().toISOString(),
    };

    dispatch(openOffersSlice.actions.addOffer(newOffer));
    console.log("Offer Created:", newOffer);

    setFormData({
      title: "",
      category: "",
      description: "",
      skills: "",
      rate: "",
      completed: "",
    });
  };

  if (!currentFreelancer) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <p className="text-gray-500 text-xl">Loading Freelancer Data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">
          Create Offer for {currentFreelancer.name}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField label="Title" name="title" value={formData.title} onChange={handleChange} placeholder="Full Stack Developer" />
          <InputField label="Category" name="category" value={formData.category} onChange={handleChange} placeholder="Web Development" />
          <div>
            <label className="block text-gray-700 font-medium mb-1">Skills (comma separated)</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <InputField label="Rate" name="rate" value={formData.rate} onChange={handleChange} placeholder="80" />
          <InputField label="Delivery Days" name="completed" type="number" value={formData.completed} onChange={handleChange} placeholder="7" />
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Expert in React, Node.js, and MongoDB..."
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200">
            Create Offer
          </button>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, placeholder, type = "text" }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    />
  </div>
);

export default OfferCreatePage;
