import React, { useContext, useState } from 'react'

import YtLogo from "../images/yt-logo.png"
import YtLogoMobile from "../images/yt-logo-mobile.png"

import { SlMenu } from "react-icons/sl";
import { IoIosSearch } from "react-icons/io";
import { RiVideoAddLine } from "react-icons/ri";
import { FiBell } from "react-icons/fi";
import { CgClose } from "react-icons/cg";
import { Context } from '../context/ContextApi';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {

    const [searchQuery, setSearchQuery] = useState("")
    const navigate = useNavigate();
    const { mobileMenu, setMobileMenu } = useContext(Context)

    const mobileIconControl = () => {
        setMobileMenu(!mobileMenu);
    }

    const searchHandler = (e) => {
        if( (e === "searchButton" || e?.key === "Enter" ) && searchQuery?.length > 0){
            navigate(`/search/${searchQuery}`);
        }
    }

    return (
        <>
            <div className='flex items-center justify-between w-full h-[56px] bg-[#202020] text-white px-4 md:px-10'>
                <div className='flex justify-between w-full'>

                    <div className='flex items-center gap-3 md:gap-5'>
                        <div onClick={mobileIconControl} className='text-xl cursor-pointer md:hidden'>
                            {
                                mobileMenu ? <SlMenu /> : <CgClose />
                            }
                        </div>
                        <Link to="/">
                            <img src={YtLogoMobile} className='h-6 md:hidden text-xs' alt='logo' />
                            <img src={YtLogo} className='h-6 hidden md:block text-xs' alt='logo' />
                        </Link>
                    </div>

                    <div className='flex items-center'>
                            <div className='border border-[#606060] focus-within:border-blue-500 rounded-l-full pl-5'>
                                <input
                                    type='text'
                                    className=' bg-transparent h-8 w-32 md:w-72 focus-within:outline-none focus-within:border-[#ffffff]'
                                    placeholder='Search'
                                    value={searchQuery}
                                    onKeyUp={searchHandler}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div onClick={() => searchHandler("searchButton")} className='bg-[#404040] px-4 py-2 cursor-pointer rounded-r-full'>
                                <IoIosSearch className='text-xl' />
                            </div>
                    </div>


                    <div className='hidden md:flex items-center gap-5 text-xl'>
                        <RiVideoAddLine />
                        <FiBell />
                        <img src='https://th.bing.com/th/id/OIP.Ntwccxljc9Gmka_Y6InYMAHaHa?w=204&h=204&c=7&r=0&o=5&dpr=2&pid=1.7' alt='Profile' className='text-xs h-9 w-9 rounded-full border-2 border-[#707070]' />
                    </div>

                </div>
            </div>
        </>
    )
}