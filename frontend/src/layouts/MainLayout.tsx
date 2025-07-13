import Navbar from "@/components/common/Navbar/Navbar";
import React from "react";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({children}) => {
    return (
        <div className="w-full min-h-screen flex flex-col">
            <Navbar/>

            <main className="">
                {children}
            </main>

            {/* <Footer/> */}
        
        </div>
    )
}

export default MainLayout;