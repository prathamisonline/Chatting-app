import ChatCard from "./chatCard/ChatCard";
import Topbar from "./topbar/Topbar";

const Sidebar = () => {
  return (
    <div className="grow-1 max-w-[500px] m-1 ">
      <Topbar />
      <ChatCard />
    </div>
  );
};

export default Sidebar;
