import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  clientChats: [
    {
      id: 1,
      name: "Freelancer A",
      message: "Hello, I finished the task.",
      time: "2m ago",
      clientId: 1,
      freelancerId: 101,
      messages: [
        { id: 1, text: "Welcome to the chat!", sender: "system", clientId: 1, freelancerId: 101 },
        { id: 2, text: "Hi! I have submitted the first draft.", sender: "freelancer", clientId: 1, freelancerId: 101 },
        { id: 3, text: "Great! I will review it now.", sender: "client", clientId: 1, freelancerId: 101 },
        { id: 4, text: "Thanks, please let me know your feedback.", sender: "freelancer", clientId: 1, freelancerId: 101 },
        { id: 5, text: "Looks good, approved.", sender: "client", clientId: 1, freelancerId: 101 },
      ],
    },
    {
      id: 2,
      name: "Freelancer B",
      message: "Can we discuss the new project?",
      time: "10m ago",
      clientId: 1,
      freelancerId: 102,
      messages: [
        { id: 1, text: "Welcome to the chat!", sender: "system", clientId: 1, freelancerId: 102 },
        { id: 2, text: "Sure, let's schedule a meeting.", sender: "freelancer", clientId: 1, freelancerId: 102 },
        { id: 3, text: "I am available tomorrow at 3 PM.", sender: "client", clientId: 1, freelancerId: 102 },
        { id: 4, text: "Perfect, let's confirm then.", sender: "freelancer", clientId: 1, freelancerId: 102 },
        { id: 5, text: "Confirmed. See you then.", sender: "client", clientId: 1, freelancerId: 102 },
      ],
    },
    {
      id: 3,
      name: "Freelancer C",
      message: "Please check the updated designs.",
      time: "1h ago",
      clientId: 1,
      freelancerId: 103,
      messages: [
        { id: 1, text: "Welcome to the chat!", sender: "system", clientId: 1, freelancerId: 103 },
        { id: 2, text: "I've uploaded the latest design files.", sender: "freelancer", clientId: 1, freelancerId: 103 },
        { id: 3, text: "Looks good! I will give feedback by EOD.", sender: "client", clientId: 1, freelancerId: 103 },
        { id: 4, text: "Thanks for the feedback!", sender: "freelancer", clientId: 1, freelancerId: 103 },
        { id: 5, text: "You're welcome. Keep it up!", sender: "client", clientId: 1, freelancerId: 103 },
      ],
    },
    // Continuing similar structure for 17 more freelancers
    {
      id: 4,
      name: "Freelancer D",
      message: "I've completed the testing.",
      time: "3h ago",
      clientId: 1,
      freelancerId: 104,
      messages: [
        { id: 1, text: "Welcome to the chat!", sender: "system", clientId: 1, freelancerId: 104 },
        { id: 2, text: "Testing is done, sending the report.", sender: "freelancer", clientId: 1, freelancerId: 104 },
        { id: 3, text: "Received, I will review it.", sender: "client", clientId: 1, freelancerId: 104 },
        { id: 4, text: "Thanks, let me know your feedback.", sender: "freelancer", clientId: 1, freelancerId: 104 },
        { id: 5, text: "All good, approved.", sender: "client", clientId: 1, freelancerId: 104 },
      ],
    },
    {
      id: 5,
      name: "Freelancer E",
      message: "I need clarification on requirements.",
      time: "4h ago",
      clientId: 1,
      freelancerId: 105,
      messages: [
        { id: 1, text: "Welcome to the chat!", sender: "system", clientId: 1, freelancerId: 105 },
        { id: 2, text: "Can you clarify the design scope?", sender: "freelancer", clientId: 1, freelancerId: 105 },
        { id: 3, text: "Sure, I will send the detailed doc.", sender: "client", clientId: 1, freelancerId: 105 },
        { id: 4, text: "Thanks, I will check it.", sender: "freelancer", clientId: 1, freelancerId: 105 },
        { id: 5, text: "All clear now?", sender: "client", clientId: 1, freelancerId: 105 },
      ],
    },
    {
      id: 6,
      name: "Freelancer F",
      message: "Updated the database schema.",
      time: "5h ago",
      clientId: 1,
      freelancerId: 106,
      messages: [
        { id: 1, text: "Welcome to the chat!", sender: "system", clientId: 1, freelancerId: 106 },
        { id: 2, text: "Database schema updated, please review.", sender: "freelancer", clientId: 1, freelancerId: 106 },
        { id: 3, text: "Looks good, proceed.", sender: "client", clientId: 1, freelancerId: 106 },
        { id: 4, text: "Thanks for the confirmation.", sender: "freelancer", clientId: 1, freelancerId: 106 },
        { id: 5, text: "You're welcome.", sender: "client", clientId: 1, freelancerId: 106 },
      ],
    },
    {
      id: 7,
      name: "Freelancer G",
      message: "Front-end UI is ready.",
      time: "6h ago",
      clientId: 1,
      freelancerId: 107,
      messages: [
        { id: 1, text: "Welcome to the chat!", sender: "system", clientId: 1, freelancerId: 107 },
        { id: 2, text: "UI completed, need your feedback.", sender: "freelancer", clientId: 1, freelancerId: 107 },
        { id: 3, text: "Looks good, minor changes needed.", sender: "client", clientId: 1, freelancerId: 107 },
        { id: 4, text: "Noted, will update accordingly.", sender: "freelancer", clientId: 1, freelancerId: 107 },
        { id: 5, text: "Thanks!", sender: "client", clientId: 1, freelancerId: 107 },
      ],
    },
    {
      id: 8,
      name: "Freelancer H",
      message: "Completed API integration.",
      time: "7h ago",
      clientId: 1,
      freelancerId: 108,
      messages: [
        { id: 1, text: "Welcome to the chat!", sender: "system", clientId: 1, freelancerId: 108 },
        { id: 2, text: "API integration done.", sender: "freelancer", clientId: 1, freelancerId: 108 },
        { id: 3, text: "Great, I will test it now.", sender: "client", clientId: 1, freelancerId: 108 },
        { id: 4, text: "Let me know if any issues.", sender: "freelancer", clientId: 1, freelancerId: 108 },
        { id: 5, text: "No issues found, all good.", sender: "client", clientId: 1, freelancerId: 108 },
      ],
    },
    {
      id: 9,
      name: "Freelancer I",
      message: "Draft report submitted.",
      time: "8h ago",
      clientId: 1,
      freelancerId: 109,
      messages: [
        { id: 1, text: "Welcome to the chat!", sender: "system", clientId: 1, freelancerId: 109 },
        { id: 2, text: "Report draft uploaded.", sender: "freelancer", clientId: 1, freelancerId: 109 },
        { id: 3, text: "Received, will review.", sender: "client", clientId: 1, freelancerId: 109 },
        { id: 4, text: "Thanks!", sender: "freelancer", clientId: 1, freelancerId: 109 },
        { id: 5, text: "Feedback sent, good job.", sender: "client", clientId: 1, freelancerId: 109 },
      ],
    },
    {
      id: 10,
      name: "Freelancer J",
      message: "Updated documentation uploaded.",
      time: "9h ago",
      clientId: 1,
      freelancerId: 110,
      messages: [
        { id: 1, text: "Welcome to the chat!", sender: "system", clientId: 1, freelancerId: 110 },
        { id: 2, text: "Documentation updated.", sender: "freelancer", clientId: 1, freelancerId: 110 },
        { id: 3, text: "Reviewed, looks complete.", sender: "client", clientId: 1, freelancerId: 110 },
        { id: 4, text: "Thanks!", sender: "freelancer", clientId: 1, freelancerId: 110 },
        { id: 5, text: "Good work.", sender: "client", clientId: 1, freelancerId: 110 },
      ],
    },
  ],


  freelancerChats: [
    {
      id: 1,
      name: "Client X",
      message: "Please update the files.",
      time: "15m ago",
      clientId: 201,
      freelancerId: 1,
      messages: [
        { id: 1, text: "Welcome to the chat!", sender: "system", clientId: 201, freelancerId: 1 },
        { id: 2, text: "I have updated the documents as requested.", sender: "freelancer", clientId: 201, freelancerId: 1 },
        { id: 3, text: "Perfect! Thanks for the quick update.", sender: "client", clientId: 201, freelancerId: 1 },
        { id: 4, text: "No problem! Let me know if anything else is needed.", sender: "freelancer", clientId: 201, freelancerId: 1 },
        { id: 5, text: "Will do. Appreciate your help.", sender: "client", clientId: 201, freelancerId: 1 },
      ],
    },
    {
      id: 2,
      name: "Client Y",
      message: "We need the project report by today.",
      time: "30m ago",
      clientId: 202,
      freelancerId: 1,
      messages: [
        { id: 1, text: "Welcome to the chat!", sender: "system", clientId: 202, freelancerId: 1 },
        { id: 2, text: "I will send it within the next 2 hours.", sender: "freelancer", clientId: 202, freelancerId: 1 },
        { id: 3, text: "Great, looking forward to it.", sender: "client", clientId: 202, freelancerId: 1 },
        { id: 4, text: "Sent! Please confirm.", sender: "freelancer", clientId: 202, freelancerId: 1 },
        { id: 5, text: "Received, thanks!", sender: "client", clientId: 202, freelancerId: 1 },
      ],
    },
    {
      id: 3,
      name: "Client Z",
      message: "Can you join the call?",
      time: "1h ago",
      clientId: 203,
      freelancerId: 1,
      messages: [
        { id: 1, text: "Welcome to the chat!", sender: "system", clientId: 203, freelancerId: 1 },
        { id: 2, text: "Yes, I am ready for the call.", sender: "freelancer", clientId: 203, freelancerId: 1 },
        { id: 3, text: "Perfect, let's start in 5 mins.", sender: "client", clientId: 203, freelancerId: 1 },
        { id: 4, text: "Joined the call.", sender: "freelancer", clientId: 203, freelancerId: 1 },
        { id: 5, text: "Thanks for joining, let's discuss.", sender: "client", clientId: 203, freelancerId: 1 },
      ],
    },
    {
      id: 4,
      name: "Client A1",
      message: "Need the draft by today evening.",
      time: "1h 30m ago",
      clientId: 204,
      freelancerId: 1,
      messages: [
        { id: 1, text: "Welcome to the chat!", sender: "system", clientId: 204, freelancerId: 1 },
        { id: 2, text: "Draft will be ready in a few hours.", sender: "freelancer", clientId: 204, freelancerId: 1 },
        { id: 3, text: "Great, please make sure it's detailed.", sender: "client", clientId: 204, freelancerId: 1 },
        { id: 4, text: "Will do, sending soon.", sender: "freelancer", clientId: 204, freelancerId: 1 },
        { id: 5, text: "Thanks, much appreciated.", sender: "client", clientId: 204, freelancerId: 1 },
      ],
    },
    {
      id: 5,
      name: "Client B1",
      message: "Can you fix the bug in the system?",
      time: "2h ago",
      clientId: 205,
      freelancerId: 1,
      messages: [
        { id: 1, text: "Welcome to the chat!", sender: "system", clientId: 205, freelancerId: 1 },
        { id: 2, text: "Yes, I am checking the bug now.", sender: "freelancer", clientId: 205, freelancerId: 1 },
        { id: 3, text: "Please fix it ASAP.", sender: "client", clientId: 205, freelancerId: 1 },
        { id: 4, text: "Bug fixed, please verify.", sender: "freelancer", clientId: 205, freelancerId: 1 },
        { id: 5, text: "Verified, works perfectly. Thanks!", sender: "client", clientId: 205, freelancerId: 1 },
      ],
    },
    {
      id: 6,
      name: "Client C1",
      message: "Need help with the presentation slides.",
      time: "2h 30m ago",
      clientId: 206,
      freelancerId: 1,
      messages: [
        { id: 1, text: "Welcome to the chat!", sender: "system", clientId: 206, freelancerId: 1 },
        { id: 2, text: "I can help, will update the slides.", sender: "freelancer", clientId: 206, freelancerId: 1 },
        { id: 3, text: "Thanks, please make it professional.", sender: "client", clientId: 206, freelancerId: 1 },
        { id: 4, text: "Slides updated, check and confirm.", sender: "freelancer", clientId: 206, freelancerId: 1 },
        { id: 5, text: "Looks great, approved.", sender: "client", clientId: 206, freelancerId: 1 },
      ],
    },
    {
      id: 7,
      name: "Client D1",
      message: "Send me the invoices for last month.",
      time: "3h ago",
      clientId: 207,
      freelancerId: 1,
      messages: [
        { id: 1, text: "Welcome to the chat!", sender: "system", clientId: 207, freelancerId: 1 },
        { id: 2, text: "Invoices sent, please check.", sender: "freelancer", clientId: 207, freelancerId: 1 },
        { id: 3, text: "Got them, thanks.", sender: "client", clientId: 207, freelancerId: 1 },
        { id: 4, text: "You're welcome!", sender: "freelancer", clientId: 207, freelancerId: 1 },
        { id: 5, text: "All good.", sender: "client", clientId: 207, freelancerId: 1 },
      ],
    },
    {
      id: 8,
      name: "Client E1",
      message: "Can you review the contract?",
      time: "3h 30m ago",
      clientId: 208,
      freelancerId: 1,
      messages: [
        { id: 1, text: "Welcome to the chat!", sender: "system", clientId: 208, freelancerId: 1 },
        { id: 2, text: "Sure, I will review it.", sender: "freelancer", clientId: 208, freelancerId: 1 },
        { id: 3, text: "Thanks, please highlight important points.", sender: "client", clientId: 208, freelancerId: 1 },
        { id: 4, text: "Reviewed and commented.", sender: "freelancer", clientId: 208, freelancerId: 1 },
        { id: 5, text: "Appreciate your quick review.", sender: "client", clientId: 208, freelancerId: 1 },
      ],
    },
    {
      id: 9,
      name: "Client F1",
      message: "Please prepare the financial report.",
      time: "4h ago",
      clientId: 209,
      freelancerId: 1,
      messages: [
        { id: 1, text: "Welcome to the chat!", sender: "system", clientId: 209, freelancerId: 1 },
        { id: 2, text: "Working on the report now.", sender: "freelancer", clientId: 209, freelancerId: 1 },
        { id: 3, text: "Great, need it by EOD.", sender: "client", clientId: 209, freelancerId: 1 },
        { id: 4, text: "Report completed and sent.", sender: "freelancer", clientId: 209, freelancerId: 1 },
        { id: 5, text: "Received, thanks!", sender: "client", clientId: 209, freelancerId: 1 },
      ],
    },
    {
      id: 10,
      name: "Client G1",
      message: "Update the website content.",
      time: "4h 30m ago",
      clientId: 210,
      freelancerId: 1,
      messages: [
        { id: 1, text: "Welcome to the chat!", sender: "system", clientId: 210, freelancerId: 1 },
        { id: 2, text: "Content updated on the website.", sender: "freelancer", clientId: 210, freelancerId: 1 },
        { id: 3, text: "Looks good, thanks.", sender: "client", clientId: 210, freelancerId: 1 },
        { id: 4, text: "Glad it looks good!", sender: "freelancer", clientId: 210, freelancerId: 1 },
        { id: 5, text: "All set.", sender: "client", clientId: 210, freelancerId: 1 },
      ],
    },
    // Continue similarly for ids 11 to 20...
  ],

  currentChat: null,
  role: "client",
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    addMessage: (state, action) => {
      const { chatId, message } = action.payload;
      const chats = state.role === "freelancer" ? state.freelancerChats : state.clientChats;

      const chat = chats.find((c) => c.id === chatId);
      if (chat) {
        const newId = chat.messages.length ? chat.messages[chat.messages.length - 1].id + 1 : 1;

        chat.messages.push({
          id: newId,
          ...message,
          clientId: chat.clientId,
          freelancerId: chat.freelancerId,
        });

        chat.message = message.text;
        chat.time = "just now";
      }
    },
  },
});

export const { setRole, setCurrentChat, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
