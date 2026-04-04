import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faUser,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { faReadme } from "@fortawesome/free-brands-svg-icons";

type NavItem = {
  label: string;
  href?: string;
  isActive?: boolean;
};

type HeaderProps = {
  navItems?: NavItem[];
  user: { name: string } | null;
  isSubscriber?: boolean;
  children?: React.ReactNode;
};

function classNameHelper(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Header({
  navItems = [],
  user = null,
  isSubscriber = false,
  children,
}: HeaderProps) {
  if (children) {
    return <header className="w-full bg-black text-white">{children}</header>;
  }

  return (
    <header className="w-full bg-black text-white">
      <HeaderTopBar>
        <HeaderLeft>
          <MenuAction />
          <SearchAction />
        </HeaderLeft>

        <HeaderCenter />

        <HeaderRight>
          {!isSubscriber ? <SubscribeButton /> : null}

          {user ? <AccountAction name={user.name} /> : <SignInButton />}
        </HeaderRight>
      </HeaderTopBar>

      {navItems.length > 0 ? <HeaderNav items={navItems} /> : null}
    </header>
  );
}

export function HeaderTopBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-white/20 px-3 py-3 md:px-9 md:py-2.5">
      {children}
    </div>
  );
}

export function HeaderLeft({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2 md:gap-4">{children}</div>;
}

export function HeaderRight({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-end lg:gap-2 sm:gap-4">
      {children}
    </div>
  );
}

export function HeaderCenter() {
  return (
    <div className="flex items-center justify-center text-center">
      <Link href="/" className="inline-flex items-center justify-center">
        <Image
          src="/brand/logo/white.png"
          alt="Motif"
          width={100}
          height={40}
          className="h-auto w-[120px] md:w-[130px] my-3"
          priority
        />
      </Link>
    </div>
  );
}

export function HeaderNav({ items }: { items: NavItem[] }) {
  return (
    <nav className="border-b border-white/20 px-3">
      <div className="flex items-center justify-start lg:justify-center gap-8 overflow-x-auto whitespace-nowrap py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {items.map((item, index) => (
          <a
            key={`${item.label}-${index}`}
            href={item.href ?? "#"}
            className={classNameHelper(
              "relative text-[15px] text-white hover:text-white/80",
              item.isActive && "font-medium",
            )}
          >
            {item.label}

            {item.isActive ? (
              <span className="absolute left-1/2 top-full mt-3 h-0.5 w-8 -translate-x-1/2 bg-white" />
            ) : null}
          </a>
        ))}
      </div>
    </nav>
  );
}

export function SubscribeButton() {
  return (
    <>
      <Link href={"/subscribe"}>
        <button className="hidden lg:inline-flex items-center gap-2 rounded-full bg-[#f4b73f] px-4 py-2 text-sm font-semibold text-black">
          <FontAwesomeIcon icon={faReadme} className="text-sm" />
          <span>Subscribe</span>
        </button>
      </Link>

      <Link href={"/subscribe"}>
        <button className="inline-flex lg:hidden text-sm font-semibold text-[#f4b73f]">
          Subscribe
        </button>
      </Link>
    </>
  );
}

export function SignInButton() {
  return (
    <>
      <Link href={"/login"} className="inline-flex items-center gap-2">
        <button className="hidden lg:inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">
          <FontAwesomeIcon icon={faUser} />
          <span>Sign In</span>
        </button>
      </Link>
      <Link href={"/login"}>
        <button className="inline-flex lg:hidden text-sm font-semibold text-white">
          Sign In
        </button>
      </Link>
    </>
  );
}

type AccountActionProps = {
  name: string;
};

export function AccountAction({ name }: AccountActionProps) {
  return (
    <button className="flex items-center gap-2 !bg-transparent !p-0 !border-0 !shadow-none text-sm font-semibold text-white">
      <span className="hidden lg:flex items-center gap-2">
        <FontAwesomeIcon icon={faUser} />
        <span>{name}</span>
        <FontAwesomeIcon icon={faChevronDown} className="text-xs opacity-80" />
      </span>

      <span className="flex lg:hidden">
        <FontAwesomeIcon icon={faUser} />
      </span>
    </button>
  );
}

export function MenuAction() {
  return (
    <button className="flex items-center gap-2 text-sm font-semibold">
      <span className="hidden lg:flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
        <FontAwesomeIcon icon={faBars} />
      </span>

      <span className="flex lg:hidden text-white">
        <FontAwesomeIcon icon={faBars} />
      </span>

      <span className="hidden lg:inline">Menu</span>
    </button>
  );
}

export function SearchAction() {
  return (
    <button className="flex items-center gap-2 text-sm font-semibold">
      <span className="hidden lg:flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
        <FontAwesomeIcon icon={faSearch} />
      </span>

      <span className="flex lg:hidden text-white">
        <FontAwesomeIcon icon={faSearch} />
      </span>

      <span className="hidden lg:inline">Search</span>
    </button>
  );
}
