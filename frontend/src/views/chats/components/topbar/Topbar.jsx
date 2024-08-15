import Search from "./Search/search";
import Drawer from "./Drawer/drawer";
import { IoMdMenu } from "react-icons/io";

const Topbar = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      <label htmlFor="my-drawer" className="drawer-button">
        <IoMdMenu className="text-3xl " />
      </label>
      <Search />
    </div>
  );
};

export default Topbar;
