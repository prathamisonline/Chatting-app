import { atom } from "recoil"

export const DarkModeState = atom({
    key: "DarkModeState",
    default: JSON.parse(localStorage.getItem("isdark"))
})