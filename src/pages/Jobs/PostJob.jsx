import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectClientByUserId, addJob } from "../../store/slices/slices.js";

const PostJob = () => {
  const dispatch = useDispatch();
  const { client_id } = useParams();

  // Select client from Redux using client_id
  const currentClient = useSelector((state) =>
    selectClientByUserId(state, Number(client_id))
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    skills: "",
    category: "",
    budget: "",
    duration_days: "",
    deadline: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentClient) return;

    const jobData = {
      job_id: Date.now(), // unique job_id
      client_id: currentClient.client_id, // use client slice id
      title: formData.title,
      description: formData.description,
      category: formData.category || "General",
      budget: Number(formData.budget),
      duration_days: Number(formData.duration_days),
      skills: formData.skills.split(",").map((s) => s.trim()),
      status: "open",
      posted_at: new Date().toISOString().split("T")[0],
      deadline: formData.deadline,
    };

    console.log("Job Posted:", jobData);

    dispatch(addJob(jobData));

    setFormData({
      title: "",
      description: "",
      skills: "",
      category: "",
      budget: "",
      duration_days: "",
      deadline: "",
    });
  };

  if (!currentClient) {
    return (
      <div className="w-full flex justify-center items-center py-20">
        <p className="text-gray-500 text-xl">Loading Client Data...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">
          Post a Job as {currentClient.company_name}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputField
            label="Job Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Frontend Developer for E-Commerce App"
          />

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              placeholder="Need a frontend developer with React and TailwindCSS..."
              className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <InputField
            label="Skills (comma separated)"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="React, TailwindCSS, JavaScript"
          />

          <InputField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Web Development"
          />

          <InputField
            label="Budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            placeholder="450"
            type="number"
          />

          <InputField
            label="Duration (days)"
            name="duration_days"
            value={formData.duration_days}
            onChange={handleChange}
            placeholder="7"
            type="number"
          />

          <InputField
            label="Deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            placeholder="2024-02-10"
            type="date"
          />

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200"
          >
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
};

// Reusable Input Component
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

export default PostJob;
