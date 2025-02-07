'use client'

import Image from "next/image";
import Link from "next/link"
import { useState } from "react";
import { FaBars } from "react-icons/fa";



const menu = [
    { id: 1, description: "Home", url: "/" },
    { id: 2, description: "In Action", url: "/InAction" },
    { id: 3, description: "Reach Dev Christian", url: "https://www.linkedin.com/in/christianbarbosa2711/" },
]


function Navbar() {
    const [navbarOpen, setNavbarOpen] = useState(false);
    return (
        <div>
            <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-gradient-to-r from-[#48CAE4] to-[#023E8A]">
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <Link
                            className="text-md font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap text-white"
                            href="/"
                        >
                            <Image
                                src="/WeatherMapAppLogo.png"
                                alt="Weather Map App Logo"
                                width={80}
                                height={50}
                                objectFit="cover"
                            />

                        </Link>
                        <button
                            className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                            type="button"
                            onClick={() => setNavbarOpen(!navbarOpen)}
                        >
                            <i> <FaBars /></i>
                        </button>
                    </div>
                    <div
                        className={
                            "lg:flex flex-grow items-center" +
                            (navbarOpen ? " flex" : " hidden")
                        }
                    >
                        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                            {menu.map(obj =>
                                <li key={obj.id} className="group/item hover:bg-[#baedeeff] rounded-md">
                                    <Link href={obj.url}
                                        className="text-md px-3 py-2 flex items-center text-base uppercase font-bold leading-snug text-white hover:opacity-75 hover:text-black" >
                                        {obj.description}
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar