import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { IoMdMenu, IoIosSearch, IoIosVideocam, IoMdCall, IoMdPeople } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { SidebarState } from '../../../../states/theme';
import Avatar from './Drawer/components/Avatar';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ currentChat }) => {
  const navigate = useNavigate();
  const setIsSidebarOpen = useSetRecoilState(SidebarState);
  const [showMenu, setShowMenu] = useState(false);

  // Mock data - replace with actual data from props or state
  const userData = {
    name: currentChat?.name || 'New Chat',
    status: currentChat?.lastSeen ? `last seen ${currentChat.lastSeen}` : 'online',
    avatar: currentChat?.avatar || null,
    isOnline: currentChat?.isOnline || false
  };

  const handleCreateGroup = () => {
    // Navigate to create group page or open group creation modal
    navigate('/group/create');
  };

  return (
    <div className="flex items-center justify-between p-2 sm:p-3 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center">
        <button 
          onClick={() => setIsSidebarOpen(prev => !prev)}
          className="p-2 mr-2 text-gray-500 rounded-full hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 md:hidden"
          aria-label="Toggle sidebar"
        >
          <IoMdMenu className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
        
        {/* App Name - Always Visible */}
        <h1 className="text-xl font-bold text-gray-800 dark:text-white mr-4 hidden md:block">ChatBox</h1>
        
        {currentChat && (
          <div className="flex items-center cursor-pointer">
            <div className="relative">
              <Avatar
                src={userData.avatar} 
                name={userData.name} 
                size="medium"
                className="mr-3"
              />
              {userData.isOnline && (
                <div className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
              )}
            </div>
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">{userData.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{userData.status}</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
        {/* Show chat actions when a chat is selected */}
        {currentChat && (
          <>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <IoIosSearch className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <IoMdCall className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
              <IoIosVideocam className="w-5 h-5" />
            </button>
          </>
        )}
        
        {/* 3-dot menu */}
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="More options"
          >
            <BsThreeDotsVertical className="w-5 h-5" />
          </button>
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-200 dark:border-gray-700">
              <button 
                onClick={handleCreateGroup}
                className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <IoMdPeople className="mr-2" />
                Create Group
              </button>
              
              {currentChat && (
                <>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                    View contact
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                    Mute notifications
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700">
                    Clear messages
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-red-400 dark:hover:bg-gray-700">
                    Delete chat
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
