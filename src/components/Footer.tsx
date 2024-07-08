import React from "react";
import instaGram from "../../images/icons/skill-icons_instagram.svg";
import faceBook from "../../images/icons/logos_facebook.svg";
import X from "../../images/icons/ant-design_x-outlined.svg";
import Image from "next/image";

const Footer = () => {
    return (
        <div className="w-[90%] flex gap-16 xl:flex-row lg:flex-row md:flex-row flex-col-reverse justify-between items-center mx-auto bg-black rounded-xl px-8 py-8 my-12 ">
            <div className=" flex md:flex-col flex-col-reverse items-start gap-4 justify-start">
                <p className=" text-white text-[20px] font-OpenSans font-medium">
                    Copyright &copy; SteeZers 2024
                </p>
                <div className=" flex flex-row gap-3 items-start justify-start">
                    <div className="flex flex-row justify-start items-start p-2 rounded-full bg-white">
                        <Image src={instaGram} alt="instagram" />
                    </div>
                    <div className="flex flex-row justify-start items-start p-2 rounded-full bg-white">
                        <Image src={faceBook} alt="faceBook" />
                    </div>
                    <div className="flex flex-row justify-start items-start p-2 rounded-full bg-white">
                        <Image src={X} alt="X" />
                    </div>
                </div>
            </div>

            <form action="" className="flex flex-col gap-2">
                <label htmlFor="" className=" text-white font-OpenSans text-[20px]">
                    Subscribe to our Newsletter
                </label>
                <input
                    type="email"
                    placeholder="Enter your email here"
                    className=" w-[250px] bg-white text-gray-600 px-3 py-2 rounded-md "
                />
                <button
                    type="submit"
                    className=" bg-black text-white border-white border rounded-lg py-2 px-3 w-fit h-fit"
                >
                    {" "}
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Footer;
