"use client"
import { useState } from "react";
import { motion } from "framer-motion"; 
import { FaUser } from "react-icons/fa";
import { WriteEmail } from "./writeAction";
import Image from "next/image";
import { GrUpdate } from "react-icons/gr";
import { useRouter } from "next/navigation";

 
export default function PromptInput() {
  const router = useRouter();
  const maxChars = 1000;
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  

  const sendMessage = async (msg,language,text_type) => {
    
    if (msg.trim()) {
      setMessages([{ sender: "user", text: msg }]); // Only keep the user's latest message
      setPrompt("");
      setLoading(true);
  
      try {
        const response = await WriteEmail(msg,language,text_type);
        setLoading(false);
  
        // Show typing effect
        let index = 0;
        let responseText = "";
        const streamInterval = setInterval(() => {
          if (index < response.length) {
            responseText += response[index];
            setMessages([{ sender: "bot", text: responseText }]); // Only keep the bot's response
            setComplete(true)
            index++;
          } else {
            clearInterval(streamInterval);
            router.push(`/features/write/all/${complete}`);
              
          }
        }, 10);
      } catch (error) {
        console.error("Error fetching response:", error);
        setLoading(false);
      }
    }
  };

      const handleSubmitButton = () => {
        sendMessage(prompt,"Spanish","Email");    
        
      };
    

      if (loading) {
        return (
          <div className="xl:flex md:flex bg-gray-800 text-white items-center justify-center h-screen w-full">
        
            <p className="text-lg font-semibold">Loading...</p>
          </div>
        );
      }
  return (  
  
  <div className="w-full p-4  ">
     
     
  {complete ? (
 <div className="relative w-full  items-center  text-gray-400"> 
  
  {messages.map((msg, index) => (
  <div
    key={index}
    className={`flex    ${
      msg.sender === "user" ? "justify-end" : "justify-start"
    }`}
  >
    {msg.sender === "bot" && (
      <Image
        src="/chatbot.png"
        width={50}
        height={50}
        alt="Bot Avatar"
        className="w-8 h-8 rounded-full mr-2"
      />
    )}
    <div
      className={`p-4 w-full ${
        msg.sender === "user"
          ? "w-full  bg-gray-800 text-white text-xl border border-gray-800 "
          : "w-full  bg-gray-800 text-white text-xl border border-gray-800 "
      }`}
    >
      {msg.text}
    </div>
    {msg.sender === "user" && <FaUser width={40} height={40} />}
  </div>
))}

<button
      onClick={handleSubmitButton}
        className={`mt-4 w-full flex items-center justify-center gap-2 border border-white rounded-xl font-semibold px-4 py-2 text-black rounded-lg transition bg-[#1abac8] hover:bg-gray-500 cursor-pointer`}
        disabled={!prompt.trim()}
      >
       <GrUpdate /> Re-write  
      
      </button>
      

</div>

        ):(
          <>
        <div className="relative w-full">  
        <textarea
          className="w-full h-[450px] p-4 bg-gray-800 text-white text-xl border border-gray-800 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder=""
          maxLength={maxChars}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        ></textarea>

        <motion.label
          initial={{ opacity: 0.5, y: 10 }}
          animate={{ opacity: prompt ? 0.7 : 1, y: prompt ? -10 : 0 }}
          className={`absolute top-4 left-4 text-gray-400 transform transition-all duration-700 ease-in-out animate-bounce 
            ${prompt==="" ? "" : "hidden"}
            `}
        >
            <h1>Example:</h1>
            <p>
            Hi team let's sharing take a coffe  together and start our meeting 
            </p>

                   
    
        </motion.label>

 
        <div className="absolute bottom-2 right-4 text-sm text-gray-500">
          {prompt.length}/{maxChars}
        </div>
      </div>
      <button
      onClick={handleSubmitButton}
        className={`mt-4 w-full flex items-center justify-center gap-2 border border-white rounded-xl font-semibold px-4 py-2 text-black rounded-lg transition ${
          prompt.trim()
            ? "bg-[#1abac8] hover:bg-gray-500"
            : "bg-gray-400  cursor-not-allowed"
        }`}
        disabled={!prompt.trim()}
      >
        SUBMIT ➤
      
      </button>

      </>
)}

    </div>
  );
}
