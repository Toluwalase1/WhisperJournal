import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router'

// const features = [
//   "AI-powered, voice-first journaling",
//   "Private, auto-lock security",
//   "Warm, wise narrator companionship",
//   "Daily affirmations & gentle support"
// ]

export default function WelcomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-[#0f0a19] min-h-screen"> 
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link to={"/"} className="-m-1.5 p-1.5">
              <span className="sr-only">Whisper Journal</span>
              <h1 className='font-bold text-2xl text-white'>Whisper Journal</h1>
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400 hover:text-white"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            <Link to={"#"} className="text-sm/6 font-semibold text-white hover:text-purple-300">
              Features
            </Link>
            <Link to={"#"} className="text-sm/6 font-semibold text-white hover:text-purple-300">
              Affirmations
            </Link>
            <Link to={"#"} className="text-sm/6 font-semibold text-white hover:text-purple-300">
              FAQ
            </Link>
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link to={"/login"} className="text-sm/6 font-semibold text-white hover:text-purple-300 ">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-black/50" /> {/* Semi-transparent overlay */}
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#1a142d] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
            <div className="flex items-center justify-between">
              <Link to={"#"} className="-m-1.5 p-1.5">
                <h1 className='font-bold text-2xl text-white'>Whisper Journal</h1>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-400 hover:text-white"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-700">
                <div className="space-y-2 py-6">
                  <Link to={"#"} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-purple-900/30">
                    Features
                  </Link>
                  <Link to={"#"} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-purple-900/30">
                    Affirmations
                  </Link>
                  <Link to={"#"} className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-purple-900/30">
                    FAQ
                  </Link>
                </div>
                <div className="py-6">
                  <Link to={"/login"} className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-purple-900/30">
                    Log in
                  </Link>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 lg:px-8 pb-5">
        <div className="mx-auto max-w-2xl py-32  sm:py-48 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight  text-white sm:text-7xl">
              "Every journey begins with a single entry."
            </h1>
            <p className="mt-6 text-lg leading-8 text-purple-200">
              I'm here to listen, whenever you need me.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to={"/signup"}
                className="rounded-md bg-purple-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
              >
                Get started
              </Link>
              <Link to={"/login"} className="text-sm font-semibold leading-6 text-white hover:text-purple-300">
                Log in <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Features section */}
        {/* <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Speak freely, I'm listening...
            </h2>
          </div>
          <ul className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-16">
            {features.map((feature, index) => (
              <li key={index} className="relative pl-9">
                <div className="absolute left-0 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-500">
                  <span className="text-xs font-bold">{index + 1}</span>
                </div>
                {feature}
              </li>
            ))}
          </ul>
        </div> */}

        {/* Footer */}
            <FooterSec  />
      </div>
    </div>
  )
}
const FooterSec = () =>  {

    return (
             <footer className=" border-t  border-white pt-2 ">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-8 sm:flex-row">
              <p className="text-xs leading-5 text-gray-400">
                &copy; 2025 Whisper Journal. All rights reserved.
              </p>
              <div className="flex gap-4">
                <Link to={"#"} className="text-sm leading-6 text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
                <Link to={"#"} className="text-sm leading-6 text-gray-400 hover:text-white">
                  Support
                </Link>
              </div>
            </div>
          </div>
        </footer>
    );
}