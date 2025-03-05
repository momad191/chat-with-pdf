"use client"
import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function PromptInput() {
  const [prompt, setPrompt] = useState("");
  const maxChars = 300;

  return (  
    <div className="w-full p-4">
      <div className="relative w-full">
        <textarea
          className="w-full  h-[450px] p-4 bg-gray-800 text-white text-xl border border-gray-800 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
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
        className={`mt-4 w-full flex items-center justify-center gap-2 border border-white rounded-xl font-semibold px-4 py-2 text-black rounded-lg transition ${
          prompt.trim()
            ? "bg-[#1abac8] hover:bg-gray-500"
            : "bg-gray-400  cursor-not-allowed"
        }`}
        disabled={!prompt.trim()}
      >
        SUBMIT ➤
      
      </button>
    </div>
  );
}
