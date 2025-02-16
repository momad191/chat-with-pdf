import { doLogout } from "@/app/actions"
import { GrSecure } from "react-icons/gr";

const Logout = () => {
  return (
    <form action={doLogout}>
        <button className="flex justify-center items-center gap-1 bg-red-500 hover:bg-red-900 my-2 text-white px-8 rounded" type="submit">
          <GrSecure /> Logout</button>
    </form>
  )
}

export default Logout