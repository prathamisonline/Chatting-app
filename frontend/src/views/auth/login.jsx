import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignup from "../../store/Auth/useAuthentication";

const Login = () => {
  const naviagate = useNavigate();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const { login } = useSignup();
  const handleSignUp = useCallback(() => {
    naviagate("/signup");
  }, []);

  const handleChange = useCallback((e, name) => {
    const { value } = e.target;
    if (value) {
      setLoginData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      console.log("🚀 ~ Login ~ loginData:", loginData);
      await login(loginData?.username, loginData?.password);
    },
    [login, loginData]
  );
  return (
    <div className="bg-[#212121] m-auto flex h-svh justify-center items-center flex-col text-white">
      <div className="text-2xl font-semibold">Sign in to ChatBox</div>
      <div className="text-lg font-semibold ">
        Please enter your email and password.
      </div>
      <div className="m-4">
        <form onSubmit={handleSubmit}>
          <div className="m-4 ">
            <div className="pb-2">UserName</div>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                onChange={(e) => handleChange(e, "username")}
                type="text"
                className="grow"
                placeholder="UserName"
                value={loginData?.username}
              />
            </label>
          </div>
          <div className="m-4">
            <div className="pb-2">Password</div>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input
                value={loginData?.password}
                onChange={(e) => handleChange(e, "password")}
                type="password"
                className="grow"
              />
            </label>
          </div>
          <button
            className="btn  m-4 w-72 font-sm text-lg"
            type="submit"
            // onSubmit={handleSubmit}
          >
            Login
          </button>
        </form>
        <div className="m-4 text-center">
          Don't have an account?
          <span
            className="pl-4 font-semibold text-blue-700 underline cursor-pointer"
            onClick={handleSignUp}
          >
            Signup
          </span>{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
