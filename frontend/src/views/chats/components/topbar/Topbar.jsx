import Search from "./Search/search";
import Drawer from "./Drawer/drawer";

const Topbar = () => {
  return (
    <div className="flex justify-center items-center gap-2">
      {<Drawer />}
      <Search />
    </div>
  );
};

export default Topbar;
