"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/studio", label: "Studio", exact: true },
  { href: "/studio/create", label: "Create" },
];

function isActivePath(pathname: string | null, href: string, exact?: boolean) {
  if (!pathname) {
    return false;
  }

  if (exact) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function StudioSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-row flex-wrap gap-x-6 gap-y-[18px] lg:flex-col lg:gap-[18px]">
      {navItems.map((item) => {
        const isActive = isActivePath(pathname, item.href, item.exact);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "w-fit text-base transition-colors",
              isActive
                ? "font-bold text-black underline underline-offset-[3px]"
                : "text-neutral-700 hover:text-black",
            ].join(" ")}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
