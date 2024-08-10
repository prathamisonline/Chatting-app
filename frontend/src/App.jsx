import { Toaster } from "react-hot-toast";
import Router from "./routes";

function App() {
  return (
    <div className="bg-[#212121] h-svh">
      <Router />
      <Toaster />
    </div>
  );
}

export default App;
