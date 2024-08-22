import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignup from "../../store/Auth/useAuthentication";

const SignUp = () => {
  const naviagate = useNavigate();
  const [signupdata, setSignupData] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const { signup } = useSignup();

  const handlelogin = useCallback(() => {
    naviagate("/login");
  }, []);

  const handleChange = useCallback((e, name) => {
    const { value } = e.target;
    if (value) {
      setSignupData((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  }, []);

  const onCheckboxChange = (gender) => {
    setSignupData((prev) => {
      return {
        ...prev,
        gender,
      };
    });
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      await signup(
        signupdata?.fullname,
        signupdata?.username,
        signupdata?.password,
        signupdata?.confirmPassword,
        signupdata?.gender
      );
    },
    [signup]
  );

  return (
    <div className="m-auto flex h-svh justify-center items-center flex-col bg-base-100 w-full max-w-sm shrink-0 shadow-2xl pt-8 overflow-auto">
      <div className="text-2xl font-semibold ">Sign up in to ChatBox</div>
      <div className="text-lg font-semibold ">Please enter your details.</div>
      <div className="m-4">
        <form onSubmit={handleSubmit}>
          <div className="m-4 ">
            <div className="pb-2">Full name</div>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                value={signupdata?.fullname}
                onChange={(e) => handleChange(e, "fullname")}
                type="text"
                className="grow"
                placeholder="Full name"
              />
            </label>
          </div>
          <div className="m-4 ">
            <div className="pb-2">Username</div>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
              </svg>
              <input
                value={signupdata?.username}
                onChange={(e) => handleChange(e, "username")}
                type="text"
                className="grow"
                placeholder="Username"
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
                value={signupdata?.password}
                onChange={(e) => handleChange(e, "password")}
                type="password"
                className="grow"
              />
            </label>
          </div>
          <div className="m-4">
            <div className="pb-2">Confirm password</div>
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
                value={signupdata?.confirmPassword}
                onChange={(e) => handleChange(e, "confirmPassword")}
                type="password"
                className="grow"
              />
            </label>
          </div>
          <div className="m-4">
            <div>Gender</div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Male</span>
                <input
                  value={signupdata?.male}
                  onChange={() => onCheckboxChange("male")}
                  checked={signupdata?.gender === "male"}
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-red-500"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Female</span>
                <input
                  value={signupdata?.female}
                  onChange={() => onCheckboxChange("female")}
                  checked={signupdata?.gender === "female"}
                  type="radio"
                  name="radio-10"
                  className="radio checked:bg-blue-500"
                />
              </label>
            </div>
          </div>
          <button type="submit" className="btn  m-4 w-72 font-sm text-lg">
            Sign up
          </button>
        </form>
        <div className="m-4 text-center">
          Already a member?
          <span
            className="pl-4 font-semibold text-blue-700 underline cursor-pointer"
            onClick={handlelogin}
          >
            Login
          </span>{" "}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
