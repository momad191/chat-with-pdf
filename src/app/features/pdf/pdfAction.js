"use server";
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
import { auth } from "@/auth";
  
export async function Chat(text1,file1) {
const session = await auth();
const mycv = `\public/uploads/${session?.user?.name}/${file1}`;
const loader = new PDFLoader(mycv);
const docs = await loader.load();

  const llm = new ChatOpenAI({
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
    new OpenAIEmbeddings({
      model: "text-embedding-3-large"
    })
  );
  const retriever = vectorstore.asRetriever();


  ///////////////////////////////////////////////////////////////////////////////////////////

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

    const qaPrompt = ChatPromptTemplate.fromMessages([
      ["system", contextualizeQSystemPrompt],
      new MessagesPlaceholder("chat_history"),
      ["human", "{input}"],
    ]);

      const historyAwareRetriever = await createHistoryAwareRetriever({
        llm,
        retriever,
        rephrasePrompt: qaPrompt,
      });

        const questionAnswerChain2 = await createStuffDocumentsChain({
          llm,
          prompt: qaPrompt,
        });


          const ragChain2 = await createRetrievalChain({
            retriever: historyAwareRetriever,
            combineDocsChain: questionAnswerChain2,
          });
        
          const response = await ragChain2.invoke({
            input: text1,
          });
          return response.answer;
        }








/////////////////////////////////// Usage, one document per file /////////////////////////////////////////
// import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
// const singleDocPerFileLoader = new PDFLoader(nike10kPdfPath, {
//   splitPages: false,
// });
// const singleDoc = await singleDocPerFileLoader.load();
// console.log(singleDoc[0].pageContent.slice(0, 100));

//output:
// Table of Contents
// UNITED STATES
// SECURITIES AND EXCHANGE COMMISSION
// Washington, D.C. 20549
// FORM 10-K

//////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////// Eliminating extra spaces/////////////////////////////////////////
// PDFs come in many varieties, which makes reading them a challenge. The loader parses individual text elements and joins them together with a space by default, but if you are seeing excessive spaces, this may not be the desired behavior. In that case, you can override the separator with an empty string like this:

// import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
// const noExtraSpacesLoader = new PDFLoader(nike10kPdfPath, {
//   parsedItemSeparator: "",
// });
// const noExtraSpacesDocs = await noExtraSpacesLoader.load();
// console.log(noExtraSpacesDocs[0].pageContent.slice(100, 250));


//////////////////////////////////////// Loading directories ////////////////////////////////////////










