import { FaFolder, FaUser, FaCog } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import Logout from  "@/components/Logout";
const Sidebar = ({ isOpen ,session }) => {
    return (  
      <>  
            {/* Sidebar */}
            <div
                className={`relative fixed  xl:w-[250px] md:w-[250px] w-full top-0 left-0 h-screen bg-gray-800 text-white shadow-lg transform transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } w-64`}
            >
                <div className="p-4 border-b border-gray-700  items-center justify-between">
                    {/* <h2 className="text-xl font-semibold">Chat with PDFs</h2> */}

                                {session?.user?.name && session?.user?.image ? (
                                    <>
                                      <Image
                                            src={session?.user?.image}
                                            alt={session?.user?.name}
                                            width={72}
                                            height={72}
                                            className="rounded-full"
                                        />
                                        <h1 className="text-md  my-2">
                                            Welcome, {session?.user?.name}
                                        </h1>
                                      
                                    </>
                                ) : (
                                    <> 
                                    <Image
                                    src="/default-avatar.jpg"
                                    alt="avatar"
                                    width={72}
                                    height={72}
                                    className="rounded-full"
                                />
                                    <h1 className="text-sm my-2">
                                        Welcome, {session?.user?.email}
                                    </h1>
                                    </>
                                )}  
                      

                </div>


                      

                <nav className="p-4 space-y-2">
                    <Link
                        href="/dashboard/files"
                        className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all"
                    >
                        <FaFolder className="mr-3" size={18} />
                         Files
                    </Link>
                    <Link
                        href="/dashboard"
                        className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all"
                    ><FaFolder className="mr-3" size={18} />
                         Add new File
                    </Link>

                    <Link
                        href="/dashboard/profile"
                        className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all"
                    >
                        <FaUser className="mr-3" size={18} /> Account
                    </Link>

 

                    <Link
                        href="/dashboard/general-settings"
                        className="flex items-center p-2 text-gray-300 rounded-lg hover:bg-gray-700 hover:text-white transition-all"
                    >
                        <FaCog className="mr-3" size={18} /> App Settings
                    </Link>
                    <Logout />
                </nav>
            </div>
            </>
    );
};

export default Sidebar;
