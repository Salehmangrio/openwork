import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("currentUser");
        navigate("/login", { replace: true });
    };

    return (
        <button
            onClick={handleLogout}
            className="
        group w-full mt-4 
        flex items-center justify-center gap-2
        bg-red-600 text-white 
        py-3 px-4 
        rounded-xl 
        shadow-md
        font-medium tracking-wide
        transition-all duration-300 ease-out
        hover:bg-red-700 hover:shadow-lg
        active:scale-[0.97]
      "
        >
            <LogOut className="w-5 h-5 group-hover:rotate-180 transition duration-300" />
            <span>Logout</span>
        </button>
    );
};

export default LogoutButton;
