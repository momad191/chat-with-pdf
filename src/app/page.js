import Navbar from "@/components/navbar"
import Link from "next/link";
export default function Home() {
  return (
    <>
    <Navbar />
   
   <div className="min-h-screen flex flex-col">
      {/* Main Section */}
      <main className="flex-grow bg-gray-100 flex items-center justify-center text-center">
        <div className="container mx-auto px-4">
          {/* Welcome Text */}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 transform transition-all duration-700 ease-in-out animate-bounce">
             
          Chat with your PDF files 
          </h1>
          <p className="text-lg text-gray-600 mb-8">
          Let AI summarize, find information, translate, transcribe, and get citations from your files in seconds. Works in 90+ languages. 
          </p>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
              <h3 className="text-2xl font-semibold mb-2 text-blue-500">
              Upload your Files
           
              </h3>
              <p className="text-black font-bold">
              Easily add your files and start chat and summaraize them.
                
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
              <h3 className="text-2xl font-semibold mb-2 text-blue-500">
              Ask Questions
                
              </h3>
              <p className="text-black font-bold">
              Ask AI any question about your document. 
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all">
              <h3 className="text-2xl font-semibold mb-2 text-blue-500">
              Get Answers
              </h3>
              <p className="text-black font-bold">
              Get an answer from the document.
              </p>
            </div>
          </div>
          <Link href={`/register`}>
            <button className="bg-blue-500 text-white px-6 py-3 rounded-full text-lg hover:bg-gray-800 transition-all">
              Start Now
            </button>
          </Link>
        </div>
      </main>
    </div>
    </>
    
  );
}