import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const useSignup = () => {
    const [loading, setLoading] = useState(false);


    const login = async (username, password) => {
        const success = handleInputLoginErrors(username, password);
        if (!success) return;
        setLoading(true);
        try {
            const { data } = await axios.post(`/api/auth/login`, { username, password });

            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user", JSON.stringify(data));
            // setAuthUser(data);
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
        }
    };

    return { loading, signup, login };
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
