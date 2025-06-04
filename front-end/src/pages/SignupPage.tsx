import { LeafyGreen } from 'lucide-react';
import { Link } from 'react-router';

 
 const Signup = () =>  {
  return (
    <>
    {/* rgba(0, 0, 0, 0.4) */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-[#1C1D1E] text-white vh-full">
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
          <form action="#" method="POST" className="space-y-6">

             <div>
              <label htmlFor="Name" className="block text-sm/6 font-medium">
                Name
              </label>
              <div className="">
                <input
                  id="Name"
                  name="Name"
                  type="text"
                  required
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
                  required
                  autoComplete="email"
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

              <div className="">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
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
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
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
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#04d8c5] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[#127F7D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup;