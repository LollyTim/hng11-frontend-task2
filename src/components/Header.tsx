import React from 'react'
import SearchForm from "./SearchForm"
import Image from 'next/image'
import CartIcon from "../../images/icons/cartIcon.svg"
import LogoutIcon from "../../images/icons/logoutIcon.svg"
import homeDisplayImage from "../../images/homeDisplayImage.jpeg"

const Header = () => {
    return (
        <header className='w-[88%] bg-gray-600 flex-col justify-center items-center mx-auto rounded-3xl my-10 py-10' style={{
            backgroundImage: `url(${homeDisplayImage.src})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
        }}>
            <nav className=' w-[90%] flex flex-row justify-between items-center mx-auto py-3'>
                <a href="/" className=' text-black font-bold font-OpenSans text-4xl'>
                    SteeZers
                </a>

                <SearchForm />

                <div className=' flex space-x-4 flex-row items-center justify-center'>
                    <a className=' flex-row flex items-center gap-1'>
                        <p className=' text-white text-base'>Cart</p>
                        <Image src={CartIcon} alt='' width={20} height={20} className=' text-black' />
                    </a>
                    <button className=' flex-row flex items-center gap-1'>
                        <p className=' text-white text-base'>Logout</p>
                        <Image src={LogoutIcon} alt='' width={20} height={20} className=' text-black' />
                    </button>
                </div>

            </nav>

            <div className=' w-full flex flex-col justify-center items-center leading-[56px] my-12 mx-auto'>
                <h1 className=' font-semibold text-[56px] font-OpenSans text-white'>Your Number one Fashion Store</h1>
                <p className=' text-[36px] font-OpenSans font-normal text-white'>A taste of class</p>


            </div>

        </header>
    )
}

export default Header