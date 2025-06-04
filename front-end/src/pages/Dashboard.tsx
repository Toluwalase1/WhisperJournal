import AsideComp from "@/components/Aside"
import { Mic } from 'lucide-react';
import { Link } from "react-router";
const DashboardPage = () => {
  return (
    <div className="bg-[#1C1D1E]">
        <AsideComp />
        <div className="text-white h-[100vh] mx-auto w-[70%] md:w-[80%]  pt-5 p-2">
            <div className="header  flex  justify-between items-center px-5">
                <div className="flex flex-col">
                    <span>Hello, User</span>
                    <span>Jun 28, 2025</span>
                </div>
                <div className="bg-[#BB85FB] rounded-full size-10 flex justify-center items-center cursor-pointer ">
                    <Link to={'/entries'}>
                    <Mic />
                    </Link>
                </div>
            </div>
         
        </div>
    </div>
  )
}

export default DashboardPage