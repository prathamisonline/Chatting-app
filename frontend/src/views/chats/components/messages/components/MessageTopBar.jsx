import { useRecoilValue, useSetRecoilState } from "recoil";
import { useWebSocket } from "../../../../../store/Websocket/UseWebsocket";
import { SelectedUserState, SidebarState } from "../../../../../states/theme";
import { IoArrowBack } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";

const MessageTopBar = () => {
  const { onlineUsers } = useWebSocket();
  const selectedUser = useRecoilValue(SelectedUserState);
  const setIsSidebarOpen = useSetRecoilState(SidebarState);
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const isOnline = selectedUser?._id ? onlineUsers.includes(selectedUser._id) : false;

  const handleBackClick = () => {
    if (isMobile) {
      setIsSidebarOpen(true);
    }
  };

  if (!selectedUser) {
    return (
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 animate-pulse" />
          <div className="space-y-1">
            <div className="w-32 h-4 rounded bg-gray-200 dark:bg-gray-600 animate-pulse" />
            <div className="w-24 h-3 rounded bg-gray-100 dark:bg-gray-700 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <div className="flex items-center space-x-3">
        {isMobile && (
          <button 
            onClick={handleBackClick}
            className="p-1 mr-1 text-gray-600 rounded-full hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            aria-label="Back to conversations"
          >
            <IoArrowBack className="w-6 h-6" />
          </button>
        )}
        <div className={`relative ${isOnline ? "online" : ""}`}>
          <div className="w-10 h-10 overflow-hidden rounded-full">
            <img 
              src={selectedUser?.profilePic || '/default-avatar.png'} 
              alt={selectedUser?.fullname}
              className="object-cover w-full h-full"
              onError={(e) => {
                e.target.src = '/default-avatar.png';
              }}
            />
          </div>
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full dark:border-gray-800"></span>
          )}
        </div>
        <div>
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white sm:text-base">
            {selectedUser?.fullname}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {isOnline ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>
        <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MessageTopBar;
