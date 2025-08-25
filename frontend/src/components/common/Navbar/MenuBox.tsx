import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { RootState } from "../../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { PiArrowLeftDuotone, PiBag, PiBoat, PiGear, PiUser } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/feature/auth/authApi";
import toast from "react-hot-toast";
import { authApi } from "@/feature/auth/authApi";

const MenuBox: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [logout] = useLogoutMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userMenu = [
    { link: "/profile", title: "Profile", icon:<PiUser/> },
    { link: "/myorders", title: "My Orders", icon:<PiBoat/> },
    { link: "/Settings", title: "Settings", icon:<PiGear/> },
    { link: "/cart", title: "My Cart", icon:<PiBag/> },
  ];

  const adminMenu = [
    { link: "/profile", title: "Profile", icon:<PiUser/> },
    { link: "admin/dashboard", title: "dashboard" },
  ];

  const handleLogout = async () => {
    try {
      const res = await logout({});
      toast.success(res.data.message);
      dispatch(authApi.util.resetApiState())   //for clear cache of authApi
      navigate("/login");
    } catch (error) {
      toast.error("Somthing went wrong");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img
          loading="lazy"
          className=" w-6 h-6 rounded-full cursor-pointer"
          src={user?.profileImage}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-52 rounded-2xl mr-2 mt-4.5"
        align="start"
      >
        {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
        {user?.role == "user" ? (
          <DropdownMenuGroup>
            {userMenu.map((menu, id) => {
              return (
                <Link key={id} to={menu.link}>
                  <DropdownMenuItem>
                    {menu.icon}
                    {menu.title}
                  </DropdownMenuItem>
                </Link>
              );
            })}
          </DropdownMenuGroup>
        ) : (
          <DropdownMenuGroup>
            {adminMenu.map((menu, id) => {
              return (
                <Link key={id} to={menu.link}>
                  <DropdownMenuItem>
                    <PiUser />
                    {menu.title}
                  </DropdownMenuItem>
                </Link>
              );
            })}
          </DropdownMenuGroup>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="focus:bg-red-100">
          <PiArrowLeftDuotone />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MenuBox;
