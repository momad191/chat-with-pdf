"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { GrUpdate } from "react-icons/gr";

export default function OneEmailUi({ email_id }) {
  const [email, setEmail] = useState(null); // Ensures proper SSR handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Ensure proper conditional rendering
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Ensure client-only rendering

    async function fetchEmail() {
      if (!email_id) {
        setError("Invalid email ID.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/email?id=${email_id}`);

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Server Error: ${errorText}`);
        }

        const data = await response.json();
        setEmail(data.email || null);
      } catch (error) {
        console.error("Error fetching email:", error.message);
        setError("Failed to load email.");
      } finally {
        setLoading(false);
      }
    }

    fetchEmail();
  }, [email_id]);

  // **Fix: Prevent hydration mismatch by rendering only after mounting**
  if (!isMounted) {
   
    return <div className=" bg-gray-800 text-white flex items-center justify-center h-screen w-full text-xl font-bold">Loading...</div>;

  }

  if (loading) {
    return <div className=" bg-gray-800 text-white flex items-center justify-center h-screen w-full text-xl font-bold">Loading...</div>;
  }

  if (error) {
    return <div className=" bg-gray-800 text-white flex items-center justify-center h-screen text-red-500 text-lg">{error}</div>;
  }

  if (!email) {
    return <div className="bg-gray-800 text-white flex items-center justify-center h-screen text-gray-500 text-lg">No email found.</div>;
  }

  return (
    <div className="min-h-screen w-full bg-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-2xl overflow-hidden p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Email Details</h2>
        <div className="p-4 border rounded-lg bg-gray-50">
          <p className="text-gray-700 mb-2"><span className="font-semibold">Subject:</span> {email.subject}</p>
          <p className="text-gray-700 mb-2"><span className="font-semibold">From:</span> {email.greeting}</p>
          <p className="text-gray-700"><span className="font-semibold">Message:</span> {email.message_body}</p>
        </div>

        <Link href="/features/write/all">

        <button
       
            className="mt-4 w-full flex items-center justify-center gap-2 border border-white font-semibold px-4 py-2 text-black rounded-lg transition bg-[#1abac8] hover:bg-gray-500 cursor-pointer"
      
          >
            <GrUpdate />  Write new Email
          </button>
          </Link>
      </div>
    </div>
  );
}
