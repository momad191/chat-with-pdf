"use client";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaUserCircle  } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

import Cookies from 'js-cookie'

import { useRouter } from "next/navigation";
import { GrLanguage } from "react-icons/gr";

import GetDefaultLanguage from "../lib/getDefaultLanguage" 

import {useTranslations} from 'next-intl';
 
 

const Navbar = ({session}) => {
    const t = useTranslations('NavBar');
   

    const [language, setLanguage] = useState('');

    useEffect(() => {
        const lang = GetDefaultLanguage();
        setLanguage(lang);
    }, []);


    const router = useRouter();
   


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
                <h1 className="text-2xl font-bold">{t('Chat with PDF files')}</h1>

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
                                {t('Home')}
                            </Link>
                        </li>
                       
                    
                        <li>
                            <Link
                                href="/pricing"
                                className="block py-2 px-4 rounded hover:bg-gray-700 md:hover:bg-transparent transition-all"
                            >
                                
                                {t('Pricing')}
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/contact"
                                className="block py-2 px-4 rounded hover:bg-gray-700 md:hover:bg-transparent transition-all"
                            >
                                
                                {t('Contact')}
                            </Link>
                        </li>

                      {/* Features with Dropdown */}
                       <li className="relative">
                            <button
                                onClick={toggleDropdown}
                                className="flex justify-center items-center gap-1 py-2 px-4 rounded hover:bg-gray-700 md:hover:bg-transparent transition-all"
                            >
                               <GrLanguage />  {language}
                            </button>
                            {dropdownOpen && (
                                <ul className="absolute left-0 mt-2 bg-gray-700 text-white rounded shadow-md w-48">
                                    <li>
                                    <a  onClick={()=>{setEnglish('en')}} href="/"   className="block px-4 py-2 hover:bg-gray-600 transition-colors"> English </a>

                                     </li>
                                    <li>
                                    <a onClick={()=>{setArabic('ar')}} href="/"   className="block px-4 py-2 hover:bg-gray-600 transition-colors"> عربي </a>
                                     </li>
                                </ul>
                            )}
                        </li>



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
                           
                               
                              {t('Dashboard')}
                         </button>
                          </Link>
                     </div>
                ):(
                    <div className="hidden md:flex space-x-4">
                    <Link href="/login" >
                        <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 focus:ring-4 focus:ring-gray-500 transition-all">
                            {t('Login')}
                        </button>
                        </Link>
                        <Link href="/register" >
                        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition-all">
                            
                            {t('Try for Free')}
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
