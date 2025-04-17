import { BsBell } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaRegArrowAltCircleDown } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const Navbar = ({ className, setIsOpen }) => {
    return (
        <header className={`${className} h-[68px] shadow-lg bg-white flex flex-col justify-center`}>
            <div className='flex   items-center justify-between pr-[10px]'>
                <div className='flex items-center justify-center md:hidden  h-[68px] w-[200px]  bg-[#fd9709e3]'>
                    <Link className='' to='/'>
                        <img src={logo} alt='Logo' />
                    </Link>
                </div>
                <div className='flex items-center justify-end'>
                    <div className='flex gap-6 md:hidden'>
                        <button type='button' className='relative '>
                            <div className=' w-[18px] h-[18px] absolute border-2 rounded-full animate-ping'></div>
                            <FaRegArrowAltCircleDown className='text-lg ' />
                        </button>
                        <button
                            type='button'
                            onClick={() => {
                                setIsOpen(perv => !perv);
                            }}>
                            <AiOutlineMenu className='text-lg' />
                        </button>
                    </div>
                </div>
                <div className='hidden md:flex items-center gap-12 pr-[80px]'>
                    <div className='profile-box flex items-center gap-4'>
                        <div className='flex flex-col items-end'>
                            <h2 className='text-[15px] font-[500]'>Stevne Zone</h2>
                            <p className='text-[13px] text-[#828282]'>Admin</p>
                        </div>
                        <Link className=''>
                            <CgProfile className='w-[40px] h-[40px] text-lg text-[#828282]' />
                        </Link>
                    </div>
                    <div className='flex gap-12'>
                        <Link className='text-[#828282]' to={"/"}>
                            <MdOutlineEmail className='h-[25px] w-[25px]' />
                        </Link>
                        <Link className='text-[#828282]' to={"/"}>
                            <BsBell className='h-[25px] w-[25px]' />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
