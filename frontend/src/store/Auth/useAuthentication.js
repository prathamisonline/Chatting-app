import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { UserDetailsState } from "../../states/theme";

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useRecoilState(UserDetailsState);


    const login = async (username, password) => {
        // const success = handleInputLoginErrors(username, password);
        // if (!success) return;
        // setLoading(true);
        // try {
        //     const { data } = await axios.post(`/api/auth/login`, { username, password });

        //     if (data.error) {
        //         throw new Error(data.error);
        //     }

        //     localStorage.setItem("chat-user", (data));
        //     navigate("/chat")
        //     setUserDetails(data);
        // } catch (error) {
        //     toast.error(error.message);
        // } finally {
        //     setLoading(false);

        // }

        // const success = handleInputErrors(username, password);
        // if (!success) return;
        // setLoading(true);
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user", JSON.stringify(data));
            setUserDetails(data);
            navigate("/chat")
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };


    const signup = async (fullname, username, password, confirmPassword, gender) => {
        const success = handleInputErrors(fullname, username, password, confirmPassword, gender);
        console.log("success", fullname, username, password, confirmPassword, gender);

        if (!success) return;

        setLoading(true);
        try {
            const { data } = await axios.post(`/api/auth/signup`, { fullname, username, password, confirmPassword, gender });

            if (data.error) {
                throw new Error(data.error);
            }
            localStorage.setItem("chat-user", JSON.stringify(data));
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
            navigate("/login")
        }
    };
    const logout = async () => {
        try {
            const { data } = await axios.post(`/api/auth/logout`, {});

            if (data.error) {
                throw new Error(data.error);
            }
            localStorage.removeItem("chat-user");
            setUserDetails(null);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
            navigate("/login")
        }
    };

    return { loading, signup, login, logout };
};
export default useSignup;

function handleInputErrors(fullname, username, password, confirmPassword, gender) {
    if (!fullname || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    return true;
}



function handleInputLoginErrors(username, password) {
    if (!username || !password) {
        toast.error("Please fill in all fields");
        return false;
    }

    return true;
}
