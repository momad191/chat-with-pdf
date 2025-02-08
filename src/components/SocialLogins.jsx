import { doSocialLogin } from "@/app/actions";
import { FaGoogle, FaGithub } from "react-icons/fa";

const SocialLogins = () => {
    return (
        <form action={doSocialLogin} className="flex  items-center space-y-2 mt-4">
            <button
                className="flex items-center justify-center w-full bg-gray-800 text-white py-2 px-4 rounded-lg font-medium text-lg hover:bg-gray-900 focus:ring-4 focus:ring-gray-500 transition-all duration-300"
                 type="submit"
                name="action"
                value="google"
            >
                <FaGoogle className="mr-2" size={20} /> Sign In With Google
            </button>

            {/* <button
                className="flex items-center justify-center w-full bg-gray-800 text-white py-2 px-4 rounded-lg font-medium text-lg hover:bg-gray-900 focus:ring-4 focus:ring-gray-500 transition-all duration-300"
                type="submit"
                name="action"
                value="github"
            >
                <FaGithub className="mr-2" size={20} /> Sign In With GitHub
            </button> */}
        </form>
    );
};

export default SocialLogins;
