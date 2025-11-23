// EditOfferPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    selectOfferById,
    updateOffer,
    deleteOffer,
    selectFreelancerById
} from "../../store/slices/slices.js";
import { ArrowLeft, Trash2, Save, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

const EditOfferPage = () => {
    const { offerId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const id = parseInt(offerId);

    // Get current offer
    const offer = useSelector((state) => selectOfferById(state, id));
    // Get current user ID from auth slice
    //Get Freelancer ID from offer
    const freelancerId = useSelector((state) => {
        {
            return offer ? offer.freelancer_id : null;
        }
    });
    const freelancer = useSelector((state) => selectFreelancerById(state, freelancerId));
    const userId = freelancer ? freelancer.user_id : null;

    // Form state
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        skills: "",
        price: "",
        delivery_time_days: "",
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (offer) {
            setFormData({
                title: offer.title || "",
                description: offer.description || "",
                category: offer.category || "",
                skills: offer.skills?.join(", ") || "",
                price: offer.price || "",
                delivery_time_days: offer.delivery_time_days || "",
            });
        }
    }, [offer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.description.trim()) newErrors.description = "Description is required";
        if (!formData.category) newErrors.category = "Please select a category";
        if (!formData.skills.trim()) newErrors.skills = "Add at least one skill";
        if (!formData.price || formData.price < 50)
            newErrors.price = "Price must be at least $50";
        if (!formData.delivery_time_days || formData.delivery_time_days < 1)
            newErrors.delivery_time_days = "Delivery time must be at least 1 day";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        dispatch(
            updateOffer({
                offer_id: id,
                ...formData,
                skills: formData.skills
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                price: parseInt(formData.price),
                delivery_time_days: parseInt(formData.delivery_time_days),
            })
        );

        toast.success("Offer updated successfully!");
        navigate(-1); 
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this offer? This cannot be undone.")) {
            dispatch(deleteOffer(id));
            toast.success("Offer deleted");
            navigate(-1);
        }
    };

    if (!offer) {
        return (
            <div className="max-w-4xl mx-auto p-6 text-center py-20">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <p className="text-xl text-gray-600">Offer not found or already deleted.</p>
                <button
                    onClick={() => navigate(-1)}
                    className="mt-4 text-indigo-600 hover:underline flex items-center gap-2 mx-auto"
                >
                    <ArrowLeft className="w-5 h-5" /> Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-3 hover:bg-gray-100 rounded-full transition"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Edit Offer</h1>
                        <p className="text-gray-500">Update your service package details</p>
                    </div>
                </div>

                <button
                    onClick={handleDelete}
                    className="flex items-center gap-2 px-5 py-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium"
                >
                    <Trash2 className="w-5 h-5" />
                    Delete Offer
                </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
                {/* Title */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Offer Title
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="e.g. React + Tailwind Landing Page"
                        className={`w-full px-5 py-4 border rounded-xl text-lg font-medium focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${errors.title ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-2">{errors.title}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="6"
                        placeholder="Describe what clients will get, features, revisions, support..."
                        className={`w-full px-5 py-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition ${errors.description ? "border-red-500" : "border-gray-300"
                            }`}
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-2">{errors.description}</p>
                    )}
                </div>

                {/* Category & Skills */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Category
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={`w-full px-5 py-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${errors.category ? "border-red-500" : "border-gray-300"
                                }`}
                        >
                            <option value="">Select category</option>
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Full-stack">Full-stack</option>
                            <option value="Mobile Development">Mobile Development</option>
                            <option value="UI/UX Design">UI/UX Design</option>
                            <option value="DevOps">DevOps</option>
                            <option value="Data Science">Data Science</option>
                            <option value="Digital Marketing">Digital Marketing</option>
                        </select>
                        {errors.category && (
                            <p className="text-red-500 text-sm mt-2">{errors.category}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Skills (comma separated)
                        </label>
                        <input
                            type="text"
                            name="skills"
                            value={formData.skills}
                            onChange={handleChange}
                            placeholder="React, Node.js, Tailwind CSS"
                            className={`w-full px-5 py-4 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${errors.skills ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.skills && <p className="text-red-500 text-sm mt-2">{errors.skills}</p>}
                    </div>
                </div>

                {/* Price & Delivery */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Fixed Price ($)
                        </label>
                        <div className="relative">
                            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-bold">
                                $
                            </span>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                min="50"
                                className={`w-full pl-12 pr-5 py-4 border rounded-xl text-lg font-bold focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${errors.price ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                        </div>
                        {errors.price && <p className="text-red-500 text-sm mt-2">{errors.price}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Delivery Time (days)
                        </label>
                        <input
                            type="number"
                            name="delivery_time_days"
                            value={formData.delivery_time_days}
                            onChange={handleChange}
                            min="1"
                            max="90"
                            className={`w-full px-5 py-4 border rounded-xl text-lg font-bold focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition ${errors.delivery_time_days ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {errors.delivery_time_days && (
                            <p className="text-red-500 text-sm mt-2">{errors.delivery_time_days}</p>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-lg"
                    >
                        <Save className="w-5 h-5" />
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditOfferPage;