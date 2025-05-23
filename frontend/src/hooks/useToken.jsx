import { useState } from "react"
import { getToken } from "../services/getToken"

const useToken = () => {

    const [error, setError] = useState(null)

    const login = async (email, password) =>{
        setError(null)

        try{
            const data = await getToken(email, password)
            return data
        } catch (e){
            setError(e.message || 'Error de autenticación')
            return null
        }
    }

    return { login, error}
}
export default useToken