import AsideComp from "@/components/Aside"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Save } from "lucide-react"
import { useState } from "react"
import { useUserHook } from "@/lib/context/userContext";



const SettingsPage = () => {
  const [themeColor, setThemeColor] = useState('#1C1D1E')
  const [user, setUser] = useState('')
   const { user:userName } = useUserHook()

  return (
    <div className="bg-[#1C1D1E]">
        <AsideComp />
        <div className="text-black h-[100vh] mx-auto w-[70%] md:w-[80%]  p-5">
            <h1 className="text-center text-4xl  text-white font-bold mb-5">
              Settings
            </h1>
            {/* Settings Container */}

              <div className="flex flex-col w-[50%] min-w-[300px] mt-10 p-10 text-white mx-auto">
               <Label htmlFor="Username" className="mb-2">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={user}
                  onChange={(e)=>setUser(e.target.value)}
                  placeholder={userName.user}
                  
                />
                <label>Theme Color</label>
                <input type="color" value={themeColor} onChange={(e)=>setThemeColor(e.target.value)} name="" id="" className="size-[60px]" />
                {/* <span>
                {themeColor}
                </span> */}
               

                <Button  size={'lg'} className="cursor-pointer mt-5 bg-[green] hover:bg-[green]" disabled={false}>
                  <Save />
                  Save
                </Button>
              </div>
        </div>
    </div>
  )
}

export default SettingsPage