import { Route, Routes } from "react-router-dom";
import Login from "./views/auth/login";
import SignUp from "./views/auth/signup";
import Home from "./views/home";

const Router = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
};

export default Router;
