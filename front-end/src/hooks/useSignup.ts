import { useState } from "react";
import { useNavigate } from "react-router";



 export const useSignup =  () => {
        const [loading, setLoading] = useState<boolean>()
        const [error, setError] = useState(null)
        const [success, setSuccess] = useState(null)
              const api = import.meta.env.VITE_API_BASE_URL

        const navigate = useNavigate()

         const Signup = async (name: string, email: string,  password: string) => {
            setLoading(true)
            setError(null)
            const response = await fetch(`${api}/api/user/signup`,{
             method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, email, password})
            })
            const json = await response.json()

            if(!response.ok){
                setLoading(false)
                setError(json.error)
            }

            if(response.ok){
            // setEmail('')
            // setPassword('')
                setLoading(false)
                setSuccess(json.message)

                setTimeout(()=> 
                {
                    navigate('/login')

                }, 2000)

            }
        }
    return {
        Signup,
        loading,
        error,
        success
    }

    
}

