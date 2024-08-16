import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import MessageTopBar from "./components/MessageTopBar";
import { IoSend } from "react-icons/io5";
import {
  ChatUsersState,
  MessageState,
  SelectedUserState,
  UserDetailsState,
} from "../../../../states/theme";
import UseChatApi from "../../../../store/chat/useChatApi";
import { useCallback, useEffect, useRef, useState } from "react";
import { useWebSocket } from "../../../../store/Websocket/UseWebsocket";
import notificationSound from "../../../../assets/sounds/notification.mp3";
import { convertToTime } from "../../../../utils/common";
import { format } from "date-fns";

const Messages = () => {
  const setChatUsers = useSetRecoilState(ChatUsersState);
  const messages = useRecoilValue(MessageState);
  const userDetails = useRecoilValue(UserDetailsState);
  const [selectedUser, setSelectedUser] = useRecoilState(SelectedUserState);

  const [message, setMessage] = useState("");
  const lastMessageRef = useRef();

  const { socket } = useWebSocket();
  const { sendChat } = UseChatApi();

  // Load old messages into selectedUser when the component mounts
  useEffect(() => {
    if (messages.length > 0) {
      setSelectedUser((prev) => ({
        ...prev,
        messages: [...(prev.messages || []), ...messages],
      }));
    }
  }, []);

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();

      setChatUsers((prevChatUsers) => {
        return prevChatUsers.map((user) => {
          if (user._id === newMessage.senderId) {
            return {
              ...user,
              messages: [...(user.messages || []), newMessage],
            };
          }
          return user;
        });
      });

      if (selectedUser._id === newMessage.senderId) {
        setSelectedUser((prev) => ({
          ...prev,
          messages: [...(prev.messages || []), newMessage],
        }));
      }
    });

    return () => socket?.off("newMessage");
  }, [selectedUser, socket, setChatUsers, setSelectedUser]);

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
    <div className="relative bg-[url('/image.png')] flex-1 backdrop-filter backdrop-blur-lg bg-opacity-0">
      <MessageTopBar />
      <div className="flex justify-center flex-1 w-full max-h-dvh p-4 rounded-lg ">
        {selectedUser?.messages?.length === 0 ? (
          <p className="flex justify-center items-end pb-10 h-[600px] text-center text-4xl font-semibold text-black-600">
            Send a message to start the conversation here.
          </p>
        ) : (
          <div className="space-y-4 w-full h-[600px] p-4 rounded-lg overflow-auto">
            {selectedUser?.messages?.map((msg, index) => (
              <div
                key={index}
                ref={
                  index === selectedUser.messages.length - 1
                    ? lastMessageRef
                    : null
                }
                className={`flex items-end ${
                  msg.senderId === userDetails._id ? "justify-end" : ""
                }`}
              >
                <div
                  className={`p-3 rounded-lg shadow-lg max-w-xs ${
                    msg.senderId === userDetails._id
                      ? "bg-green-300 text-black"
                      : "bg-white text-black"
                  }`}
                >
                  <p className="text-sm">{msg?.message}</p>
                  <div className="flex items-center justify-end mt-2 text-xs text-gray-500">
                    <span>{convertToTime(msg?.createdAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="absolute bottom-4 w-[700px]">
          <label className="relative block">
            <input
              type="text"
              placeholder="Message"
              className="input input-bordered w-full pr-10"
              value={message}
              onChange={handleChatInput}
              onKeyDown={handleChatKeyDown}
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
