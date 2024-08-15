import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { MessageState } from '../../states/theme';

const UseChatApi = () => {
    const [chatUsers, setChatUsers] = useState([])
    const [messages, setMessages] = useRecoilState(MessageState)


    const getChatUsers = useCallback(async () => {
        const { data } = await axios.get(`/api/users`);
        setChatUsers(data)
    }, [])

    const getUserWiseMessage = useCallback(async (id) => {
        const { data } = await axios.get(`/api/messages/${id}`);
        setMessages(data)
    }, [])

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