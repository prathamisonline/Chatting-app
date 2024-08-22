import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useRecoilValue } from "recoil";
import { UserDetailsState } from "../../states/theme";

export const useWebSocket = () => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const userDetails = useRecoilValue(UserDetailsState);

    useEffect(() => {
        if (userDetails) {
            const socket = io("http://localhost:4000", {
                query: {
                    userId: userDetails._id,
                },
            });

            setSocket(socket);

            // socket.on() is used to listen to the events. can be used both on client and server side
            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [userDetails]);

    return {
        onlineUsers,
        socket
    };
};