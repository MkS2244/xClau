import { getToken } from "../services/getToken"

const useToken = () => {

    const login = async (email, password) => {

        try {
            const data = await getToken(email, password)
            return data
        } catch (e) {
            throw new Error(e.message)
            return null
        }
    }

    return { login }
}
export default useToken