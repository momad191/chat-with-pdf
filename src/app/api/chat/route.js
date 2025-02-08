import { NextResponse } from "next/server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { ChatOpenAI } from "@langchain/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";

import { MessagesPlaceholder } from "@langchain/core/prompts";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
 
import { auth } from "@/auth";
import { getContext } from "@/lib/context"; 

import { BufferMemory } from "langchain/memory";
import { UpstashRedisChatMessageHistory } from "@langchain/community/stores/message/upstash_redis";
import { ConversationChain } from "langchain/chains";





// import { PineconeStore } from "@langchain/pinecone";
// import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";



export async function POST(req) {

 

  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const { text1, file1,file_id } = await req.json();
    if (!text1 || !file1 || !file_id) {
      return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }
    
    const filePath = `\public/uploads/${session.user.name}/${file1}`;
    const loader = new PDFLoader(filePath);
    const docs = await loader.load();

    const memory = new BufferMemory({
      chatHistory: new UpstashRedisChatMessageHistory({
        sessionId: file_id, // Or some other unique identifier for the conversation
        sessionTTL: 300, // 5 minutes, omit this parameter to make sessions never expire
        config: {
          url: "https://suited-finch-58820.upstash.io", // Override with your own instance's URL
          token: "AeXEAAIjcDE5OGI2MDc1YTljMDg0MDFkYTZiMTk2MjkyYmRmNzBmM3AxMA", // Override with your own instance's token
        },
      }),
    });

    const model = new ChatOpenAI({
      model: "gpt-3.5-turbo",
      apiKey: process.env.OPENAI_API_KEY,
      temperature: 0,
    });

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

  
    const splits = await textSplitter.splitDocuments(docs);
    const vectorstore = await MemoryVectorStore.fromDocuments(
      splits,
      new OpenAIEmbeddings({ model: "text-embedding-3-large" })
    );



    const retriever = vectorstore.asRetriever();

    // Create a HistoryAwareRetriever which will be responsible for
// generating a search query based on both the user input and
// the chat history
const retrieverPrompt = ChatPromptTemplate.fromMessages([
  new MessagesPlaceholder("chat_history"),
  ["user", "{input}"],
  [
    "user",
    "Given the above conversation, generate a search query to look up in order to get information relevant to the conversation",
  ],
]);



// This chain will return a list of documents from the vector store
const retrieverChain = await createHistoryAwareRetriever({
  llm: model,
  retriever,
  rephrasePrompt: retrieverPrompt,
  
});


// Fake chat history
const chat_history = [];




const contextualizeQSystemPrompt = `AI assistant is a brand new, powerful, human-like artificial intelligence.
The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
AI is a well-behaved and well-mannered individual.
AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.
AI has the sum of all knowledge in their brain, and is able to accurately answer nearly any question about any topic in conversation.
AI assistant is a big fan of Pinecone and Vercel.
START CONTEXT BLOCK
{context}
END OF CONTEXT BLOCK
AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.
If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question".
AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
AI assistant will not invent anything that is not drawn directly from the context.
`

// Define the prompt for the final chain
const prompt = ChatPromptTemplate.fromMessages([
  ["system", contextualizeQSystemPrompt],
   new MessagesPlaceholder("chat_history"),
  ["human", "{input}"],
]);



// Since we need to pass the docs from the retriever, we will use
// the createStuffDocumentsChain
const chain = await createStuffDocumentsChain({
  llm: model,
  prompt: prompt,
  
  
});

// const chain = new ConversationChain({ llm: model, memory });



// Create the conversation chain, which will combine the retrieverChain
// and combineStuffChain in order to get an answer
const conversationChain = await createRetrievalChain({
  combineDocsChain: chain,
  retriever: retrieverChain,
   
});




const response = await conversationChain.invoke({
// chat_history: memory,
  input: text1
});


// const response = await chain.invoke({ input: text1 });
 

 
    console.log(response)
    // chat_history.push(new HumanMessage(text1));
    // chat_history.push(new AIMessage(response.answer));
     return NextResponse.json({ answer: response.answer });


  } catch (error) {
    console.error("Error handling chat request:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
