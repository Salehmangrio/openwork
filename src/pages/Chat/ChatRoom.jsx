import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Send, Phone, Video, MoreVertical, ArrowLeft, MessageCircle } from "lucide-react";
import { addMessage } from "../../store/slices/slices";

const ChatRoom = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  const currentUserData = localStorage.getItem("currentUser");
  const currentUser = currentUserData ? JSON.parse(currentUserData) : null;

  const users = useSelector((state) => state.users?.list || []);
  const conversations = useSelector((state) => state.chat?.conversations || []);

  const chat = conversations.find((c) => c.conversation_id === parseInt(id || "0"));

  // State to manage input
  const [message, setMessage] = useState("");

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat?.messages.length, id]);

  if (!currentUser)
    return <div className="h-full flex items-center justify-center text-gray-500">Please log in</div>;

  if (!chat)
    return <div className="h-full flex items-center justify-center text-gray-400">Chat not found or select a conversation</div>;

  const otherUserId = chat.participants.find(
    (uid) => uid !== currentUser.user_id
  );

  const otherUser =
    users.find((u) => u.user_id === otherUserId) || { user_id: 0, name: "Unknown User" };

  const chatMessages = chat.messages || [];

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      sender_id: currentUser.user_id,
      text: message.trim(),
      sent_at: new Date().toISOString(),
    };

    dispatch(
      addMessage({
        conversation_id: chat.conversation_id,
        message: newMessage,
      })
    );

    setMessage("");
  };

  const initials = otherUser.name
  .split(" ")
  .map((n) => n[0])
  .join("")
  .toUpperCase().slice(0, 2);

  return (
    // Outer Container: Full height relative to parent, flex column
    <div className="flex flex-col h-full w-full bg-white md:rounded-r-2xl overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white/80 backdrop-blur-sm z-10 shrink-0">
        <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                {initials}
            </div>
            <div>
                <h2 className="text-base font-bold text-gray-900 leading-tight">
                {otherUser.name}
                </h2>
                <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    <span className="text-xs text-gray-500 font-medium">Online</span>
                </div>
            </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 text-gray-400">
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors hidden sm:block">
                <Phone size={20} />
            </button>
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors hidden sm:block">
                <Video size={20} />
            </button>
            <button className="p-2 hover:bg-gray-50 rounded-full transition-colors">
                <MoreVertical size={20} />
            </button>
        </div>
      </div>

      {/* Messages Area - Flex 1 handles the height filling */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto bg-gray-50 p-4 space-y-4 scroll-smooth"
      >
        {chatMessages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center opacity-50">
            <MessageCircle size={48} className="text-gray-300 mb-2" />
            <p className="text-gray-500 text-sm">No messages yet. Say hello!</p>
          </div>
        )}

        {chatMessages.map((msg, index) => {
          const isMine = msg.sender_id === currentUser.user_id;

          return (
            <div
              key={index}
              className={`flex w-full ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`
                  max-w-[85%] md:max-w-[70%] px-4 py-2.5 rounded-2xl text-sm shadow-sm relative group
                  ${isMine
                    ? "bg-indigo-600 text-white rounded-tr-sm"
                    : "bg-white text-gray-700 border border-gray-100 rounded-tl-sm"}
                `}
              >
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <div
                  className={`text-[10px] mt-1 flex justify-end gap-1 opacity-70
                    ${isMine ? "text-indigo-100" : "text-gray-400"}
                  `}
                >
                  {new Date(msg.sent_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input Area - Sticky to bottom */}
      <div className="p-3 md:p-4 bg-white border-t border-gray-100 shrink-0 z-10">
        <div className="flex items-end gap-2 bg-gray-50 p-1.5 rounded-3xl border border-gray-200 focus-within:ring-2 focus-within:ring-indigo-100 focus-within:border-indigo-400 transition-all shadow-sm">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 px-4 py-2.5 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 min-h-[44px] max-h-32"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`
              p-2.5 rounded-full transition-all duration-200 shrink-0
              ${message.trim() 
                ? "bg-indigo-600 text-white shadow-md hover:shadow-lg hover:scale-105" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"}
            `}
          >
            <Send size={18} className={message.trim() ? "translate-x-0.5 translate-y-0.5" : ""} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default ChatRoom;