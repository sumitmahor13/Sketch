import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import type { RootState } from "../../../app/store";
import SketchLogo from "../../../../public/Assets/SketchLogo.svg";
import { Link, useNavigate } from "react-router-dom";
import { PiArrowLeft, PiGear, PiPackage, PiUser, PiShoppingBag} from "react-icons/pi";
import { useLogoutMutation } from "@/feature/auth/authApi";
import toast from "react-hot-toast";

type NavCategory = {
  category: string;
  links: string[];
};

type NavLink = {
  title: string;
  subLinks?: NavCategory[];
};

const navLinks: NavLink[] = [
  {
    title: "Home",
    subLinks: [
      {
        category: "Web",
        links: [
          "HTML",
          "CSS",
          "JavaScript",
          "React",
          "Next.js",
          "Vite",
          "Tailwind",
          "TypeScript",
        ],
      },
      {
        category: "Mobile",
        links: [
          "React Native",
          "Flutter",
          "Swift",
          "Kotlin",
          "Ionic",
          "Expo",
          "NativeScript",
        ],
      },
    ],
  },
  {
    title: "Services",
    subLinks: [
      {
        category: "Design",
        links: [
          "UI/UX",
          "Figma",
          "Sketch",
          "Adobe XD",
          "Photoshop",
          "Illustrator",
          "Canva",
          "Zeplin",
          "Framer",
          "InVision",
        ],
      },
      {
        category: "Development",
        links: [
          "Web App",
          "Mobile App",
          "E-commerce",
          "CMS",
          "SaaS",
          "Landing Page",
          "Custom API",
          "Admin Panel",
          "CRM",
          "ERP",
        ],
      },
    ],
  },
  {
    title: "About",
    subLinks: [
      {
        category: "Company",
        links: ["Our Story", "Mission", "Vision", "Team", "Careers", "Press"],
      },
      {
        category: "Legal",
        links: ["Privacy Policy", "Terms", "Cookies", "Security", "Compliance"],
      },
    ],
  },
  {
    title: "Contact",
    subLinks: [
      {
        category: "Support",
        links: [
          "Chat",
          "Email",
          "Phone",
          "Support Portal",
          "Live Agent",
          "Community",
          "Knowledge Base",
          "Ticketing",
          "Feedback",
          "FAQs",
        ],
      },
      {
        category: "Sales",
        links: [
          "Book Demo",
          "Pricing",
          "Enterprise",
          "Custom Plan",
          "Offers",
          "Promotions",
          "Onboarding",
          "Consulting",
          "Partnership",
          "Affiliates",
        ],
      },
    ],
  },
  {
    title: "Resources",
    subLinks: [
      {
        category: "Learning",
        links: [
          "Docs",
          "Guides",
          "Tutorials",
          "Blogs",
          "Webinars",
          "Courses",
          "Workshops",
          "Newsletter",
          "Cheat Sheets",
          "Case Studies",
        ],
      },
      {
        category: "Tools",
        links: [
          "API Explorer",
          "CLI",
          "Code Editor",
          "Component Libs",
          "Snippets",
          "Templates",
          "Plugins",
          "Open Source",
          "Figma Kit",
          "DevTools",
        ],
      },
    ],
  },
];

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);

  const [logout] = useLogoutMutation();

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeLink, setActiveLink] = useState<string | null>(null);

  const [menu, setMenu] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await logout({});
      toast.success(res.data.message);
      navigate("/login")
    } catch (error) {
      toast.error("Somthing went wrong");
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const curruntScrollY = window.scrollY;
      setShowNavbar(curruntScrollY < lastScrollY || curruntScrollY < 50);
      setLastScrollY(curruntScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const currentSubLinks =
    navLinks.find((link) => link.title === activeLink)?.subLinks || [];

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -100 }}
      transition={{ duration: 0.2 }}
      onMouseLeave={() => setActiveLink(null)}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-out 
    ${activeLink ? "bg-white shadow-xl" : "bg-[#ffffffcf] backdrop:blur-3xl"}`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-6">
        <img className="w-20" src={SketchLogo} />
        <ul className="flex gap-6">
          {navLinks.map((link) => (
            <li
              key={link.title}
              className="relative"
              onMouseEnter={() =>
                setActiveLink(link.subLinks ? link.title : null)
              }
            >
              <button className="text-sm font-medium">{link.title}</button>
            </li>
          ))}
        </ul>
        <div>
          {user ? (
            <div className="flex gap-5 text-gray-800 items-center">
              <PiShoppingBag className="cursor-pointer" size={22} />
              <img
                onClick={() => setMenu(!menu)}
                className=" w-6 h-6 rounded-full cursor-pointer"
                src={user?.profileImage}
              />
            </div>
          ) : (
            <button>Login</button>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {activeLink && currentSubLinks.length > 0 && (
          <motion.div
            key="submenu"
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden pt-5 px-40 bg-white"
          >
            <div className="py-8 grid grid-cols-3 md:grid-cols-5 gap-10 overflow-auto">
              {currentSubLinks.map((category, i) => (
                <div key={category.category}>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {category.category}
                  </h3>
                  <ul className="space-y-2">
                    {category.links.map((item, j) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ delay: i * 0.1 + j * 0.03 }}
                        className="text-3xl font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer"
                      >
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        onClick={() => setMenu(false)}
        className={`absolute ${
          menu ? "scale-100" : "scale-0"
        } transition-all w-48 z-0 duration-200 ease-in-out top-16 shadow cursor-pointer rounded-3xl flex flex-col justify-center items-start gap-y- p-2 right-5 bg-white`}
      >
        {/* <PiX className="absolute right-4 top-4" /> */}
        <Link to={"/"} className="w-full">
          <div className="flex gap-1 items-center transition-all duration-300 hover:bg-gray-300 py-2 px-3 rounded-xl">
            <PiUser size={20} />
            Profile
          </div>
        </Link>
        <Link to={"/my-orders"} className="w-full">
          <div className="flex gap-1 items-center transition-all duration-300 hover:bg-gray-300 py-2 px-3 rounded-xl">
            <PiPackage size={20} />
            My Orders
          </div>
        </Link>
        <Link to={"profile/settings"} className="w-full">
          <div className="flex gap-1 items-center transition-all duration-300 hover:bg-gray-300 py-2 px-3 rounded-xl">
            <PiGear size={20} />
            Profile
          </div>
        </Link>
        <div className="w-full" onClick={handleLogout}>
          <div className="flex items-center transition-all duration-300 text-red-400 hover:bg-red-200 py-2 px-3 rounded-xl">
            <PiArrowLeft size={20} />
            Logout
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
