import { House, SquarePen, Gift, Settings, LogOut } from 'lucide-react';
import { Link } from 'react-router';

const AsideComp = () => {
    return ( 
        <aside className="bg-[#131019] fixed bottom-0 top-0 w-[7vw] min-w-[60px] pt-5 text-white">
            <div className=' flex flex-col items-center  space-y-10'>
            <div className="border border-white rounded-full size-[50px] flex items-center justify-center ">
                Dp
            </div>
            <Link to={'/dashboard'} className='active:text-[#BB85FB]'>
                <House />
            </Link>
            <Link to={'/entries'} className='active:text-[#BB85FB]'>
                <SquarePen />
            </Link>
            
            <Link to={'/affirmations'} className='active:text-[#BB85FB]'>
                <Gift />
            </Link>
            <Link to={'/settings'} className='active:text-[#BB85FB]' >
                <Settings />
            </Link>

              <Link to={'/'} className='active:text-[#BB85FB]' >
                <LogOut />
            </Link>

            </div>
        </aside>
     );
}
 
export default AsideComp;