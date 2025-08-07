import MainLayout from "@/layouts/MainLayout";
import type { RootState } from "../app/store";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <MainLayout>
      <div className="w-full bg-gray-900 min-h-screen flex flex-col items-center justify-center ">
        <div className="max-w-full">
          {/* <img className="object-cover w-full" src="https://images.unsplash.com/photo-1656896402555-f606bb9b7d18?q=80&w=1149&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/> */}
        </div>
        {user && <h1 className="text-gray-700 text-5xl font-bold ">Hello {user.name.split(" ")[0]} !</h1>}
      </div>
    </MainLayout>
  );
}

export default Home;
