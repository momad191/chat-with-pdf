import FilesUi from "./FilesUi"
import { auth } from "@/auth";
import SidebarWrapper from "@/components/SidebarWrapper";


const page = async () => {
const session = await auth();   
   if (!session?.user) redirect("/");
  return (
    <div className=" md:flex ">
    <SidebarWrapper session={session} />
    <FilesUi />
    </div>
    
  )
}
  
export default page