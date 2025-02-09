"use client";
import { useState } from "react";
import Sidebar from "./Sidebar";
const SidebarWrapper = ({session}) => {
    const [isOpen, setIsOpen] = useState(true);
    // const toggleSidebar = () => setIsOpen(!isOpen);
    return (
        <>
            {/* <button
                onClick={toggleSidebar}
                className="p-2 bg-blue-500 text-white fixed top-4 left-4 z-50 rounded-full hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 transition-all"
            >
                {isOpen ? "Close" : "Open"}
            </button> */}
            <Sidebar isOpen={isOpen} session={session}  />
        </>
    );
};
 
export default SidebarWrapper;
