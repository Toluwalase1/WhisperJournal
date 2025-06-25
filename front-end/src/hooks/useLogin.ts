import { useUserHook } from "@/lib/context/userContext"
import { useState } from "react";



 export const useLogin =  () => {
        const { dispatch } = useUserHook()
        const [loading, setLoading] = useState<boolean>()
         const [error, setError] = useState(null)
    

         const Login = async (email: string, password: string) => {
            setLoading(true)
            const response = await fetch('http://localhost:3000/api/user/login',{
             method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
            })
            const json = await response.json()
           

            if(!response.ok){
                setError(json.error)
                setLoading(false)
            }
            if(response.ok){
            // setEmail('')
            // setPassword('')
            setLoading(false)
            const user = {
                token: json.token,
                user: json.user.name
            }
            localStorage.setItem('user',JSON.stringify(user))
            dispatch({type: 'LOGIN', payload:user})
             }
        }
    return {
        Login,
        loading,
        error
    }

    
}

