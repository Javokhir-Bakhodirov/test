import { CgClose } from "react-icons/cg";
import { RiMenu3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import MenuList from "./menuList/MenuList";

const Sidebar = ({ className, setIsOpen, isOpen }) => {
    return (
        <div className={`min-h-screen f-full w-[260px] max-w-[260px] md:w-auto bg-[#042954] ${className}`}>
            <div className='flex md:hidden  items-center justify-center py-[19px] border-b-1 border-[#021833] '>
                <Link to={"/"} className=''>
                    <img
                        src={"https://www.radiustheme.com/demo/html/psdboss/akkhor/akkhor/img/logo1.png"}
                        alt=''
                    />
                </Link>
            </div>
            <div className='hidden md:flex gap-10 items-center justify-center h-[69px] border-b-1 border-[#021833] bg-[#FFA602]'>
                {isOpen && (
                    <Link to={"/"} className=''>
                        <img src={logo} alt='' width={161} height={48} />
                    </Link>
                )}
                <button
                    className=''
                    type='button'
                    onClick={() => {
                        setIsOpen(perv => !perv);
                    }}>
                    {isOpen ? (
                        <RiMenu3Fill className='text-white text-3xl' />
                    ) : (
                        <CgClose className='text-white text-3xl' />
                    )}
                </button>
            </div>
            <MenuList collapsed={!isOpen} />
        </div>
    );
};

export default Sidebar;
