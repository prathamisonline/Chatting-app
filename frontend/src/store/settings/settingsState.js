import { atom } from "recoil"

export const SettingsHistoryState = atom({
    key: "SettingsHistoryState",
    default: []
})

export const ActiveSettingState = atom({
    key: "ActiveSettingState",
    default: ""
})