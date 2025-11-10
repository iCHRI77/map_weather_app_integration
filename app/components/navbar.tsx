'use client'

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const menu = [
    { id: 1, description: "Home", url: "/" },
    { id: 2, description: "In Action", url: "/InAction" },
    { id: 3, description: "Reach Devs", url: "/Devs" },
];

interface NavbarProps {
  className?: string;
}

function Navbar({ className = '' }: NavbarProps) {
    const [navbarOpen, setNavbarOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    return (
        <nav className={`w-full ${className} ${scrolled ? '' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/WeatherMapAppLogo.png"
                                alt="Weather Map App Logo"
                                width={60}
                                height={60}
                                className="h-10 w-auto sm:h-12"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-4">
                            {menu.map((item) => (
                                <Link
                                    key={item.id}
                                    href={item.url}
                                    className="text-gray-700 hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                                >
                                    {item.description}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setNavbarOpen(!navbarOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-white hover:bg-blue-600 focus:outline-none transition-colors duration-200"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Open main menu</span>
                            {navbarOpen ? (
                                <FaTimes className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <FaBars className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden ${navbarOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-lg">
                    {menu.map((item) => (
                        <Link
                            key={item.id}
                            href={item.url}
                            className="text-gray-700 hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
                            onClick={() => setNavbarOpen(false)}
                        >
                            {item.description}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}

export default Navbar