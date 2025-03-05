"use client"
import { useState } from "react";
import { MdLanguage } from "react-icons/md";
import { FaChevronDown } from "react-icons/fa";

 import Link from "next/link";
import Image from "next/image";
 import { useTranslations } from "next-intl";
 
 const languages = [
    { code: "en", name: "English", flag: "https://flagcdn.com/w40/gb.png" },
    { code: "fr", name: "Français", flag: "https://flagcdn.com/w40/fr.png" },
    { code: "es", name: "Español", flag: "https://flagcdn.com/w40/es.png" },
    { code: "de", name: "Deutsch", flag: "https://flagcdn.com/w40/de.png" },
    { code: "ar", name: "العربية", flag: "https://flagcdn.com/w40/sa.png" },
  ];


const SidebarEmail = ({ isOpen, session }) => {
    const [selected, setSelected] = useState(languages[0]);
    const [open, setOpen] = useState(false);
  const t = useTranslations("Sidebar");
  

  return (
    <>
      {/* Sidebar */} 
      <div
        className={`relative xl:w-[380px] md:w-[400px] w-full h-screen   bg-gray-800 text-white shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } `}
      >
        

 <nav className="p-4 space-y-2 items-center   ">
  <div className=" justify-center items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all">
           
    <div className="relative w-56">
        <h1>Output Language:</h1>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full px-4 py-2 text-lg bg-white border rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <div className="flex items-center gap-2">
          <Image
            src={selected.flag}
            alt={selected.name}
            width={24}
            height={16}
            className="rounded"
          />
          <span  className="text-black">{selected.name}</span>
        </div>
        <FaChevronDown className="w-5 h-5 text-gray-600" />
      </button>
      {open && (
        <ul className="absolute left-0 right-0 mt-2 bg-white border z-50 rounded-lg shadow-lg overflow-hidden">
          {languages.map((lang) => (
            <li
              key={lang.code}
              onClick={() => {
                setSelected(lang);
                setOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              <Image
                src={lang.flag}
                alt={lang.name}
                width={24}
                height={16}
                className="rounded"
              />
              <span className="text-black">{lang.name}</span>
            </li>
          ))}
        </ul>
      )}
    </div> 
  </div>
         
<div className="flex-col h-[300px] w-[350px]  overflow-y-scroll"> 
          
    <div className=" justify-center items-center p-2 text-gray-200 rounded-lg transition-all">       
    <div className="relative w-56 ">
         <h1 > Text Type: </h1>
         <div className="flex items-center justify-between gap-4 mt-1">
            <button className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl px-4 py-2 border border-white"> Email </button>
            <button className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl px-4 py-2 border border-white"> Masenger </button>
         </div>
    </div>
    </div>



    <div className=" justify-center items-center p-2 text-gray-300 rounded-lg transition-all">       
    <div className="relative w-56 ">
         <h1 >Text Length:</h1>
         <div className="flex items-center justify-between gap-1 mt-1 ">
            <button className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"> Short </button>
            <button className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"> Medium </button>
            <button className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"> Long </button>
         </div>
    </div>
    </div>


    <div className=" justify-center items-center p-2 text-gray-300 rounded-lg transition-all">       
    <div className="relative w-56 ">
         <h1 >Writing Tone:</h1>
         <div className="flex items-center justify-start gap-1 mt-2 ">
            <button className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"> Formal </button>
            <button className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"> Friendly </button>
            <button className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"> Brutal </button>
         </div>


         <div className="flex items-center justify-start gap-1 mt-2 ">
            <button className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"> Persuasive </button>
            <button className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"> Expert </button>
            <button className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"> Joyful </button>
         </div>


         <div className="flex items-center justify-start gap-1 mt-2 ">
            <button className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"> Inspirational </button>
            <button className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"> Informative </button>
         </div>

         <div className="flex items-center justify-start gap-1 mt-2 ">
             <button className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"> Thoughtful </button>
             <button className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"> Cautionary </button>

         </div>



         <div className="flex items-center justify-start gap-1 mt-2 ">
            <button className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"> Grieved </button>
            <button className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"> Exciting </button>
         </div>


         <div className="flex items-center justify-start gap-1 mt-2 ">
            <button className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"> Loving </button>
            <button className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"> Confident </button>
            <button className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"> Surprised </button>
         </div>

    </div>
    </div>

         
    <div className=" justify-center items-center p-2 text-gray-300 rounded-lg transition-all">       
    <div className="relative w-56 ">
         <h1 >Use Emoji:</h1>
         <div className="flex items-center justify-start gap-1 mt-2 ">
            <button className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"> With emoji </button>
            <button className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"> No emoji </button>
    
         </div>
    </div>
    </div>

 
    </div>

    {/* <div className="flex-col h-[30px] "> 
    <button className="mt-20 w-full mt-8 bg-[#1abac8] hover:bg-gray-800 hover:text-white text-black font-semibold rounded-2xl  px-2 py-2 border border-white"> SUBMIT ➤ </button>

        </div> */}
      
        </nav>
      </div>
    </>
  );
};
 
export default SidebarEmail;
 