import Messages from "./components/messages/messages";
import Sidebar from "./components/sidebar";

const Chat = () => {
  return (
    <div className="flex w-full h-screen">
      <Sidebar />
      <Messages />
    </div>
  );
};

export default Chat;
