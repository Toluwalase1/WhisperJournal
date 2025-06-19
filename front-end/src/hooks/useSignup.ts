import { useState } from "react";



 export const useSignup =  () => {
        const [loading, setLoading] = useState<boolean>()
        const [error, setError] = useState(null)
        const [success, setSuccess] = useState(null)

         const Signup = async (name: string, email: string,  password: string) => {
            setLoading(true)
            setError(null)
            const response = await fetch('http://localhost:3000/api/user/signup',{
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
                    window.location.href = '/login'

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

