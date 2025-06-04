import AsideComp from "@/components/Aside"



const SettingsPage = () => {
  return (
    <div className="bg-[#1C1D1E]">
        <AsideComp />
        <div className="text-black h-[100vh] mx-auto w-[70%] md:w-[80%]  p-5">
            <h1 className="text-center text-4xl  text-white font-bold mb-5">
              Settings
            </h1>
            {/* Settings Container */}
            <div className="border border-white p-2  mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border border-red-500 flex flex-col items-center">
                <h1 className="text-center">Journal Preferences</h1>
                <input type="color" name="" id="" />
              </div>
              
              <div className="border border-red-500">
                <h1 className="text-center">
                  Privacy and Security
                </h1>
              </div>
            </div>
        </div>
    </div>
  )
}

export default SettingsPage