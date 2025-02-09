import SidebarWrapper from "@/components/SidebarWrapper";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UploadForm from "../features/upload-files/Form"
import { User } from "@/model/user-model";
import RegistrationFormSocial from "@/components/RegistrationFormSocial"    
       
const HomePage = async () => {
    const session = await auth();
    if (!session?.user) redirect("/");
     
        const email = session?.user?.email;
        if (!email) {
          return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }
    
        const user = await User.findOne({ email }).select("-password"); // Exclude password for security
        if (!user) {
            return (
          <RegistrationFormSocial session={session} />
            )
        }else{

       
    
    return (
    <div className="xl:flex md:flex">
    <SidebarWrapper session={session} /> 
       <div className=" flex flex-col w-full h-screen items-center justify-center bg-gradient-to-b p-4">
        <div className="flex flex-col justfy-center  items-center">
         <UploadForm /> 
        </div>
        </div>
        </div>
    );
}
};

export default HomePage;