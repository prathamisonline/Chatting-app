import { atom } from "recoil"

export const DarkModeState = atom({
    key: "DarkModeState",
    default: JSON.parse(localStorage.getItem("isdark"))
})

export const UserDetailsState = atom({
    key: "UserDetailsState",
    default: JSON.parse(localStorage.getItem("chat-user")) || {}
})
export const MessageState = atom({
    key: "MessageState",
    default: []
})
export const ChatUsersState = atom({
    key: "ChatUsersState",
    default: []
})
export const SelectedUserState = atom({
    key: "SelectedUserState",
    default: {}
})