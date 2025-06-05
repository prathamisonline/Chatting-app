import { useCallback } from "react";
import { IoMdMenu } from "react-icons/io";
import { AiOutlineLogout } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { DarkModeState } from "../../../../../states/theme";
import Avatar from "./components/Avatar";
import { AiOutlineClose } from "react-icons/ai";
import Sidebar from "../../sidebar";
import Messages from "../../messages/messages";
import useSignup from "../../../../../store/Auth/useAuthentication";
import { CiSettings } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Settings from "../../../../settings/Settings";
const Drawer = () => {
  const [isdark, setIsdark] = useRecoilState(DarkModeState);
  const { logout } = useSignup();
  const navigate = useNavigate();
  const handleLogout = useCallback(() => {
    logout();
  }, []);

  return (
    <div className="drawer drawer-overlay ">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <div className="flex w-full h-screen">
          <Sidebar />
          <Messages />
        </div>
      </div>
      <div className="drawer-side ">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay "
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-64 p-4 flex justify-between">
          <div className="flex justify-between items-start ">
            <Avatar />
            <label htmlFor="my-drawer" className="drawer-button">
              <AiOutlineClose />
            </label>
          </div>
          <div className="flex flex-col gap-2 ">
            <div className="flex justify-between items-center text-[16px] font-semibold ">
              Settings{" "}
              <label htmlFor="my_modal_7" className="btn">
                <CiSettings
                  className="text-[20px] cursor-pointer"
                  // onClick={() => navigate("/settings")}
                />
              </label>
            </div>
            <div className="flex justify-between items-center text-[16px] font-semibold">
              Dark mode{" "}
              <input
                type="checkbox"
                value="synthwave"
                className="toggle theme-controller"
                onChange={() => {
                  setIsdark(!isdark);
                  document.documentElement.setAttribute("data-theme", "night");
                }}
              />
            </div>
            <div className="flex justify-between items-center text-[16px] font-semibold">
              Logout{" "}
              <AiOutlineLogout
                className="text-[20px] cursor-pointer"
                onClick={handleLogout}
              />
            </div>
          </div>
          {/* </div> */}
        </ul>
      </div>
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box  p-0 m-0 ">
          <Settings />
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">
          Close
        </label>
      </div>
    </div>
  );
};

export default Drawer;

// {/* The button to open modal */}
// <label htmlFor="my_modal_7" className="btn">open modal</label>

// {/* Put this part before </body> tag */}
