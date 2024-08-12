import { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { useRecoilState } from "recoil";
import { DarkModeState } from "../../../../../states/theme";
import Avatar from "./components/Avatar";

const Drawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isdark, setIsdark] = useRecoilState(DarkModeState);
  // const [isdark, setIsdark] = useState(
  //   JSON.parse(localStorage.getItem("isdark"))
  // );
  useEffect(() => {
    localStorage.setItem("isdark", JSON.stringify(isdark));
  }, [isdark]);

  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="drawer-button">
          <IoMdMenu
            className="text-3xl "
            onClick={() => setIsDrawerOpen(true)}
          />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          <Avatar />
          <div className="flex justify-between items-center">
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
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
