import { useEffect } from "react";
import UseChatApi from "../../../store/chat/useChatApi";
import ChatCard from "./chatCard/ChatCard";
import Topbar from "./topbar/Topbar";
import { useRecoilState } from "recoil";
import { SidebarState } from "../../../states/theme";

const Sidebar = () => {
  const { getChatUsers, chatUsers } = UseChatApi();
  const [, setIsSidebarOpen] = useRecoilState(SidebarState);

  useEffect(() => {
    getChatUsers();
  }, [getChatUsers]);

  return (
    <div className="h-full flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <Topbar />
      <div className="h-full overflow-y-auto">
        {chatUsers.map((user, index) => (
          <div key={index} onClick={() => setIsSidebarOpen(false)}>
            <ChatCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
