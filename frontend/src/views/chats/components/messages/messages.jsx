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

const Messages = () => {
  const [messages, setMessages] = useRecoilState(MessageState);
  const userDetails = useRecoilValue(UserDetailsState);
  // console.log("🚀 ~ Messages ~ userDetails:", userDetails);
  const lastMessageRef = useRef();
  const { sendChat } = UseChatApi();
  const selectedUser = useRecoilValue(SelectedUserState);

  const [message, setMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  const handleChatInput = useCallback((e) => {
    const { value } = e.target;
    setMessage(value);
  }, []);

  const handleSubmitChat = useCallback(() => {
    if (!userDetails || !selectedUser) {
      console.log("User details or selected user not available.");
      return;
    }

    const payload = { message };
    sendChat(selectedUser._id, payload);

    setMessages((prev) => [
      ...prev,
      {
        senderId: userDetails._id,
        receiverId: selectedUser._id,
        message,
      },
    ]);

    setMessage(""); // Clear the input field after sending
  }, [message, selectedUser, sendChat, setMessages, userDetails]);

  return (
    <div className="relative bg-[url('/image.png')] flex-1">
      <MessageTopBar />
      <div className="flex justify-center flex-1 w-full max-h-dvh p-4 rounded-lg">
        <div className="space-y-4 w-full h-[600px] p-4 rounded-lg overflow-auto">
          {messages?.map((message, index) => (
            <div
              key={index}
              ref={index === messages.length - 1 ? lastMessageRef : null}
              className={`flex items-end ${
                message.senderId === userDetails._id ? "justify-end" : ""
              }`}
            >
              <div
                className={`p-3 rounded-lg shadow-lg max-w-xs ${
                  message.senderId === userDetails._id
                    ? "bg-green-300 text-black"
                    : "bg-white text-black"
                }`}
              >
                <p className="text-sm">{message?.message}</p>
                <div className="flex items-center justify-end mt-2 text-xs text-gray-500">
                  {message.senderId !== userDetails._id && (
                    <span className="text-red-500 mr-1">❤️</span>
                  )}
                  <span>18:12</span>
                  <span className="ml-1">✔️</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute bottom-4 w-[700px]">
          <label className="relative block">
            <input
              type="text"
              placeholder="Message"
              className="input input-bordered w-full pr-10"
              value={message}
              onChange={handleChatInput}
            />
            <button className="absolute inset-y-0 right-0 flex items-center pr-3">
              <IoSend size={24} onClick={handleSubmitChat} />
            </button>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Messages;
