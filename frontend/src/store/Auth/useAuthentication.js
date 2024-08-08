import { useCallback } from 'react'
import { createData } from '../../utils/api'

const UseAuthentication = () => {
    const signup = useCallback(async (payload) => {
        console.log("🚀 ~ signup ~ payload:", payload)
        const endpoint = `auth/signup`;
        const data = createData(payload, endpoint)
        console.log("data", data)
    }, [])
    return { signup }
}

export default UseAuthentication