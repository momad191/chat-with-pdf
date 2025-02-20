"use client";
import { useState } from "react";
import { FaBars, FaTimes, FaUserCircle  } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

import Cookies from 'js-cookie'
import {useTranslations} from 'next-intl';
import { useRouter } from "next/navigation";


const Navbar = ({session}) => {

    const router = useRouter();
    const t = useTranslations('NavBar');

    const setEnglish = async (L) => {
        await Cookies.set('lan', L);
        router.push("/");
        // alert( document.cookie.match(new RegExp("ar|en")));
        };
        const setArabic = async (L) => {
          await Cookies.set('lan', L);
          router.push("/");
          // alert( document.cookie.match(new RegExp("ar|en")));
          };

     
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleNavbar = () => setIsOpen(!isOpen);
    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const email = session?.user?.email;

    return (
        <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50 ">
            <div className="container mx-auto px-4 flex justify-between items-center h-16">
                {/* Logo */}
                <h1 className="text-2xl font-bold">Chat with PDFs</h1>

                {/* Toggle Button */}
                <button
                    onClick={toggleNavbar}
                    className="md:hidden p-2 rounded text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-500 transition-all"
                >
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>

                {/* Navbar Links */}
                <nav
                    className={`fixed inset-0 bg-gray-800 md:static md:bg-transparent md:flex md:items-center md:space-x-6 md:w-auto md:h-auto transition-transform duration-300 ${
                        isOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0`}
                >
                                    {/* Toggle Button */}
                <button
                    onClick={toggleNavbar}
                    className="md:hidden p-2 rounded text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-500 transition-all"
                >
                    {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
                    <ul className="flex flex-col md:flex-row md:space-x-6 text-lg">
                        <li>
                            <Link
                                href="/"
                                className="block py-2 px-4 rounded hover:bg-gray-700 md:hover:bg-transparent transition-all"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/features"
                                className="block py-2 px-4 rounded hover:bg-gray-700 md:hover:bg-transparent transition-all"
                            >
                                Features
                            </Link>
                        </li>
                    
                        <li>
                            <Link
                                href="/pricing"
                                className="block py-2 px-4 rounded hover:bg-gray-700 md:hover:bg-transparent transition-all"
                            >
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className="block py-2 px-4 rounded hover:bg-gray-700 md:hover:bg-transparent transition-all"
                            >
                                Contact
                            </Link>
                        </li>

                        <a  onClick={()=>{setEnglish('en')}} href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors"> En </a>
                        <a onClick={()=>{setArabic('ar')}} href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-200 transition-colors"> Ar </a>


                    </ul>
                </nav>

                {/* Right Buttons */}
                {session ?(
                     <div className="hidden md:flex space-x-4">
                   
                         <Link href="/dashboard" >
                         <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition-all">
                            {session?.user?.image?(
                                 <Image
                                 src={session?.user?.image}
                                 alt={session?.user?.name}
                                 width={32}
                                 height={32}
                                 className="rounded-full"
                                />

                            ):(
                                <FaUserCircle />
                            )}
                           
                              Dashboard
                         </button>
                          </Link>
                     </div>
                ):(
                    <div className="hidden md:flex space-x-4">
                    <Link href="/login" >
                        <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 focus:ring-4 focus:ring-gray-500 transition-all">
                            Login
                        </button>
                        </Link>
                        <Link href="/register" >
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition-all">
                            Try for Free
                        </button>
                         </Link>
                    </div>

                )}
               


            </div>

            {/* Dropdown for smaller screens */}
            {isOpen && (
                <div className="flex flex-col md:hidden space-y-2 px-4 pb-4">
                    <Link href="/login" >  
                    <button className="w-full px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 transition-all">
                        Login
                    </button>
                    </Link>
                    <Link href="/register" >  
                    <button className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all">
                        Try for Free
                    </button>
                    </Link>
                </div>
            )}
        </header>
    );
};

export default Navbar;
