"use client"

import Link from 'next/link';
import React from 'react';
import CartIcon from "../../images/icons/blackCartIcon.svg";
import Image from 'next/image';
import itemsData from "../../data/data.json";
import useCartStore from '../../store/cartStore';

interface Item {
    id: number;
    title: string;
    price: number;
    stock: number;
    imageSrc: string;
}

interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

const Men: React.FC = () => {
    const { addToCart, increaseQuantity, decreaseQuantity } = useCartStore();

    const addItemToCart = (item: Item) => {
        const product: Product = {
            id: item.id,
            name: item.title,
            price: item.price,
            image: item.imageSrc,
            quantity: 1,
        };
        addToCart(product);
    };

    return (
        <section className='w-[90%] flex flex-col mx-auto justify-center items-center my-20 overflow-hidden'>
            <div className='flex flex-row justify-between items-center w-full my-8'>
                <h1 className='font-semibold text-5xl font-OpenSans text-black'>Daily Pick</h1>
                <Link href={'#'} className='font-semibold font-OpenSans px-3 py-1 items-center flex border-2 rounded-xl border-black'>
                    See More
                </Link>
            </div>

            <div className='w-[100%] grid grid-cols-4 gap-x-5 gap-y-5'>
                {itemsData.map((item) => (
                    <div key={item.id} className='flex flex-col w-[100%] h-[352px] rounded-2xl overflow-hidden'>
                        <div
                            className='flex flex-row w-full h-[70%] bg-gray-400'
                            style={{
                                backgroundImage: `url(${item.imageSrc})`,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                            }}
                        ></div>
                        <div className='w-full h-[30%] bg-black flex flex-row gap-6 items-center px-3 justify-center'>
                            <div className='flex flex-col text-white font-OpenSans'>
                                <h2 className='flex-nowrap font-semibold text-[12px]'>{item.title}</h2>
                                <p>${item.price}</p>
                                <div className='mb-[2px] border-t-2 border-white w-[90%]'></div>
                                <p className=''>{item.stock} unit left</p>
                            </div>
                            <button
                                onClick={() => addItemToCart(item)}
                                className='w-fit h-fit bg-white px-2 py-2 rounded-2xl flex flex-row gap-1 text-[12px] font-OpenSans text-black'
                            >
                                Add to cart <Image src={CartIcon} alt='' />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Men;