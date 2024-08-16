import { useEffect } from "react";
import UseChatApi from "../../../store/chat/useChatApi";
import ChatCard from "./chatCard/ChatCard";
import Topbar from "./topbar/Topbar";
import { ChatUsersState, SelectedUserState } from "../../../states/theme";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Sidebar = () => {
  const setSelectedUser = useSetRecoilState(SelectedUserState);
  const users = useRecoilValue(ChatUsersState);

  const { getChatUsers, chatUsers } = UseChatApi();

  useEffect(() => {
    getChatUsers();
  }, [getChatUsers]);

  // useEffect(() => {
  //   if (users?.length) {
  //     setSelectedUser(users[0]);
  //   }
  // }, [users]);

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
