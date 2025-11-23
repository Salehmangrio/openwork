import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
    selectOrders,
    selectJobs,
    selectOpenOffers as selectOffers,
    selectClientsList,
    selectUsersList,
    selectFreelancerByUserId
} from "../../store/slices/slices";

const AllOrders = () => {
    const orders = useSelector(selectOrders) || [];
    const jobs = useSelector(selectJobs) || [];
    const offers = useSelector(selectOffers) || [];
    const clients = useSelector(selectClientsList) || [];
    const users = useSelector(selectUsersList) || [];

    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

    if (!currentUser) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
                User not logged in.
            </div>
        );
    }

    const freelancer = useSelector((state) =>
        selectFreelancerByUserId(state, currentUser.user_id)
    );

    const getUserById = (user_id) => users.find((u) => u.user_id === user_id) || null;
    const getClientFromClientId = (client_id) => {
        const client = clients.find((c) => c.client_id === client_id);
        return client ? getUserById(client.user_id) : null;
    };
    const getJobById = (job_id) => jobs.find((j) => j.job_id === job_id) || null;
    const getOfferById = (offer_id) => offers.find((o) => o.offer_id === offer_id) || null;

    // Filter all orders for current freelancer
    const freelancerOrders = orders.filter((order) => {
        // Client Logic
        if (currentUser.role === "client") {
            const clientEntry = clients.find((c) => c.user_id === currentUser.user_id);
            return clientEntry && order.client_id === clientEntry.client_id;
        }

        // Freelancer Logic
        if (currentUser.role === "freelancer") {
            if (!freelancer) return false;
            return order.freelancer_id === freelancer.freelancer_id;
        }

        return false;
    });

    if (freelancerOrders.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500 text-lg">
                No orders found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
                    All Orders
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {freelancerOrders.map((order) => {
                        let title = "";
                        let description = "";
                        let category = "";
                        let type = "";

                        if (order.offer_id && order.offer_id !== -1) {
                            const offer = getOfferById(order.offer_id);
                            title = offer?.title || "Unknown Offer";
                            description = offer?.description || "";
                            category = offer?.category || "";
                            type = "OpenOffer";
                        } else if (order.job_id && order.job_id !== -1) {
                            const job = getJobById(order.job_id);
                            title = job?.title || "Unknown Job";
                            description = job?.description || "";
                            category = job?.category || "";
                            type = "OpenJob";
                        }
                        else {
                            title = "Custom Order";
                            description = "This is a custom order without a linked job or offer.";
                            category = "Custom";
                            type = "CustomOrder";
                        }

                        const clientUser = getClientFromClientId(order.client_id);

                        return (
                            <div
                                key={order.order_id}
                                className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition cursor-pointer border border-gray-200"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <h2 className="text-xl font-bold text-indigo-700">{title} <span className="font-light">({type})</span></h2>
                                    <span className="text-green-600 font-semibold">${order.total_amount}</span>
                                </div>

                                <p className="text-gray-600 mb-2 line-clamp-3 md:min-h-[60px]">{description}</p>
                                <p className="text-sm text-indigo-600 font-medium mb-2">{category}</p>

                                <p className="text-gray-700 mb-1">
                                    👔 Client: {clientUser?.name || "Unknown Client"}
                                </p>

                                <p className="text-gray-500 mb-1 text-sm">📌 Status: {order.status}</p>
                                <p className="text-gray-500 mb-3 text-sm">
                                    ⏳ Start: {order.start_date} • Delivery: {order.delivery_date}
                                </p>
                                <p
                                    className={`font-bold ${order.status === "in-progress"
                                            ? "text-yellow-600"
                                            : order.status === "pending"
                                                ? "text-rose-400"
                                                : "text-green-400"
                                        }`}
                                >
                                    {order.status.toUpperCase()}
                                </p>


                                <NavLink
                                    to={`/order-details/${order.order_id}`}
                                    className="mt-2 inline-block px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg text-center"
                                >
                                    View Details
                                </NavLink>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default AllOrders;
