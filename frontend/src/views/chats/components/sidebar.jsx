import { useEffect } from "react";
import UseChatApi from "../../../store/chat/useChatApi";
import ChatCard from "./chatCard/ChatCard";
import Topbar from "./topbar/Topbar";

const Sidebar = () => {
  const { getChatUsers, chatUsers } = UseChatApi();

  useEffect(() => {
    getChatUsers();
  }, [getChatUsers]);

  return (
    <div className="grow-1 max-w-[500px] m-1 ">
      <Topbar />
      {chatUsers.map((user) => {
        return (
          <>
            <ChatCard user={user} />
          </>
        );
      })}
    </div>
  );
};

export default Sidebar;
