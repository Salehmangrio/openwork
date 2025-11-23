import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectJobById, selectClientById, selectUserById } from "../../store/slices/slices.js";

const JobDetails = () => {
  const { id } = useParams(); // get job_id from URL
  const jobId = parseInt(id, 10);

  // Get job from Redux
  const job = useSelector(state => selectJobById(state, jobId));

  // Get client info
  const client = job ? useSelector(state => selectClientById(state, job.client_id)) : null;
  const User = client ? useSelector(state => selectUserById(state, client.user_id)) : null;

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg sm:text-xl text-gray-600 bg-gray-100">
        No job details available.
      </div>
    );
  }

  // Dummy skills for frontend display if not present
  const skills = job.skills;

  return (
    <div className="min-h-screen px-4 sm:px-6 py-10 bg-gray-100 flex justify-center items-start">
      <div className="w-full max-w-7xl bg-white p-6 sm:p-10 rounded-2xl shadow-xl shadow-gray-400 self-start flex flex-col justify-between">


        {/* Job Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-green-900 leading-tight">
          {job.title}
        </h2>

        {/* Client Info */}
        <p className="text-gray-600 mt-1 text-sm sm:text-base">
          Posted by <span className="font-semibold">{User.name}</span> for <span className="font-semibold">{client?.company_name || 'Client'}</span> ({client?.location || 'Remote'})
        </p>

        {/* Job Metadata */}
        <div className="flex flex-wrap gap-3 sm:gap-4 mt-4 text-gray-700">
          <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm flex items-center">
            📍 {client?.location || 'Remote'}
          </span>

          <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm flex items-center">
            ⏱ Posted on {job.posted_at}
          </span>

          <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm flex items-center">
            💰 ${job.budget}
          </span>

          <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm flex items-center">
            🗓 Duration: {job.duration_days} days
          </span>

          <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm flex items-center">
            ⏳ Deadline: {job.deadline}
          </span>
        </div>

        {/* Job Description */}
        <div className="mt-8">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            Job Description
          </h3>
          <p className="mt-3 text-gray-700 leading-relaxed text-sm sm:text-base">
            {job.description}
          </p>
        </div>

        {/* Required Skills */}
        <div className="mt-8">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            Required Skills
          </h3>
          <div className="flex flex-wrap gap-2 sm:gap-3 mt-3">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="py-2 px-4 text-xs sm:text-sm bg-indigo-100 text-indigo-700 rounded-xl font-medium shadow-sm hover:shadow-md transition"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <button
          className="
            w-full mt-10 py-3 
            bg-gradient-to-r from-indigo-600 to-purple-600
            text-white text-base sm:text-lg font-semibold
            rounded-xl shadow-md
            hover:opacity-90 transition-all
          "
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
