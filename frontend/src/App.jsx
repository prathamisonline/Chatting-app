import { Toaster } from "react-hot-toast";
import Router from "./routes";
import { useRecoilValue } from "recoil";
import { DarkModeState } from "./states/theme";

function App() {
  const darkmode = useRecoilValue(DarkModeState);
  return (
    <div className="overflow-hidden">
      <Router />
      <Toaster />
    </div>
  );
}

export default App;
