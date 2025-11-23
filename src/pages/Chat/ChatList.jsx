import React, { useEffect, useState } from "react";
import { Search, MessageCircle } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setRole, selectUsersList } from "../../store/slices/slices";

const ChatList = ({ onItemClick }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const role = location.pathname.startsWith("/freelancer")
    ? "freelancer"
    : "client";

  useEffect(() => {
    dispatch(setRole(role));
  }, [dispatch, role]);

  const currentUserData = localStorage.getItem("currentUser");
  const currentUser = currentUserData ? JSON.parse(currentUserData) : null;

  const currentUserId = currentUser?.user_id;

  const usersList = useSelector(selectUsersList);
  const conversations = useSelector((state) => state.chat.conversations || []);

  if (!currentUser) {
    return <div className="p-8 text-center text-gray-600">Please log in.</div>;
  }

  // Filter conversations
  const userConversations = conversations.filter((conv) =>
    conv.participants.includes(currentUserId)
  );

  const filteredConversations = userConversations.filter((chat) => {
    const otherUserId = chat.participants.find((id) => id !== currentUserId);
    const otherUser = usersList.find((u) => u.user_id === otherUserId);
    const displayName = otherUser?.name || "Unknown User";
    return displayName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="w-full h-full flex flex-col p-4 md:p-5">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-1">
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Chats</h1>
        <div className="p-2 bg-indigo-50 rounded-full">
           <MessageCircle className="text-indigo-600" size={20} />
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6 shrink-0">
        <input
          type="text"
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 pl-11 bg-gray-50 border border-gray-200 rounded-xl 
          text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 
          transition-all placeholder-gray-400"
        />
        <Search className="absolute left-4 top-3.5 text-gray-400" size={18} />
      </div>

      {/* List Area - Use flex-1 to fill remaining space properly without magic numbers */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1 -mr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400">
            <p className="text-sm">No chats found.</p>
          </div>
        ) : (
          filteredConversations.map((chat) => {
            const otherUserId = chat.participants.find((id) => id !== currentUserId);
            const otherUser = usersList.find((u) => u.user_id === otherUserId);

            const displayName = otherUser?.name || "Unknown User";
            const initials = displayName
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase().slice(0, 2);

            const lastMessage =
              chat.messages?.length > 0
                ? chat.messages[chat.messages.length - 1]
                : null;

            const lastText = lastMessage?.text || "No messages yet";
            const time = lastMessage
              ? new Date(lastMessage.sent_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "";

            return (
              <NavLink
                key={chat.conversation_id}
                to={`${chat.conversation_id}`}
                onClick={onItemClick} // Close sidebar on mobile
                className={({ isActive }) => `
                  flex items-center p-3.5 rounded-xl transition-all duration-200 cursor-pointer group
                  ${isActive 
                    ? "bg-indigo-600 shadow-md shadow-indigo-200" 
                    : "bg-white hover:bg-indigo-50 border border-transparent hover:border-indigo-100"}
                `}
              >
                {({ isActive }) => (
                  <>
                    <div className={`
                      shrink-0 w-12 h-12 rounded-full flex items-center justify-center 
                      text-sm font-bold shadow-sm mr-3 transition-colors
                      ${isActive 
                        ? "bg-white text-indigo-600" 
                        : "bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 group-hover:from-white group-hover:to-white"}
                    `}>
                      {initials}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <h2 className={`text-sm font-semibold truncate ${isActive ? "text-white" : "text-gray-900"}`}>
                          {displayName}
                        </h2>
                        <span className={`text-[10px] shrink-0 ml-2 ${isActive ? "text-indigo-200" : "text-gray-400"}`}>
                          {time}
                        </span>
                      </div>
                      <p className={`text-sm truncate ${isActive ? "text-indigo-100" : "text-gray-500"}`}>
                        {lastText}
                      </p>
                    </div>
                  </>
                )}
              </NavLink>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChatList;