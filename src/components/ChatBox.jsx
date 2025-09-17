import React from "react";

const ChatBox = () => {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b bg-[#A8DADC] font-semibold">
        John Doe
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        <div className="self-start bg-gray-200 rounded-lg px-3 py-2 max-w-xs">
          Hey! How are you?
        </div>
        <div className="self-end bg-blue-500 text-white rounded-lg px-3 py-2 max-w-xs">
          I’m good, thanks!
        </div>
      </div>

      {/* Input */}
      <div className="p-3 border-t flex gap-2">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-3 py-2 focus:outline-none"
        />
        <button className="bg-[#457B9D] text-white px-4 rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
