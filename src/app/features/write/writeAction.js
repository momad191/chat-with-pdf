 "use server";
 require("dotenv").config();
  import { ChatOpenAI } from "@langchain/openai";
  import { ChatPromptTemplate } from "@langchain/core/prompts";
 


import { BufferMemory } from "langchain/memory";
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";
 


  import { auth } from "@/auth";
    
  
 export async function WriteEmail(text1,language,text_type) {
   const session = await auth();
  
   const model = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0.5,
  });
 
 


 
    ///////////////////////////////////////////DadaBase ridis for saving chats ///////////////////////////////////////
    const upstashMessageHistory = new UpstashRedisChatMessageHistory({
      sessionId: "Translat-1",
      // sessionTTL: 300, // 5 minutes, omit this parameter to make sessions never expire
      config: {
        url: "https://suited-finch-58820.upstash.io", // Override with your own instance's URL
        token: "AeXEAAIjcDE5OGI2MDc1YTljMDg0MDFkYTZiMTk2MjkyYmRmNzBmM3AxMA", // Override with your own instance's token
      },
    });
    const memory = new BufferMemory({
      memoryKey: "history",
      chatHistory: upstashMessageHistory,
    });
  
    // console.log("Memory:", await memory.loadMemoryVariables({}));
  
    // const qaPrompt = ChatPromptTemplate.fromMessages([
    //   ["system", contextualizeQSystemPrompt],
    //   new MessagesPlaceholder("chatHistory"),
    //   ["human", "{input}"],
    // ]);
  

  

    const systemTemplate = "Translate the following from Arabic into {language} for {text_type}";

  const promptTemplate = ChatPromptTemplate.fromMessages([
    ["system", systemTemplate],
    ["human", "{input}"],
  ]);


  let inputs2 = {
    language: language,
    input: text1,
    text_type:text_type
  };


  const promptValue = await promptTemplate.invoke(inputs2);

  promptValue.toChatMessages();


    const response = await model.invoke(promptValue);
    console.log(`${response.content}`);
  
    await memory.saveContext({text1}, {
      output: response.content,
    });
  
    return response.content;
  }
  