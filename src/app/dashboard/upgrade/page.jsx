import Upgrade from "./UpgradeUi"
import { auth } from "@/auth";

const page = async() => {
  const session = await auth();
  return ( 
    <div>
      <Upgrade session={session} />
    </div>
  )
}

export default page