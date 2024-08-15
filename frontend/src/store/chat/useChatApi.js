import axios from 'axios';
import { useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { ChatUsersState, MessageState } from '../../states/theme';

const UseChatApi = () => {
    const [chatUsers, setChatUsers] = useRecoilState(ChatUsersState)
    const [messages, setMessages] = useRecoilState(MessageState)


    const getChatUsers = useCallback(async () => {
        const { data } = await axios.get(`/api/users`);
        setChatUsers(data)
    }, [setChatUsers])

    const getUserWiseMessage = useCallback(async (id) => {
        const { data } = await axios.get(`/api/messages/${id}`);
        setMessages(data)
    }, [setMessages])

    const sendChat = useCallback(async (id, payload) => {
        const { data } = await axios.post(`/api/messages/send/${id}`, payload);
        console.log("🚀 ~ sendChat ~ data:", data)

    }, [])

    useEffect(() => {

    }, [])
    return (
        { getChatUsers, chatUsers, getUserWiseMessage, messages, sendChat }
    )
}

export default UseChatApi