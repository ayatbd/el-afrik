"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineDashboard } from "react-icons/md";
import { FaUserPlus } from "react-icons/fa";
import { AiFillProduct, AiOutlineOrderedList } from "react-icons/ai";
import { TbCategoryPlus } from "react-icons/tb";
import { IoIosAdd, IoIosBicycle } from "react-icons/io";
import { PiCoffeeDuotone } from "react-icons/pi";
import { Proportions } from "lucide-react";
import { SiFuturelearn } from "react-icons/si";
import { CiSettings } from "react-icons/ci";
import { IoTrophySharp } from "react-icons/io5";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (menuName: string) => {
    setOpenSubmenu(openSubmenu === menuName ? null : menuName);
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/",
      icon: <MdOutlineDashboard size={20} />,
    },
    {
      name: "User Management",
      href: "/user-management",
      icon: <FaUserPlus size={20} />,
    },
    {
      name: "Product Management",
      href: "/product-management",
      icon: <AiFillProduct size={20} />,
    },
    {
      name: "Categories",
      href: "/categories",
      icon: <TbCategoryPlus size={20} />,
    },
    {
      name: "Rider Tracking",
      href: "/rider-tracking",
      icon: <IoIosBicycle size={20} />,
    },
    {
      name: "Orders",
      href: "/orders",
      icon: <AiOutlineOrderedList size={20} />,
    },
    {
      name: "Add Products",
      href: "/add-products",
      icon: <IoIosAdd size={20} />,
    },
    {
      name: "Catering",
      href: "/catering",
      icon: <PiCoffeeDuotone size={20} />,
    },
    {
      name: "Special Promos",
      href: "/special-promos",
      icon: <Proportions size={20} />,
    },
    {
      name: "Earnings",
      href: "/earnings",
      icon: <SiFuturelearn size={20} />,
    },
    {
      name: "Rewards",
      href: "/rewards",
      icon: <IoTrophySharp size={20} />,
    },
  ];

  const NavSubItems = [
    {
      name: "Profile",
      href: "/profile",
    },
    {
      name: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      name: "Terms & Conditions",
      href: "/terms-conditions",
    },
    {
      name: "FAQs",
      href: "/faqs",
    },
    {
      name: "Notifications",
      href: "/notifications",
    },
    {
      name: "Operating Hours",
      href: "/operating-hours",
    },
  ];

  return (
    <>
      <nav id="sidebar" className="lg:min-w-67.5 w-max max-lg:min-w-8">
        <div
          id="sidebar-collapse-menu"
          className={`bg-[#081028] shadow-lg h-screen fixed top-0 left-0 overflow-auto z-99 lg:min-w-67.5 lg:w-max transition-all duration-500
          ${isOpen ? "w-62.5 visible" : "max-lg:w-0 max-lg:invisible"}`}
        >
          <div className="sticky top-0 bg-[#081028] z-100">
            <Link href="/" className="outline-0">
              <Image
                width={100}
                height={100}
                src="/images/dashboard/sidebar/logo.png"
                alt="logo"
                className="mx-auto"
              />
            </Link>
          </div>

          <div className="py-6 px-6">
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="menu-item text-gray-300 text-[15px] font-medium flex items-center gap-3 cursor-pointer hover:bg-[#00C058] focus:bg-[#00C058] active:bg-[#00C058] focus:text-white hover:text-white rounded-md px-3 py-3 transition-all duration-300"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}

              {/* ------------------------------------------ */}
              <li>
                <button
                  onClick={() => toggleSubmenu("posts")}
                  className="menu-item text-gray-300 text-[15px] font-medium flex items-center gap-3 cursor-pointer hover:bg-[#00C058] focus:bg-[#00C058] active:bg-[#00C058] focus:text-white hover:text-white rounded-md px-3 py-3 transition-all duration-300 w-full"
                >
                  <span className="overflow-hidden text-ellipsis whitespace-nowrap flex gap-3">
                    <CiSettings size={20} />
                    Setting
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-3 fill-current ml-auto transition-all duration-500 ${
                      openSubmenu === "posts" ? "rotate-0" : "-rotate-90"
                    }`}
                    viewBox="0 0 451.847 451.847"
                  >
                    <path d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z" />
                  </svg>
                </button>
                <ul
                  className={`sub menu overflow-hidden transition-[max-height] duration-500 ease-in-out ml-8 ${
                    openSubmenu === "posts" ? "max-h-125" : "max-h-0"
                  }`}
                >
                  {NavSubItems.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="menu-item text-gray-300 text-[15px] font-medium flex items-center gap-3 cursor-pointer hover:bg-[#00C058] focus:bg-[#00C058] active:bg-[#00C058] focus:text-white hover:text-white rounded-md px-3 py-2.5 transition-all duration-300"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <button
        id="toggle-sidebar"
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-8 h-8 z-100 fixed top-9 left-2.5 cursor-pointer bg-[#007bff] flex items-center justify-center rounded-full outline-0 transition-all duration-500"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#fff"
          className="w-3 h-3"
          viewBox="0 0 55.752 55.752"
        >
          <path d="M43.006 23.916a5.36 5.36 0 0 0-.912-.727L20.485 1.581a5.4 5.4 0 0 0-7.637 7.638l18.611 18.609-18.705 18.707a5.398 5.398 0 1 0 7.634 7.635l21.706-21.703a5.35 5.35 0 0 0 .912-.727 5.373 5.373 0 0 0 1.574-3.912 5.363 5.363 0 0 0-1.574-3.912z" />
        </svg>
      </button>
    </>
  );
}
