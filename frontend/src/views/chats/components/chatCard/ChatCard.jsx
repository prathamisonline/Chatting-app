import PropTypes from "prop-types";
import UseChatApi from "../../../../store/chat/useChatApi";
import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { MessageState, SelectedUserState } from "../../../../states/theme";
import { useWebSocket } from "../../../../store/Websocket/UseWebsocket";

const ChatCard = ({ user }) => {
  const { getUserWiseMessage } = UseChatApi();
  const setSelectedUser = useSetRecoilState(SelectedUserState);
  const messages = useRecoilValue(MessageState);

  const [searchParams, setSearchParams] = useSearchParams();
  // const { onlineUsers } = useWebSocket();

  // const isOnline = onlineUsers?.includes(user?._id);

  const handleClickOnChat = useCallback(
    (user) => {
      getUserWiseMessage(user?._id);
      setSearchParams(`?id=${user?._id}`);
      setSelectedUser(user);
    },
    [getUserWiseMessage, setSearchParams, setSelectedUser]
  );

  useEffect(() => {
    if (messages.length > 0) {
      setSelectedUser((prev) => ({
        ...prev,
        messages: [...(prev.messages || []), ...messages],
      }));
    }
  }, [messages, setSelectedUser]);

  return (
    <div
      className=" flex gap-4 items-center px-4 py-3 w-[350px]"
      onClick={() => handleClickOnChat(user)}
    >
      <div className={`avatar `}>
        <div className="w-12 rounded-full">
          <img src={user?.profilePic} />
        </div>
      </div>
      <div className="flex flex-col w-[300px]  ">
        <div className="flex justify-between items-center ">
          <div className="text-[17px] font-[600]">{user?.fullname}</div>
          {/* <div className="text-[12px] font-[400]">19:38</div> */}
        </div>
        <div className="flex justify-between items-center ">
          {/* <div className="text-[12px] font-[400]">See you later</div> */}
          {/* <div className=" flex justify-center items-center h-[18px] w-[18px] bg-green-400  rounded-full text-[12px] text-white">
            3
          </div> */}
        </div>
      </div>
    </div>
  );
};

ChatCard.propTypes = {
  user: PropTypes.shape({
    profilePic: PropTypes.string,
    fullname: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default ChatCard;
