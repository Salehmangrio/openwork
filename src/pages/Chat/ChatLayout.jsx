import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ChatList from "./ChatList";
import { Menu, X } from "lucide-react";

const ChatLayout = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    // Main Container: Uses fixed height calculation to ensure inner scrolling works perfectly
    <div className="flex flex-col md:flex-row h-[calc(100vh-2rem)] w-full bg-white rounded-2xl shadow-2xl overflow-hidden relative">
      
      {/* Mobile Top Bar - Only visible on small screens */}
      <div className="md:hidden flex items-center justify-between bg-white p-4 border-b border-gray-100 z-20 shrink-0">
        <h2 className="text-xl font-bold text-indigo-600 tracking-tight">Messages</h2>
        <button
          onClick={() => setShowSidebar(true)}
          className="p-2 rounded-xl bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Overlay Backdrop */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden transition-opacity"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
          absolute md:relative z-40
          flex flex-col h-full bg-white md:bg-gray-50/50 
          border-r border-gray-100
          w-[85%] max-w-[320px] md:w-1/3 lg:w-[320px] 
          transition-transform duration-300 ease-in-out
          ${showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          md:flex shadow-2xl md:shadow-none
        `}
      >
        {/* Mobile Sidebar Close Button */}
        <div className="md:hidden flex justify-end p-4 pb-0">
           <button 
             onClick={() => setShowSidebar(false)}
             className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
           >
             <X size={20} />
           </button>
        </div>

        {/* Chat List Component */}
        {/* We pass a callback to close the sidebar when an item is clicked on mobile */}
        <ChatList onItemClick={() => setShowSidebar(false)} />
      </div>

      {/* MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col min-w-0 bg-white md:rounded-r-2xl h-full relative z-0">
        <Outlet />
      </div>
    </div>
  );
};

export default ChatLayout;