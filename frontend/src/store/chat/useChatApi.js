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

    const updateReadStatus = useCallback(async (id) => {
        const { data } = await axios.put(`/api/messages/${id}`, {
            updateReadAll: true
        });
        console.log("🚀 ~ sendChat ~ data:", data)
    }, [])
    const getUserWiseMessage = useCallback(async (id) => {
        const { data } = await axios.get(`/api/messages/${id}`);
        updateReadStatus(id)
        setMessages(data)
    }, [setMessages, updateReadStatus])

    const sendChat = useCallback(async (id, payload) => {
        const { data } = await axios.post(`/api/messages/send/${id}`, payload);
        console.log("🚀 ~ sendChat ~ data:", data)

    }, [])

    return (
        { getChatUsers, chatUsers, getUserWiseMessage, messages, sendChat }
    )
}

export default UseChatApi