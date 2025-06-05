import React, { useCallback, useEffect, useState } from "react";
import MyAccount from "./components/myAccount/MyAccount";
import Notification from "./components/notification&Sounds/Notification";
import Privacy from "./components/privacy/Privacy";
import ChatSettings from "./components/chatSettings/ChatSettings";

import { MdAccountCircle } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { IoChatbox } from "react-icons/io5";
import { MdPrivacyTip } from "react-icons/md";
import { useRecoilState } from "recoil";
import {
  ActiveSettingState,
  SettingsHistoryState,
} from "../../store/settings/settingsState";

const SettingNavigation = [
  {
    title: "My account",
    component: <MyAccount />,
    type: "myaccount",
    icon: <MdAccountCircle />,
    activeIcon: "",
  },
  {
    title: "Notification",
    component: <Notification />,
    type: "notification",
    icon: <IoMdNotifications />,
    activeIcon: "",
  },
  {
    title: "ChatSettings",
    component: <ChatSettings />,
    type: "chatsettings",
    icon: <IoChatbox />,
    activeIcon: "",
  },
  {
    title: "Privacy",
    component: <Privacy />,
    type: "privacy",
    icon: <MdPrivacyTip />,
    activeIcon: "",
  },
];
const Settings = () => {
  const [activeSetting, setActiveSetting] = useRecoilState(ActiveSettingState);
  console.log("🚀 ~ Settings ~ activeSetting:", activeSetting);
  const [history, setHistory] = useRecoilState(SettingsHistoryState);

  useEffect(() => {
    setActiveSetting("");
  }, []);
  const handleClick = useCallback((type) => {
    setActiveSetting(type);
  }, []);

  return (
    <div className="min-h-96">
      {!activeSetting
        ? SettingNavigation?.map((item, index) => (
            <div className="flex flex-col" key={index}>
              <div
                className="flex gap-4  justify-start items-center text-2xl  hover:bg-gray-950 rounded p-2 w-full"
                onClick={() => handleClick(item?.type)}
              >
                <div className="ml-4"> {item.icon}</div>
                <div> {item.title}</div>
              </div>
            </div>
          ))
        : SettingNavigation.map((item) => (
            <>{item.type === activeSetting && item.component}</>
          ))}
    </div>
  );
};

export default Settings;
