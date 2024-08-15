import { useSearchParams } from "react-router-dom";
import UseChatApi from "../../../../../store/chat/useChatApi";
import { useEffect } from "react";

const MessageTopBar = () => {
  const [searchParams] = useSearchParams();
  const { getChatUsers, chatUsers } = UseChatApi();

  useEffect(() => {
    getChatUsers();
  }, [getChatUsers]);

  const findUser = chatUsers.find((user) => {
    return user._id === searchParams.get("id");
  });

  return (
    <div className=" flex justify-start items-center h-[58px] p-4">
      <div className="flex justify-start items-center gap-4">
        <div className="avatar online">
          <div className="w-10 rounded-full">
            <img src={findUser?.profilePic} />
          </div>
        </div>
        <div>
          <div className="font-semibold dark:text-red-600">
            {findUser?.fullname}
          </div>
          <div className="text-[12px] text-gray-500">Last seen 5 min ago</div>
        </div>
      </div>
    </div>
  );
};

export default MessageTopBar;
