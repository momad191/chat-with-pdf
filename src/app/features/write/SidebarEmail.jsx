"use client";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { MdEmail } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
import { FaArrowDownWideShort } from "react-icons/fa6";
import { FaArrowUpShortWide } from "react-icons/fa6";
import { FaArrowsDownToLine } from "react-icons/fa6";
import PromptInput from "./PromptInput";





const SidebarEmail = ({ isOpen, session }) => {
  const t = useTranslations("SidebarEmail");
  const languages = [
    { name: t('English'), code: "English", flag: "https://flagcdn.com/w40/gb.png" },
    { name: t('French'), code: "French", flag: "https://flagcdn.com/w40/fr.png" },
    { name: t('Spanish'), code: "Spanish", flag: "https://flagcdn.com/w40/es.png" },
    { name: t('German'), code: "German", flag: "https://flagcdn.com/w40/de.png" },
    { name: t('Arabic'), code: "Arabic", flag: "https://flagcdn.com/w40/sa.png" },
  ];
 
  const [selected, setSelected] = useState(languages[0]);
  const [open, setOpen] = useState(false);
 

  const [language, setLanguage] = useState("");
  const [text_type, setText_type] = useState("");
  const [text_length, setText_length] = useState("");
  const [tone, setTone] = useState("");
  const [use_emoji, setUse_emoji] = useState("");



  return (
    <>
      <div
        className={` relative  md:w-full h-screen bg-gray-800 text-white shadow-lg transform transition-transform duration-300 w-84`}
      >
        <PromptInput
          language={language}
          text_type={text_type}
          text_length={text_length}
          tone={tone}
          use_emoji={use_emoji}
        />
      </div>

      {/* SidebarEmail */}
      <div
        className={`relative xl:w-[380px]   md:w-[400px] w-full h-screen   bg-gray-800 text-white shadow-lg transform transition-transform duration-300 
          `}
      >
        <nav className="p-4 space-y-2 items-center   ">
          <div className="justify-center items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all">
            <div className="relative w-56">
              <h1>{t('Output Language:')} {selected.name}</h1>{" "}
              {/* Displays selected language code */}
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
                  <span className="text-black">{selected.name}</span>
                </div>
                <FaChevronDown className="w-5 h-5 text-gray-600" />
              </button>
              {open && (
                <ul className="absolute left-0 right-0 mt-2 bg-white border z-50 rounded-lg shadow-lg overflow-hidden">
                  {languages.map((lang) => (
                    <li
                      key={lang.code}
                      onClick={() => {
                        setSelected(lang); // Updates selected language object
                        setLanguage(lang.code); // Updates state with language code
                        setOpen(false); // Closes dropdown
                      }}
                      className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      <Image
                        src={lang.flag}
                        alt={lang.code}
                        width={24}
                        height={16}
                        className="rounded"
                      />
                      <span className="text-black">{lang.code}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex-col max-h-[340px] w-full  overflow-y-scroll">
            <div className=" justify-center items-center p-2 text-gray-200 rounded-lg transition-all">
              <div className="relative  ">
                <h1>  {t('Text Type:')}  </h1>
                <div className="flex items-center justify-center gap-4 mt-1">
                  <button
                    onClick={() => setText_type("email")}
                    className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl px-4 py-2 border border-white"
                  >
                    {" "}
                    <MdEmail /> {t('Email')}  {" "}
                  </button>
                  <button
                    onClick={() => setText_type("masenger")}
                    className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl px-4 py-2 border border-white"
                  >
                    {" "}
                    <FaMessage /> {t('Messenger')} {" "}
                  </button>
                </div>
              </div>
            </div>

            <div className=" justify-center items-center p-2 text-gray-300 rounded-lg transition-all">
              <div className="relative  ">
                <h1> {t('Text Length:')} </h1>
                <div className="flex items-center justify-center gap-1 mt-1 ">
                  <button
                    onClick={() => setText_length("short")}
                    className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    <FaArrowUpShortWide /> {t('Short')}  {" "}
                  </button>
                  <button
                    onClick={() => setText_length("medium")}
                    className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    <FaArrowsDownToLine /> {t('Medium')}  {" "}
                  </button>
                  <button
                    onClick={() => setText_length("long")}
                    className="flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    <FaArrowDownWideShort /> {t('Long')}    {" "}
                  </button>
                </div>
              </div>
            </div>

            <div className=" justify-center items-center p-2 text-gray-300 rounded-lg transition-all">
              <div className="relative ">
                <h1> {t('Writing Tone:')} </h1>
                <div className="flex items-center justify-start gap-1 mt-2 ">
                  <button
                    onClick={() => setTone("formal")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    {t('Formal')} {" "}
                  </button>
                  <button
                    onClick={() => setTone("friendly")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                      {t('Friendly')} {" "}
                  </button>
                  <button
                    onClick={() => setTone("brutal")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    {t('Brutal')}  {" "}
                  </button>
                </div>

                <div className="flex items-center justify-start gap-1 mt-2 ">
                  <button
                    onClick={() => setTone("persuasive")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                     {t('Persuasive')} {" "}
                  </button>
                  <button
                    onClick={() => setTone("expert")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                     {t('Expert')} {" "}
                  </button>
                  <button
                    onClick={() => setTone("joyful")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    {t('Joyful')}  {" "}
                  </button>
                </div>

                <div className="flex items-center justify-start gap-1 mt-2 ">
                  <button
                    onClick={() => setTone("inspirational")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    {t('Inspirational')} {" "}
                  </button>
                  <button
                    onClick={() => setTone("informative")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    {t('Informative')}  {" "}
                  </button>
                </div>

                <div className="flex items-center justify-start gap-1 mt-2 ">
                  <button
                    onClick={() => setTone("thoughtful")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    {t('Thoughtful')} {" "}
                  </button>
                  <button
                    onClick={() => setTone("cautionary")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    {t('Cautionary')} {" "}
                  </button>
                </div>

                <div className="flex items-center justify-start gap-1 mt-2 ">
                  <button
                    onClick={() => setTone("grieved")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    {t('Grieved')}  {" "}
                  </button>
                  <button
                    onClick={() => setTone("exciting")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    {t('Exciting')}  {" "}
                  </button>
                </div>

                <div className="flex items-center justify-start gap-1 mt-2 ">
                  <button
                    onClick={() => setTone("loving")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    {t('Loving')}  {" "}
                  </button>
                  <button
                    onClick={() => setTone("confident")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    {t('Confident')}   {" "}
                  </button>
                  <button
                    onClick={() => setTone("surprised")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    {t('Surprised')} {" "}
                  </button>
                </div>
              </div>
            </div>

            <div className=" justify-center items-center p-2 text-gray-300 rounded-lg transition-all">
              <div className="relative w-56 ">
                <h1> {t('Use Emoji')}   </h1>
                <div className="flex items-center justify-start gap-1 mt-2 ">
                  <button
                    onClick={() => setUse_emoji("with_emoji")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    {t('With emoji')}  {" "}
                  </button>
                  <button
                    onClick={() => setUse_emoji("no_emoji")}
                    className="bg-gray-200 hover:bg-gray-800 hover:text-white text-black rounded-2xl  px-2 py-2 border border-white"
                  >
                    {" "}
                    {t('No emoji')}  {" "}
                  </button>
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
