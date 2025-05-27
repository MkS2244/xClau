import { getRegisterUser } from "../services/getRegisterUser"

const useRegisterUser = () => {

    const registerUser = async (userData) => {

        try {
            const data = await getRegisterUser(userData)
            return data
        } catch (e) {
            throw new Error(e.message )
            return null
        }

    }

    return {registerUser}
}
export default useRegisterUser