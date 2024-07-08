"use client"

import React from 'react'
import SearchForm from "./SearchForm"
import Image from 'next/image'
import CartIcon from "../../images/icons/cartIcon.svg"
import LogoutIcon from "../../images/icons/logoutIcon.svg"
import homeDisplayImage from "../../images/homeDisplayImage.jpeg"
import useCartStore from '../../store/cartStore'

const Header = () => {
    const { cart } = useCartStore()
    return (
        <header className='w-[88%] bg-gray-600 flex-col justify-center items-center mx-auto rounded-3xl my-10 py-10' style={{
            backgroundImage: `url(${homeDisplayImage.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        }}>
            <nav className=' w-[90%] flex flex-row justify-between items-center mx-auto py-3'>
                <a href="/" className=' text-black font-bold font-OpenSans xl:text-4xl text-2xl'>
                    SteeZers
                </a>

                <div className=' w-fit flex max-[1000px]:hidden'>
                    <SearchForm />
                </div>

                <div className=' flex space-x-4 flex-row items-center justify-center'>
                    <a href='/cart' className=' cursor-pointer flex-row flex items-center gap-1'>
                        <p className=' text-white text-base'>Cart</p>
                        <Image src={CartIcon} alt='' width={20} height={20} className=' text-black' />
                        <p className="text-white text-[12px] bg-red-800 items-center -mt-6 -ml-3 rounded-full px-1 py-[1px] flex justify-center">{cart.length}</p>
                    </a>
                    <button className=' flex-row flex items-center gap-1'>
                        <p className=' text-white text-base'>Logout</p>
                        <Image src={LogoutIcon} alt='' width={20} height={20} className=' text-black' />
                    </button>
                </div>

            </nav>

            <div className=' w-full flex flex-col justify-center lg:gap-8 sm:gap-0 items-center leading-[56px] my-12 mx-auto'>
                <h1 className=' font-semibold xl:text-[56px] text-[20px] font-OpenSans text-white sm:leading-3'>Your Number one Fashion Store</h1>
                <p className=' xl:text-[36px] font-OpenSans font-normal text-white text-[16px]'>A taste of class</p>
                <div className=' w-full justify-center items-center hidden max-[1000px]:flex'>
                    <SearchForm />
                </div>



            </div>

        </header>
    )
}

export default Header