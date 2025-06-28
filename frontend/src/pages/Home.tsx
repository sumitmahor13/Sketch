import type { RootState } from "../app/store";
import { useSelector } from "react-redux";

function Home() {
    const user = useSelector((state: RootState) => state.auth.user);
    return(
        <div className="">
            <h1>Hello {user?.name}</h1>
            <img src={user?.profileImage} alt="Profile"/>
        </div>
    )
}

export default Home;