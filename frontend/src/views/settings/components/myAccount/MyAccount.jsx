import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import {
  ActiveSettingState,
  SettingsHistoryState,
} from "../../../../store/settings/settingsState";

const MyAccount = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useRecoilState(SettingsHistoryState);
  const [activeSetting, setActiveSetting] = useRecoilState(ActiveSettingState);
  const goBack = () => {
    setActiveSetting("");
  };

  return (
    <div className="m-6">
      <div className="flex gap-4 items-center text-xl font-semibold ">
        <IoMdArrowRoundBack onClick={() => goBack()} className="text-2xl" /> My
        Account
      </div>
    </div>
  );
};

export default MyAccount;
