'use client'
import { useRouter } from "next/navigation";
import { useState } from 'react';


export default function UploadForm() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setResponseMessage("Please select a file to upload.");
      return;
    }

    setIsUploading(true);
    setResponseMessage(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload-file', {
        method: 'POST',
        body: formData,
      });
 
      const result = await res.json();
      if (result.success) {
        setResponseMessage(`File uploaded successfully! URL: ${result.url}`);
        router.push("/dashboard/files");
        
      } else {
        setResponseMessage(`Error: ${result.error || 'Upload failed'}`);
      }
    } catch (error:any) {
      setResponseMessage(`Error: ${error.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="">
      <form
        onSubmit={onSubmit}
        className="bg-white text-gray-800 rounded-lg shadow-lg p-6  flex flex-col gap-4"
      >
        <h2 className="text-2xl font-bold text-center">الدردشة مع بياناتك</h2>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="block w-full border border-gray-300 rounded-md p-2 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
        />
        <button
          type="submit"
          disabled={isUploading}
          className={`w-full py-2 rounded-md text-white font-semibold ${
            isUploading ? 'bg-gray-400' : 'bg-sky-500 hover:bg-sky-600'
          } transition`}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {responseMessage && (
        <div
          className={`mt-4 p-4 rounded-lg shadow-lg text-center max-w-md w-full ${
            responseMessage.startsWith('File uploaded successfully!')
              ? 'bg-green-500'
              : 'bg-red-500'
          }`}
        >
          {responseMessage}
        </div>
      )}
    </div>
  );
}