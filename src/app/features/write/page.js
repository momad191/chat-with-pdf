import SidebarWrapper from "@/components/SidebarWrapper";
import SidebarWrapperEmail from "./SidebarWrapperEmail";
import { auth } from "@/auth";
import PromptInput from "./PromptInput";
const Write = async() => {
    const session = await auth();
    if (!session?.user) redirect("/");

  return (
    <div className=" lg:flex  bg-gray-800 ">
      <SidebarWrapper session={session} />
      <div
        className={` relative  md:w-full h-screen bg-gray-800 text-white shadow-lg transform transition-transform duration-300 w-84`}
      > 
    
    <PromptInput />
        
        
        </div>
      <SidebarWrapperEmail session={session} />
    </div>
    
  );
};

export default Write; 
