import { useUserHook } from "@/lib/context/userContext"

export const useLogout = () => {
    const { dispatch } = useUserHook()

    const logout = () => {
        
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
    }
    
    return {logout}
}