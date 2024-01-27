import React, { useContext } from 'react'

import { categories } from '../utils/constants'
import LeftNavIcon from './LeftNavIcon'
import { Context } from '../context/ContextApi'
import { useNavigate } from 'react-router-dom'

function LeftNav() {

    const { selectedCategory, setSelectedCategory } = useContext(Context)
    const navigate = useNavigate();

    const { mobileMenu } = useContext(Context);

    const clickIconHandler = (name, type) => {
        switch (type) {
            case "home":
                setSelectedCategory(name);
                break;
            case "category":
                setSelectedCategory(name);
                break;

            case "menu":
                return false;

            default:
                break;
        }
    }

    return (
        <div className={`bg-[#202020] md:w-[240px] h-full pt-3 overflow-x-hidden ${mobileMenu ? "w-0" : "absolute z-50 w-[240px]"}`}>
            {
                categories.map((item) => {
                    return (
                        <React.Fragment key={item?.name}>
                            <LeftNavIcon
                                name={item?.type === "home" ? "Home" : item?.name}
                                type={item?.type}
                                icon={item?.icon}
                                action={() => {
                                    clickIconHandler(item?.name, item?.type);
                                    navigate("/")
                                }}
                                className={`${selectedCategory === item?.name ? "bg-white/[0.15]" : ""}`}
                            />
                            {
                                item?.divider && <hr className='mx-3 my-5 bg-white/[0.15]' />
                            }
                        </React.Fragment>
                    )
                })
            }
            <hr className='bg-white/[0.15] mx-3' />
            <h2 className='text-xs text-white/[0.20] mx-4 mt-2'>Made by: Jarvis</h2>
        </div>
    )
}

export default LeftNav