import UseChatApi from "../../../../../store/chat/useChatApi";
import { useEffect } from "react";
import { useWebSocket } from "../../../../../store/Websocket/UseWebsocket";
import { useRecoilValue } from "recoil";
import { SelectedUserState } from "../../../../../states/theme";

const MessageTopBar = () => {
  const { getChatUsers } = UseChatApi();
  const { onlineUsers } = useWebSocket();

  const selectedUser = useRecoilValue(SelectedUserState);

  const isOnline = onlineUsers.includes(selectedUser._id);

  useEffect(() => {
    getChatUsers();
  }, [getChatUsers]);

  return (
    <div className=" flex grow-0 justify-between items-center h-[58px] p-4">
      <div className="flex justify-start items-center gap-4">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-10 rounded-full">
            <img src={selectedUser?.profilePic} />
          </div>
        </div>
        <div>
          <div className="font-semibold dark:text-red-600">
            {selectedUser?.fullname}
          </div>
          <div className="text-[12px] text-gray-500">Last seen 5 min ago</div>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <div>a</div>
        <div>b</div>
        <div>c</div>
      </div>
    </div>
  );
};

export default MessageTopBar;
