import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const naviagate = useNavigate();

  const handleSignUp = useCallback(() => {
    naviagate("/signup");
  }, []);

  const handlelogin = useCallback(() => {
    naviagate("/login");
  }, []);
  return (
    <div>
      <div className="flex gap-6 p-6 ">
        <div
          className=" font-semibold text-blue-700 underline cursor-pointer"
          onClick={handlelogin}
        >
          Login
        </div>
        <div
          className=" font-semibold text-blue-700 underline cursor-pointer"
          onClick={handleSignUp}
        >
          Signup
        </div>
      </div>
      <div className="flex flex-col justify-center items-center h-svh m-auto gap-6">
        <div className="text-8xl font-extrabold text-cyan-500 ">
          Welcome to chatbox
        </div>
        <div className="text-2xl font-sm text-cyan-500 ">
          Where you make friends
        </div>
      </div>
    </div>
  );
};

export default Home;
