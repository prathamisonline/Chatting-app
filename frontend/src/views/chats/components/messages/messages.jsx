import { useRecoilState, useRecoilValue } from "recoil";
import MessageTopBar from "./components/MessageTopBar";
import { IoSend } from "react-icons/io5";
import {
  MessageState,
  SelectedUserState,
  UserDetailsState,
} from "../../../../states/theme";
import UseChatApi from "../../../../store/chat/useChatApi";
import { useCallback, useEffect, useRef, useState } from "react";
import { convertToTime } from "../../../../utils/common";
import { format } from "date-fns";

const Messages = () => {
  const messages = useRecoilValue(MessageState);
  const userDetails = useRecoilValue(UserDetailsState);
  const [selectedUser, setSelectedUser] = useRecoilState(SelectedUserState);

  const [message, setMessage] = useState("");
  const lastMessageRef = useRef();

  const { sendChat } = UseChatApi();

  // Load old messages into selectedUser when the component mounts
  useEffect(() => {
    if (messages.length > 0) {
      setSelectedUser((prev) => ({
        ...prev,
        messages: [...(prev.messages || []), ...messages],
      }));
    }
  }, [messages, setSelectedUser]);

  // Scroll to the last message when messages update
  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [selectedUser]);

  const handleChatInput = useCallback((e) => {
    const { value } = e.target;
    setMessage(value);
  }, []);

  const handleSubmitChat = useCallback(() => {
    if (!userDetails || !selectedUser) {
      console.log("User details or selected user not available.");
      return;
    }

    const newMessage = {
      senderId: userDetails._id,
      receiverId: selectedUser._id,
      message,
      createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssXXX"),
    };

    sendChat(selectedUser._id, { message });

    setSelectedUser((prev) => ({
      ...prev,
      messages: [...(prev.messages || []), newMessage],
    }));

    setMessage("");
  }, [message, selectedUser, sendChat, setSelectedUser, userDetails]);

  const handleChatKeyDown = useCallback(
    (e) => {
      const { value } = e.target;
      setMessage(value);

      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmitChat();
      }
    },
    [handleSubmitChat]
  );

  return (
    <div className="relative flex-1 flex flex-col h-full bg-[url('/image.png')] bg-cover bg-center">
      <MessageTopBar />
      <div className="flex-1 overflow-hidden flex flex-col bg-black/5 dark:bg-black/20 backdrop-blur-sm">
        {/* Empty state */}
        {selectedUser?.messages?.length === 0 ? (
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="text-center p-6 bg-white/80 dark:bg-gray-800/80 rounded-xl shadow-lg max-w-md mx-4">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Start a conversation
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Send your first message to begin chatting
              </p>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3">
            <div className="max-w-6xl mx-auto w-full">
              {selectedUser?.messages?.map((msg, index) => (
                <div
                  key={index}
                  ref={
                    index === selectedUser.messages.length - 1
                      ? lastMessageRef
                      : null
                  }
                  className={`flex ${msg.senderId === userDetails._id ? 'justify-end' : 'justify-start'} mb-3`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[70%] md:max-w-[60%] rounded-2xl px-4 py-2 ${
                      msg.senderId === userDetails._id
                        ? 'bg-blue-500 text-white rounded-br-none'
                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-bl-none shadow-sm'
                    }`}
                  >
                    <p className="text-sm sm:text-base break-words">{msg?.message}</p>
                    <div className={`flex items-center mt-1 text-xs ${msg.senderId === userDetails._id ? 'justify-end' : 'justify-start'}`}>
                      <span className={`opacity-70 ${
                        msg.senderId === userDetails._id 
                          ? 'text-blue-100' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {convertToTime(msg?.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Message Input */}
      <div className="sticky bottom-0 left-0 right-0 p-2 sm:p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-200 dark:border-gray-600 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full bg-transparent border-0 focus:ring-0 py-3 px-4 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm sm:text-base"
            value={message}
            onChange={handleChatInput}
            onKeyDown={handleChatKeyDown}
          />
          <button 
            className={`p-2 rounded-full transition-colors ${
              message.trim() 
                ? 'text-blue-500 hover:bg-blue-50 dark:hover:bg-gray-600' 
                : 'text-gray-400 dark:text-gray-500'
            }`}
            onClick={handleSubmitChat}
            disabled={!message.trim()}
            aria-label="Send message"
          >
            <IoSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
