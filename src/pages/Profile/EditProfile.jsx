// EditProfilePage.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    selectUserById,
    selectClientByUserId,
    selectFreelancerByUserId,
    updateUser,
    updateClient,
    updateFreelancer,
    updateSkills,
    updateHourlyRate,
} from "../../store/slices/slices.js";
import { toast } from "react-hot-toast"; 

const EditProfilePage = () => {
    const { id } = useParams();
    const userId = parseInt(id);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector((state) => selectUserById(state, userId));
    const clientInfo = useSelector((state) => selectClientByUserId(state, userId));
    const freelancerInfo = useSelector((state) => selectFreelancerByUserId(state, userId));

    const isClient = user?.role === "client";
    const isFreelancer = user?.role === "freelancer";

    // Form state
    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        profile_image: user?.profile_image || "",
        // Client fields
        company_name: clientInfo?.company_name || "",
        organization_type: clientInfo?.organization_type || "",
        location: clientInfo?.location || "",
        bio: clientInfo?.bio || "",
        // Freelancer fields
        freelancer_bio: freelancerInfo?.bio || "",
        skills: freelancerInfo?.skills || "",
        hourly_rate: freelancerInfo?.hourly_rate || "",
        portfolio_link: freelancerInfo?.portfolio_link || "",
        experience_level: freelancerInfo?.experience_level || "mid-level",
    });

    const [imagePreview, setImagePreview] = useState(user?.profile_image || null);

    if (!user) {
        return (
            <div className="w-full flex justify-center items-center py-20">
                <p className="text-gray-500 text-xl">User not found...</p>
            </div>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData((prev) => ({ ...prev, profile_image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Update main user info
        dispatch(
            updateUser({
                user_id: userId,
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                profile_image: formData.profile_image,
            })
        );

        if (isClient && clientInfo) {
            dispatch(
                updateClient({
                    client_id: clientInfo.client_id,
                    company_name: formData.company_name,
                    organization_type: formData.organization_type,
                    location: formData.location,
                    bio: formData.bio,
                })
            );
        }

        if (isFreelancer && freelancerInfo) {
            dispatch(
                updateFreelancer({
                    freelancer_id: freelancerInfo.freelancer_id,
                    bio: formData.freelancer_bio,
                    skills: formData.skills,
                    portfolio_link: formData.portfolio_link,
                    experience_level: formData.experience_level,
                })
            );
            dispatch(updateHourlyRate({
                freelancer_id: freelancerInfo.freelancer_id,
                rate: parseInt(formData.hourly_rate) || 0,
            }));
            dispatch(updateSkills({
                freelancer_id: freelancerInfo.freelancer_id,
                skills: formData.skills,
            }));
        }

        toast.success("Profile updated successfully!");
        navigate(`../profile/${userId}`);
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-8">
                    <h1 className="text-3xl font-bold">Edit Profile</h1>
                    <p className="mt-2 opacity-90">Update your personal and professional information</p>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Profile Image */}
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <div className="w-40 h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-gray-100">
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-6xl font-bold text-gray-400 bg-gray-200">
                                        {formData.name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>
                            <label className="absolute bottom-2 right-2 bg-indigo-600 text-white p-3 rounded-full cursor-pointer shadow-lg hover:bg-indigo-700 transition">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                            </label>
                        </div>
                        <p className="mt-4 text-sm text-gray-600">Click the camera icon to change photo</p>
                    </div>

                    {/* Basic Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="e.g. +92 300 1234567"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        {isFreelancer && (
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Portfolio Link</label>
                                <input
                                    type="url"
                                    name="portfolio_link"
                                    value={formData.portfolio_link}
                                    onChange={handleChange}
                                    placeholder="https://yourportfolio.com"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                />
                            </div>
                        )}
                    </div>

                    {/* Role-Specific Fields */}
                    {isClient && (
                        <>
                            <hr className="my-8 border-gray-200" />
                            <h2 className="text-2xl font-bold text-indigo-700 mb-6">Company Information</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
                                    <input
                                        type="text"
                                        name="company_name"
                                        value={formData.company_name}
                                        onChange={handleChange}
                                        required={isClient}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Organization Type</label>
                                    <input
                                        type="text"
                                        name="organization_type"
                                        value={formData.organization_type}
                                        onChange={handleChange}
                                        required={isClient}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        required={isClient}
                                        placeholder="City, Country"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {isFreelancer && (
                        <>
                            <hr className="my-8 border-gray-200" />
                            <h2 className="text-2xl font-bold text-indigo-700 mb-6">Freelancer Details</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Skills (comma separated)</label>
                                    <input
                                        type="text"
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        placeholder="React, Node.js, Tailwind CSS"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Hourly Rate ($)</label>
                                    <input
                                        type="number"
                                        name="hourly_rate"
                                        value={formData.hourly_rate}
                                        onChange={handleChange}
                                        min="10"
                                        max="200"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Experience Level</label>
                                    <select
                                        name="experience_level"
                                        value={formData.experience_level}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                    >
                                        <option value="junior">Junior</option>
                                        <option value="mid-level">Mid-Level</option>
                                        <option value="senior">Senior</option>
                                        <option value="expert">Expert</option>
                                    </select>
                                </div>
                            </div>
                        </>
                    )}

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            {isFreelancer ? "Professional Bio" : "About Your Company"}
                        </label>
                        <textarea
                            name={isFreelancer ? "freelancer_bio" : "bio"}
                            value={isFreelancer ? formData.freelancer_bio : formData.bio}
                            onChange={handleChange}
                            rows="6"
                            placeholder="Tell us about yourself and your expertise..."
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-8 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-lg"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfilePage;