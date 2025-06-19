import { useLogout } from '@/hooks/useLogout';
import { House, SquarePen, Gift, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router';
import { useUserHook } from "@/lib/context/userContext";


const AsideComp = () => {
      const { user } = useUserHook()
      const { user:userName } = useUserHook()
    const { logout } = useLogout()
    const handleLogout = () => {
        logout()
    }
  function generateProfile(user: typeof userName): string {
    
    const names = user.user.split(" ");
    const first = names[0];
    
    // If there's no second name, just use first two letters of first name (uppercased)
    if (names.length < 2) {
        return first.slice(0, 2).toUpperCase();
    }
    
    const second = names[1];
    return (first[0] + second[0]).toUpperCase();
}

    return ( 
        <aside className="bg-[#131019] fixed bottom-0 top-0 w-[7vw] min-w-[60px] pt-5 text-white">
            <div className=' flex flex-col items-center  space-y-10'>
            <div className="border border-white rounded-full size-[50px] flex items-center justify-center ">
                {generateProfile(user)}
            </div>
            <Link to={'/dashboard'} className='active:text-[#BB85FB]'>
                <House />
            </Link>
            <Link to={'/entries'} className='active:text-[#BB85FB]'>
                <SquarePen />
            </Link>
            
            {/* <Link to={'/affirmations'} className='active:text-[#BB85FB]'>
                <Gift />
            </Link> */}
            <Link to={'/settings'} className='active:text-[#BB85FB]' >
                <Settings />
            </Link>

              <Link to={'/'} className='active:text-[#BB85FB]' onClick={handleLogout} >
                <LogOut />
            </Link>

            </div>
        </aside>
     );
}
 
export default AsideComp;