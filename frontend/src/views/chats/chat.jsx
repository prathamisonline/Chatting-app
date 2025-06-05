import { useRecoilState } from "recoil";
import { useEffect } from "react";
import Sidebar from "./components/sidebar";
import Messages from "./components/messages/messages";
import { useMediaQuery } from "react-responsive";
import { SidebarState } from "../../states/theme";

const Chat = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useRecoilState(SidebarState);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // Set initial sidebar state based on screen size
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile, setIsSidebarOpen]);

  return (
    <div className="relative flex h-screen bg-gray-100 dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-72 sm:w-80 transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } md:relative md:translate-x-0 md:w-96`}>
        <Sidebar />
      </div>
      
      {/* Messages */}
      <div className={`flex-1 flex flex-col h-full transition-all duration-300 ease-in-out ${
        isSidebarOpen ? 'opacity-0 md:opacity-100' : 'opacity-100'
      }`}>
        <Messages />
      </div>
      
      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Chat;
