import { getCheckEmail } from "../services/getCheckEmail"

const useCheckEmail = () =>{

    const checkEmail = async(email) =>{

        try{
            const data = await getCheckEmail(email)
            return data
        } catch ( e ){
            throw new Error(e.message )
        }
    }

    return {checkEmail}
}
export default useCheckEmail