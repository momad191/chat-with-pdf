"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoMdChatboxes  } from "react-icons/io";
import SidebarWrapper from "@/components/SidebarWrapper";
const FilesTable = () => {
    
    const [files, setFiles] = useState([]);
 
    useEffect(() => {
        async function fetchFiles() {
            try {
                const response = await fetch("/api/files?page=1");
                const data = await response.json();
                setFiles(data.files);
            } catch (error) {
                console.error("Error fetching files:", error);
            }
        } 

        fetchFiles();
    }, []);

    if(files.length<1){
        
        return(
            <div className="xl:flex md:flex ">
              <SidebarWrapper />
              <div className="container mx-auto px-4 py-6">
              <h1 className="text-2xl font-bold mb-4">No file uploaded </h1>
              <Link href="/dashboard">
              <button>
                    Upload your files now
              </button>
              </Link>

              </div>
            </div>
        )
    }
 else{


    return (
        <div className="xl:flex md:flex ">
        <SidebarWrapper />
        
        <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-4">Files</h1>
            <div className="overflow-x-auto">
                <table className="w-full table-auto border-collapse border border-gray-300 shadow-lg rounded-md">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="p-3 text-left">Created</th>
                            <th className="p-3 text-left">Title</th>
                            <th className="p-3 text-left">chat</th>
                        </tr>
                    </thead>  
                    <tbody>
                        {files.map((file) => (
                            <tr
                                key={file._id}
                                className="hover:bg-gray-100 transition-all border-b border-gray-300"
                            >
                                <td className="p-3">{new Date(file.date).toLocaleDateString()}</td>
                                <td className="p-3">{file.file_name}</td>
                                <td className="p-3">
                                    <button
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition-all"
                                        onClick={() => window.open(`/features/pdf/${file._id}`, "_blank")}
                                    >
                                        <IoMdChatboxes  /> Chat
                                    </button>
                                    {/* <button
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition-all"
                                        onClick={() => window.open(file.file_url, "_blank")}
                                    >
                                        <IoMdChatboxes  /> the file
                                    </button> */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </div>
    ) };
};

export default FilesTable;
