import { Route, Routes } from "react-router-dom";
import Login from "./views/auth/login";
import SignUp from "./views/auth/signup";
import Home from "./views/home";
import Chat from "./views/chats/chat";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { UserDetailsState } from "./states/theme";

const Router = () => {
  const [userDetails, setUserDetails] = useRecoilState(UserDetailsState);
  useEffect(() => {
    const getUserDetails = localStorage.getItem("chat-user");
    setUserDetails(JSON.parse(getUserDetails));
  }, []);

  return (
    <>
      <Routes>
        {!userDetails ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="*" element={<Home />} />
          </>
        ) : (
          <>
            <Route path="/chat" element={<Chat />} />
          </>
        )}
        {/* <Route path="/chat" element={<Chat />} /> */}
      </Routes>
    </>
  );
};

export default Router;
