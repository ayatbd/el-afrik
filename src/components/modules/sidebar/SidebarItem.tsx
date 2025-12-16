"use client";

import { useState } from "react";
import Link from "next/link";

export type SidebarSubItem = {
  name: string;
  href: string;
};

type SidebarItemProps = {
  name: string;
  href?: string;
  icon: React.ReactNode;
  subItems?: SidebarSubItem[];
};

export default function SidebarItem({
  name,
  href,
  icon,
  subItems = [],
}: SidebarItemProps) {
  const [open, setOpen] = useState(false);
  const hasChildren = subItems.length > 0;

  return (
    <li>
      {hasChildren ? (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-full text-gray-300 text-[15px] font-medium flex items-center gap-3
          hover:bg-[#00C058] hover:text-white rounded-md px-3 py-3 transition-all duration-300"
        >
          {icon}
          <span className="flex-1 text-left">{name}</span>

          <svg
            className={`w-3 h-3 transition-transform duration-300 ${
              open ? "rotate-0" : "-rotate-90"
            }`}
            viewBox="0 0 451.847 451.847"
            fill="currentColor"
          >
            <path d="M225.923 354.706c-8.098 0-16.195-3.092-22.369-9.263L9.27 151.157c-12.359-12.359-12.359-32.397 0-44.751 12.354-12.354 32.388-12.354 44.748 0l171.905 171.915 171.906-171.909c12.359-12.354 32.391-12.354 44.744 0 12.365 12.354 12.365 32.392 0 44.751L248.292 345.449c-6.177 6.172-14.274 9.257-22.369 9.257z" />
          </svg>
        </button>
      ) : (
        <Link
          href={href!}
          className="menu-item text-gray-300 text-[15px] font-medium flex items-center gap-3
          hover:bg-[#00C058] hover:text-white rounded-md px-3 py-3 transition-all duration-300"
        >
          {icon}
          <span>{name}</span>
        </Link>
      )}

      {hasChildren && (
        <ul
          className={`ml-8 overflow-hidden transition-[max-height] duration-500 ease-in-out ${
            open ? "max-h-40" : "max-h-0"
          }`}
        >
          {subItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="block text-gray-300 text-[14px] font-medium
                hover:bg-[#00C058] hover:text-white rounded-md px-3 py-2 transition-all duration-300"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
