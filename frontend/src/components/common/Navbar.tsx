import React from "react";
import { Link } from "react-router-dom";
import CTABtn from "../common/CTABtn"
import SketchLogo from "../../../public/Assets/SketchLogo.svg";
import { LuArrowRight } from "react-icons/lu";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

const Navbar: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="sticky top-5 w-10/12 mx-auto bg-white flex items-center py-2 px-2.5 justify-between border border-gray-200 rounded-full">
      <Link to="/">
        <img src={SketchLogo} className="w-24" />
      </Link>

      {user ? <div><img loading="lazy" src={user?.profileImage} className="w-10 h-10 aspect-square rounded-full" alt="Profile"/></div> : <div>
        <CTABtn title="Reset Password" icon={<LuArrowRight size={20}/>} bg="black" text="white" iconPosition="right"/>
      </div> }
    </div>
  );
};

export default Navbar;
