"use client"
import React from 'react'
import Link from "next/link";
import { FaFileUpload } from "react-icons/fa";
import { BsChatFill } from "react-icons/bs";
import { BsChatDotsFill } from "react-icons/bs";
import {useTranslations} from 'next-intl';
  
const Home = ({session}) => {

    const t = useTranslations('Home');

  return (
    <div className="min-h-screen flex flex-col ">
    {/* Main Section */}
    <main className="flex-grow bg-gradient-to-b from-blue-100 to-blue-300 flex items-center justify-center text-center">
      <div className="container mx-auto px-4">
        {/* Welcome Text */}
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 transform transition-all duration-700 ease-in-out animate-bounce">
            
         
        <p className='rtl:ml-0'> {t('Chat with your PDF files')}   </p>
      
        </h1>
        <p className="text-lg text-gray-600 mb-8">
        {t('Let AI summarize, find information, translate, transcribe, and get citations from your files in seconds')} 
        </p>

     

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
            <h3 className="text-2xl font-semibold mb-2 text-blue-500">
            <FaFileUpload /> 
            {t('Upload your Files')}
         
            </h3>
            <p className="text-black font-bold">
            {t('Easily add your files and start chat them')}
              
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
            <h3 className="text-2xl font-semibold mb-2 text-blue-500">
              <BsChatFill />
              {t('Ask Questions')}
              
            </h3>
            <p className="text-black font-bold">
            {t('Ask AI any question about your document')}
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
            <h3 className="text-2xl font-semibold mb-2 text-blue-500">
              <BsChatDotsFill />
            
            {t('Get Answers')}
            </h3>
            <p className="text-black font-bold">
            {t('Get an answer from the document')}
            </p>
          </div>
        </div>
        {session ?(
           <Link href={`/dashboard`}>
           <button className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg hover:bg-gray-800 transition-all">
           {t('Start Now')}
             
           </button>
         </Link>
      ):(
       <Link href={`/register`}>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg hover:bg-gray-800 transition-all">
          {t('Start Now')}
            
          </button>
        </Link>

  )}
     
      </div>
    </main>
  </div>
  )
}

export default Home