import Image from "next/image";
// import LoginForm from "@/components/LoginForm"; 
import Logout from  "@/components/Logout";
import SidebarWrapper from "@/components/SidebarWrapper";
import { auth } from "@/auth";

import { redirect } from "next/navigation";
import UploadForm from "../features/upload-files/Form"

  
const HomePage = async () => {
    const session = await auth();

    if (!session?.user) redirect("/");

    return (
    <div className="xl:flex md:flex">
    <SidebarWrapper/>
       <div className=" flex flex-col w-full h-screen items-center justify-center bg-gradient-to-b   p-4">

        
        <div className="flex flex-col justfy-center  items-center">
        
        
            {session?.user?.name && session?.user?.image ? (
                <>
                    <h1 className="text-black text-3xl  my-2">
                        Welcome, {session?.user?.name}
                    </h1>
                    <Image
                        src={session?.user?.image}
                        alt={session?.user?.name}
                        width={72}
                        height={72}
                        className="rounded-full"
                    />
                </>
            ) : (
                <h1 className="text-3xl my-2">
                    Welcome, {session?.user?.email}
                </h1>
            )}  

             <Logout />

             <UploadForm />
        </div>
        </div>
        </div>
    );
};

export default HomePage;