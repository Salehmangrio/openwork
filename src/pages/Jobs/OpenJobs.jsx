import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  selectJobs,
  selectClientsList,
  selectUsersList,
} from "../../store/slices/slices.js";

const OpenJobs = () => {
  const jobs = useSelector(selectJobs);
  const clients = useSelector(selectClientsList);
  const users = useSelector(selectUsersList);

  const getClient = (client_id) => clients.find((c) => c.client_id === client_id);
  const getUser = (user_id) => users.find((u) => u.user_id === user_id);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12">
          Available Job Opportunities
        </h1>

        {/* No Jobs */}
        {jobs.length === 0 && (
          <p className="text-center text-gray-500 text-lg">
            No jobs found. Please check back later.
          </p>
        )}

        {/* Job List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {jobs.map((job) => {
            const client = getClient(job.client_id);
            const user = getUser(client?.user_id);

            return (
              <div
                key={job.job_id}
                className="bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="space-y-3">
                  {/* Job Title */}
                  <h2 className="text-xl md:text-2xl font-bold text-indigo-700 hover:text-indigo-900 transition-colors">
                    {job.title}
                  </h2>

                  {/* Client Info */}
                  {client && (
                    <p className="text-gray-700 text-sm sm:text-base">
                      👔 {client.company_name} • 📍 {client.location} (Remote)
                    </p>
                  )}

                  {/* Posted By */}
                  <p className="text-gray-600 text-sm sm:text-base">
                    👤 Posted by: {user ? user.name : "Unknown User"}
                  </p>

                  {/* Job Description */}
                  <p className="text-gray-600 text-sm sm:text-base line-clamp-3">
                    <span className="font-semibold">Description:</span> {job.description}
                  </p>

                  {/* Dates */}
                  <p className="text-rose-700 text-sm sm:text-base font-medium">
                    ⏳ Posted: {job.posted_at} • Deadline: {job.deadline}
                  </p>

                  {/* Budget */}
                  <p className="text-green-600 font-medium text-sm sm:text-base">
                    💲 Budget: ${job.budget}
                  </p>

                  {/* Skills */}
                  {job.skills && job.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {job.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-indigo-100 text-indigo-700 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Apply Button */}
                <NavLink
                  to={`../job-detail/${job.job_id}`}
                  state={{ job }}
                  className="mt-5 inline-block w-full text-center px-5 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-sm sm:text-base hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg"
                >
                  Apply
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OpenJobs;
