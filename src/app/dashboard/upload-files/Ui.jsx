"use client"
import UploadFormForPdf from "./Form-for-pdf" 
import UploadFormForTxt from "./Form-for-txt" 
import UploadFormForWord from "./Form-for-word" 
import { useState } from "react"
 
const UploadFileUi = () => {
  const [isPDF,setIsPDF]= useState(true)
  const [isTXT,setIsTXT]= useState(false)
  const [isWORD,setIsWORD]= useState(false)

  const changeToPDF = () =>{
    setIsPDF(true)
    setIsTXT(false)
    setIsWORD(false)
  }

  const changeToWORD = () =>{
    setIsPDF(false)
    setIsTXT(false)
    setIsWORD(true)

  }

  const changeToTXT = () =>{
    setIsPDF(false)
    setIsTXT(true)
    setIsWORD(false)

  }

  return (
    <div className=" flex flex-col w-full items-center justify-center bg-gradient-to-b ">
    <div className="flex gap-10 items-center justify-center"> 

      <button onClick={changeToPDF} 
      className={`bg-sky-300 text-black p-7 hover:bg-sky-500 hover:text-white rounded-b-[50%]
        ${isPDF && `bg-gray-900 text-white`}
        `}
        
      >
      PFD Files 
      </button> 
     
      <button onClick={changeToWORD}
             className={`bg-sky-300 text-black p-7 hover:bg-sky-500 hover:text-white rounded-b-[50%]
              ${isWORD && `bg-gray-900 text-white`}
              `}
            >
        WORD Files 
        </button>
     
      <button onClick={changeToTXT} 
            className={`bg-sky-300 text-black p-7 hover:bg-sky-500 hover:text-white rounded-b-[50%]
              ${isTXT && `bg-gray-900 text-white`}
              `}
            >
        TXT Files 
        </button>
      </div>
      <div className="md:flex  justfy-center  items-center">
        {isPDF&&(
           <UploadFormForPdf /> 
        )}
         {isTXT&&(
        <UploadFormForTxt />
        )}
         {isWORD&&(
           <UploadFormForWord />
        )}
   
    </div>
    </div>
  )
}

export default UploadFileUi