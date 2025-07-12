import MainLayout from "@/layouts/MainLayout";
import type { RootState } from "../app/store";
import { useSelector } from "react-redux";

function Home() {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <MainLayout>
      <div className="w-full min-h-screen flex items-center justify-center ">
        {user && <h1 className="text-gray-700 text-5xl font-bold ">Hello {user.name.split(" ")[0]} !</h1>}
      </div>
    </MainLayout>
  );
}

export default Home;
