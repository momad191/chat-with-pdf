"use client";

import SocialLogins from "./SocialLogins";
import { doCredentialLogin } from "@/app/actions";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineMail, AiOutlineLock, AiOutlineArrowLeft } from "react-icons/ai";
import Link from "next/link";

const LoginForm = () => {
    const router = useRouter();
    const [error, setError] = useState("");

    async function onSubmit(event) {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            const response = await doCredentialLogin(formData);

            if (!!response.error) {
                console.error(response.error);
                setError(response.error.message);
            } else {
                router.push("/dashboard");
            }
        } catch (e) {
            console.error(e);
            setError("Check your Credentials");
        }
    }
 
    return (
        <div className="flex flex-col items-center justify-center min-h-screen  px-4 sm:px-6 lg:px-6 shadow-md rounded-lg">
            <div className="text-xl text-red-500 mb-4">{error}</div>
            <form 
                className="w-full max-w-md bg-white  p-6 space-y-4" 
                onSubmit={onSubmit}
            >
           <Link href="/" className="flex text-xl justfy-center items-center hover:bg-blue-500 hover:text-white rounded-xl p-4"> <AiOutlineArrowLeft  />Home</Link>

                <h2 className="text-2xl font-semibold text-gray-700 text-center">Login</h2>

                <div className="relative">
                    <label htmlFor="email" className="text-gray-600">Email Address</label>
                    <div className="flex items-center mt-1">
                        <AiOutlineMail className="absolute left-3 text-gray-400" size={20} />
                        <input 
                            type="email" 
                            name="email" 
                            id="email" 
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 hover:shadow-lg"
                            placeholder="Enter your email"
                        />
                    </div>
                </div>

                <div className="relative">
                    <label htmlFor="password" className="text-gray-600">Password</label>
                    <div className="flex items-center mt-1">
                        <AiOutlineLock className="absolute left-3 text-gray-400" size={20} />
                        <input 
                            type="password" 
                            name="password" 
                            id="password" 
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 hover:shadow-lg"
                            placeholder="Enter your password"
                        />
                    </div>
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition-all duration-300"
                >
                    Credential Login
                </button>

                <div className="text-center text-gray-500 mt-4">Or login with:</div>
             
              
            </form>
            <SocialLogins /> 

            <p className="my-3">
                    Don't you have an account?
                    <Link href="register" className="mx-2 underline">Register</Link>
                </p>
        </div>
    );
};

export default LoginForm;
