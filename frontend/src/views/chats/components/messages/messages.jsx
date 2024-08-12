import MessageBody from "./components/MessageBody";
import MessageTopBar from "./components/MessageTopBar";
import { IoSend } from "react-icons/io5";

const Messages = () => {
  return (
    <div className="relative  grow">
      <MessageTopBar />
      <div className="w-full flex justify-center ">
        <MessageBody />
        <div className="absolute bottom-4 w-[700px]">
          <label className="relative block">
            <input
              type="text"
              placeholder="Message"
              className="input input-bordered w-full pr-10"
            />
            <button className="absolute inset-y-0 right-0 flex items-center pr-3">
              <IoSend size={24} />
            </button>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Messages;
