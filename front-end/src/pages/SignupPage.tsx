import { LeafyGreen, Eye , EyeOff   } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router';
import { useSignup } from '@/hooks/useSignup';
import { Button } from "@/components/ui/button"


 


 const Signup = () =>  {
  const { Signup, loading, error, success } = useSignup()
  const [password, setPassword] = useState(false)
  const [formdata, setFormdata] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  // const [error, setError] = useState('')
  
  function passwordChange() {
    setPassword((prev) => !prev)
}

  async function handleSubmit(){
    // validateForm()
    // if(error){
    //   return
    // }
    //    if(!formdata.name || !formdata.email || !formdata.password || !formdata.confirmPassword){
    //     setError('All fields must be field!')
    //     return
    // }

       if(formdata.password !== formdata.confirmPassword) {
      alert('Password does not match')
      return
    }
  
    await Signup(formdata.name, formdata.email, formdata.password)

  }

  // function validateForm(){
  //   if(!formdata.name || !formdata.email || !formdata.password || !formdata.confirmPassword){
  //       setError('All fields must be field!')
  //       return
  //   }

  //   if(formdata.password !== formdata.confirmPassword) {
  //     setError('Password does not match')
  //     return
  //   }
  // }



  return (
    <>
    {/* rgba(0, 0, 0, 0.4) */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#1C1D1E] text-white min-h-screen ">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm  flex flex-col items-center">
         <div className="p-5 rounded-full bg-linear-to-t from-sky-500 to-indigo-500 cursor-pointer">
                  <Link to={"/"}>
                  <LeafyGreen  />
                  </Link>
                </div>
          <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-white">
            Join Whisper Journal
          </h2>
        </div>
        
        

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={(e)=>e.preventDefault()}>
            {
              error && 
              <div className='border-2 rounded-sm p-2 border-red-500 text-red-900 font-bold text-xl'>
              {error}
            </div>
            }
            {
              success && 
              <div className='border-2 rounded-sm p-2 border-green-500 text-green-600'>
              {success}
            </div>
            }
            
             <div>
              <label htmlFor="Name" className="block text-sm/6 font-medium">
                Name
              </label>
              <div className="">
                <input
                  id="Name"
                  name="Name"
                  type="text"
                  value={formdata.name}
                  onChange={(e)=> setFormdata(prev=>({...prev, name: e.target.value}))}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium ">
                Email address
              </label>
              <div className="">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formdata.email}
                  onChange={(e) => setFormdata(prev => ({...prev, email: e.target.value}))}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

             {/* Password */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium ">
                  Password
                </label>
              </div>

              <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={ password ? "text" : "password"}
                    autoComplete="current-password"
                    value={formdata.password}
                    onChange={(e) => setFormdata(prev => ({...prev, password: e.target.value}))}
                    
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                  {
                    
                    !password ?<Eye className='absolute right-2 cursor-pointer top-2  z-100 text-black font-bold'  onClick={passwordChange} /> : <EyeOff className='absolute right-2 cursor-pointer top-2  z-100 text-black font-bold'  onClick={passwordChange} />
                  } 
                              
               </div>
            </div>

            
              {/* Confirm Password */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="Confirm Password" className="block text-sm/6 font-medium ">
                  Confirm Password
                </label>
                  
              </div>
              <div className="">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type={ password ? "text" : "password"}
                  value={formdata.confirmPassword}
                  onChange={(e) => setFormdata(prev => ({...prev, confirmPassword: e.target.value}))}

                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
                 <div className="text-sm">
                       Have an account?  <Link to={"/login"} className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Login
                  </Link>
                </div>
              </div>
            </div>

            

            <div>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-[#04d8c5] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[#127F7D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 cursor-pointer"
              >
                Sign Up
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup;