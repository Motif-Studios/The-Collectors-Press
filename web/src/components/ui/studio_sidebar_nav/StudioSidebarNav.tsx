"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const baseNavItems: {href: string; label: string; exact?: boolean }[] = [
  { href: "/studio", label: "Studio", exact: true },
  { href: "/studio/create", label: "Create" },
];

const adminNavItem: {href: string; label: string; exact?: boolean } = { href: "/studio/admin", label: "Admin" };

function isActivePath(pathname: string | null, href: string, exact?: boolean) {
  if (!pathname) {
    return false;
  }

  if (exact) {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

type StudioSidebarNavProps = {
  isAdmin?: boolean;
};

export function StudioSidebarNav({ isAdmin = false }: StudioSidebarNavProps) {
  const pathname = usePathname();
  const navItems = isAdmin ? [...baseNavItems, adminNavItem] : baseNavItems;

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
