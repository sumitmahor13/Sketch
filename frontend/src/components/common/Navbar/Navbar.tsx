import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import type { RootState } from "../../../app/store";
import SketchLogo from "../../../../public/Assets/SketchLogo.svg";

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
        links: [
          "Our Story",
          "Mission",
          "Vision",
          "Team",
          "Careers",
          "Press",
        ],
      },
      {
        category: "Legal",
        links: [
          "Privacy Policy",
          "Terms",
          "Cookies",
          "Security",
          "Compliance",
        ],
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
  const user = useSelector((state: RootState) => state.auth.user);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeLink, setActiveLink] = useState<string | null>(null);

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
          {user ? <img className=" w-8 h-8 rounded-full" src={user?.profileImage}/> : <button>Login</button>}
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
    </motion.nav>
  );
};

export default Navbar;
