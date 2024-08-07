'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CartIcon from "../../images/icons/blackCartIcon.svg";
import Image from 'next/image';
import useCartStore from '../../store/cartStore';
// import { Toaster, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import toast, { Toaster } from 'react-hot-toast';

interface Item {
    id: string;
    name: string;
    current_price: number;
    is_available: boolean;
    photos: string;
    quantity: number;
    categories: { name: string }[];
}

interface Product {
    id: string;
    name: string;
    current_price: number;
    photos: string;
    quantity: number;
    categories: { name: string }[];
}

const ForMen: React.FC = () => {
    const { addToCart, products, fetchProducts, loading } = useCartStore();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const addItemToCart = (item: Item) => {
        const product: Product = {
            id: item.id,
            name: item.name,
            current_price: item.current_price,
            photos: item.photos,
            quantity: 1,
            categories: item.categories
        };
        addToCart(product);
        toast.success(`${item.name} added to cart!`);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const forMenProducts = products.filter(item =>
        item.categories.some(category => category.name === 'dailypick')
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = forMenProducts.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(forMenProducts.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    if (loading) {
        return (
            <section className="w-[90%] flex flex-col mx-auto justify-center items-center my-20">
                <div className="w-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-5 gap-y-5">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="flex flex-col w-[100%] h-[352px] rounded-2xl overflow-hidden bg-gray-300 animate-pulse"></div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className='w-[90%] flex flex-col mx-auto justify-start items-start my-20 overflow-hidden'>
            <div className='flex flex-row justify-between items-center w-full my-8'>
                <h1 className='font-semibold xl:text-5xl lg:text-4xl md:text-3xl sm:text-2xl font-OpenSans text-black'>For Men</h1>
                <Link href={'#'} className='font-semibold hidden xl:flex font-OpenSans px-3 py-1 items-center lg:flex border-2 rounded-xl border-black'>
                    See More
                </Link>
            </div>

            <div className='w-[100%] grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-x-5 gap-y-5'>
                {currentItems.map((item) => (
                    <div key={item.id} className='flex flex-col w-[100%] h-[352px] rounded-2xl overflow-hidden'>
                        <div
                            className='flex flex-row w-full h-[70%] bg-gray-400'
                            style={{
                                backgroundImage: `url(https://api.timbu.cloud/images/${item.photos?.[0]?.url})`,
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "cover",
                            }}
                        ></div>
                        <div className='w-full h-[30%] bg-black flex flex-row gap-12 items-center px-5 justify-between'>
                            <div className='flex flex-col text-white font-OpenSans w-[300px]'>
                                <h2 className='flex-nowrap font-semibold text-[12px]'>{item.name}</h2>
                                <p>${item.current_price?.[0] ? item.current_price?.[0].NGN : 0}</p>
                                <div className='mb-[2px] border-t-2 border-white w-[90%]'></div>
                                {/* <p className=''>{item.stock} unit left</p> */}
                            </div>
                            <button
                                onClick={() => addItemToCart({
                                    id: item.id,
                                    name: item.name,
                                    current_price: item.current_price?.[0] ? item.current_price?.[0].NGN : 0,
                                    photos: item.photos?.[0]?.url!,
                                    quantity: 1,
                                    is_available: item.is_available,
                                    categories: item.categories  // Added categories field
                                })}
                                className='w-full h-fit justify-center items-center bg-white px-2 py-2 rounded-2xl flex flex-row  text-[10px] font-OpenSans text-black'
                            >
                                Add to cart <Image src={CartIcon} alt='' />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center items-center mt-5">
                <button onClick={handlePreviousPage} disabled={currentPage === 1} className="px-3 py-1 mx-1 bg-gray-300 text-black rounded-md">
                    Previous
                </button>
                <span className="mx-2">{currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className="px-3 py-1 mx-1 bg-gray-300 text-black rounded-md">
                    Next
                </button>
            </div>

            <Link href={'#'} className='font-semibold mt-5 xl:hidden flex font-OpenSans px-3 py-1 items-center lg:hidden border-2 rounded-xl border-black'>
                See More
            </Link>
            <Toaster />
        </section>
    );
};

export default ForMen;
