import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faSearch,
  faUser,
  faChevronDown,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

type NavItem = {
  label: string;
  href?: string;
  isActive?: boolean;
};

type HeaderProps = {
  navItems?: NavItem[];
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
    <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-white/20 px-3 py-2 md:px-4 md:py-2.5">
      {children}
    </div>
  );
}

export function HeaderLeft({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center gap-2 md:gap-4">{children}</div>;
}

export function HeaderRight({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-end gap-2 md:gap-4">
      {children}
    </div>
  );
}

export function HeaderCenter() {
  return (
    <div className="flex items-center justify-center text-center">
      <span className="font-serif text-[28px] leading-none">
        The New Zealand Herald
      </span>
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
              <span className="absolute left-1/2 top-full mt-3 h-[2px] w-8 -translate-x-1/2 bg-white" />
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
      <button className="hidden lg:inline-flex items-center gap-2 rounded-full bg-[#f4b73f] px-4 py-2 text-sm font-semibold text-black">
        <FontAwesomeIcon icon={faPlus} className="text-xs" />
        <span>Subscribe</span>
      </button>

      <button className="inline-flex lg:hidden text-sm font-semibold text-[#f4b73f]">
        Subscribe
      </button>
    </>
  );
}

export function SignInButton() {
  return (
    <>
      <button className="hidden lg:inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">
        <FontAwesomeIcon icon={faUser} />
        <span>Sign In</span>
      </button>

      <button className="inline-flex lg:hidden text-sm font-semibold text-white">
        Sign In
      </button>
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
