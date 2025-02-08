"use client";
import SocialLogins from "./SocialLogins";
import { useRouter } from "next/navigation";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock, AiOutlineArrowLeft} from "react-icons/ai";
import Link from 'next/link'

const RegistrationForm = () => {
    const router = useRouter();

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const formData = new FormData(event.currentTarget);

            const name = formData.get('name');
            const email = formData.get('email');
            const password = formData.get('password');

            const response = await fetch(`/api/register`, {
                method: 'POST',
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            response.status === 201 && router.push('/login');

        } catch (e) {
            console.error(e.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen  px-1 sm:px-6 lg:px-3">
            <form 
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white shadow-md rounded-lg p-6 space-y-4"
            >
               <Link href="/" className="flex text-xl justfy-center items-center hover:bg-blue-500 hover:text-white rounded-xl p-4"> <AiOutlineArrowLeft  />Home</Link>
                <h2 className="text-2xl font-semibold text-gray-700 text-center">Register</h2>

                <div className="relative">
                    <label htmlFor="name" className="text-gray-600">Name</label>
                    <div className="flex items-center mt-1">
                        <AiOutlineUser className="absolute left-3 text-gray-400" size={20} />
                        <input
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 hover:shadow-lg"
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Enter your name"
                        />
                    </div>
                </div>

                <div className="relative">
                    <label htmlFor="email" className="text-gray-600">Email Address</label>
                    <div className="flex items-center mt-1">
                        <AiOutlineMail className="absolute left-3 text-gray-400" size={20} />
                        <input
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 hover:shadow-lg"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                        />
                    </div>
                </div>

                <div className="relative">
                    <label htmlFor="password" className="text-gray-600">Password</label>
                    <div className="flex items-center mt-1">
                        <AiOutlineLock className="absolute left-3 text-gray-400" size={20} />
                        <input
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 hover:shadow-lg"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition-all duration-300"
                >
                    Register
                </button>

                <div className="text-center text-gray-500 mt-4">Or register with:</div>
                
            </form>
            <SocialLogins />
            <p className="my-3">
              Already have an account?
            <Link href="/login" className="mx-2 underline">Login</Link>
            </p>
        </div>
    );
};

export default RegistrationForm;
