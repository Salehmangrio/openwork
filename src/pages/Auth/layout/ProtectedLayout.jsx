import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedLayout = () => {
    const location = useLocation();

    // Get user
    const currentUserData = localStorage.getItem("currentUser");
    const currentUser = currentUserData ? JSON.parse(currentUserData) : null;

    const role = currentUser?.role;

    console.table(currentUser);
    console.log("Role =>", role);

    // --- No user found → redirect to login ---
    if (!currentUser) {
        return <Navigate to="/" replace />;
    }

    // --- Avoid redirect loop if already inside correct dashboard ---
    if (role === "freelancer" && location.pathname.startsWith("/freelancer")) {
        return <Outlet />;
    }
    if (role === "client" && location.pathname.startsWith("/client")) {
        return <Outlet />;
    }
    if (role === "admin" && location.pathname.startsWith("/admin")) {
        return <Outlet />;
    }

    // --- Redirect user to correct dashboard ---
    if (role === "freelancer") {
        return <Navigate to="/freelancer" replace />;
    }
    if (role === "client") {
        return <Navigate to="/client" replace />;
    }
    if (role === "admin") {
        return <Navigate to="/admin" replace />;
    }

    // Default fallback
    return <Navigate to="/" replace />;
};

export default ProtectedLayout;
