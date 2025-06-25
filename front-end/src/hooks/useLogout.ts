import { useUserHook } from "@/lib/context/userContext"
import { useJournalHook } from "@/lib/context/journalContext"

export const useLogout = () => {
    const { dispatch } = useUserHook()
    const { dispatch:userDispatch } = useJournalHook()

    const logout = () => {
        
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
        userDispatch({type: 'CLEAR_JOURNAL'})
    }
    
    return {logout}
}