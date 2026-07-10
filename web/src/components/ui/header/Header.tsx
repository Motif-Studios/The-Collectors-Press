"use client";

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
import { classNameHelper } from "@/lib/utils/classNameHelper";
import { logout } from "@/features/auth/lib/client";
import { useLogoutFeedback } from "@/components/ui/logout_feedback/LogoutFeedback";

type NavItem = {
  label: string;
  href?: string;
  isActive?: boolean;
};

type HeaderProps = {
  navItems?: NavItem[];
  user?: { name: string } | null;
  isSubscriber?: boolean;
  children?: React.ReactNode;
};

type AccountActionProps = {
  name: string;
  isSubscriber: boolean;
};

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
    <header className="w-full">
      <div className="bg-black text-white">
        <HeaderTopBar>
          <HeaderLeft>
            <MenuAction />
            <SearchAction />
          </HeaderLeft>

          <HeaderCenter />

          <HeaderRight>
            {!isSubscriber ? <SubscribeButton /> : null}

            {user ? <AccountAction name={user.name} isSubscriber={isSubscriber} /> : <SignInButton />}
          </HeaderRight>
        </HeaderTopBar>
      </div>

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

export function HeaderLeft({ children }: { children?: React.ReactNode }) {
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
          className="h-auto w-30 md:w-32.5 my-3"
          priority
        />
      </Link>
    </div>
  );
}

export function HeaderNav({ items }: { items: NavItem[] }) {
  return (
    <nav className="bg-black border-b border-white/20 px-3">
      <div className="flex items-center justify-start sm:justify-center gap-8 overflow-x-auto whitespace-nowrap py-3 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
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
        <button className="cursor-pointer hidden lg:inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#d4a843] via-[#f0c060] to-[#a87820] px-4 py-2 text-sm font-semibold text-black">
          <FontAwesomeIcon icon={faReadme} className="text-sm" />
          <span>Subscribe</span>
        </button>
      </Link>

      <Link href={"/subscribe"}>
        <button className="cursor-pointer inline-flex lg:hidden text-sm font-semibold text-[#f4b73f]">
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
        <button className="cursor-pointer hidden lg:inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black">
          <FontAwesomeIcon icon={faUser} />
          <span>Sign In</span>
        </button>
      </Link>
      <Link href={"/login"}>
      <button className="cursor-pointer inline-flex lg:hidden text-sm font-semibold text-white">
          Sign In
        </button>
      </Link>
    </>
  );
}

export function AccountAction({ name, isSubscriber }: AccountActionProps) {
  const { showSuccess, showError, clearMessage } = useLogoutFeedback();
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isDropdownOpen]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      clearMessage();

      const result = await logout();

      if (result.error) {
        showError(`Logout failed: ${result.error}`);
        return;
      }

      showSuccess("You have been signed out successfully.");
      setTimeout(() => {
        window.location.replace("/");
      }, 800);
    } catch (error) {
      console.error("Logout handler error:", error);
      showError("An unexpected error occurred while logging out. Please try again.");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-2 !bg-transparent !p-0 !border-0 !shadow-none text-sm font-semibold text-white hover:text-white/80 transition"
        >
          <span className="hidden lg:flex items-center gap-2">
            <FontAwesomeIcon icon={faUser} />
            <span>{name}</span>
            <FontAwesomeIcon
              icon={faChevronDown}
              className={classNameHelper(
                "text-xs opacity-80 transition-transform",
                isDropdownOpen && "rotate-180"
              )}
            />
          </span>

          <span className="flex lg:hidden text-white">
            <FontAwesomeIcon icon={faUser} />
          </span>
        </button>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 rounded-lg bg-neutral-900 border border-white/20 shadow-lg z-50">
            <div className="py-2">
              {/* Studio Link */}
              {isSubscriber && (
               
              <Link
                href="/studio"
                className="block px-4 py-2 text-sm text-white hover:bg-neutral-800 transition"
                onClick={() => setIsDropdownOpen(false)}
              >
                Studio
              </Link>
              )}

              {/* Account Link */}
              <Link
                href="/my-account"
                className="block px-4 py-2 text-sm text-white hover:bg-neutral-800 transition"
                onClick={() => setIsDropdownOpen(false)}
              >
                My Account
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Logout Button - kept on the side */}
      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="text-sm font-semibold text-white hover:text-white/80 transition disabled:opacity-60"
      >
        {isLoggingOut ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
}

export function MenuAction() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isMenuOpen]);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Pokémon", href: "/category/pokemon" },
    { label: "One Piece", href: "/category/one-piece" },
    { label: "Basketball", href: "/category/basketball" },
    { label: "Other", href: "/category/other" },
    { label: "About The Collectors Press", href: "/about" },
    { label: "Write for us", href: "#" },
    { label: "Subscribe", href: "/subscribe" },
  ];

  return (
    <div>
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="cursor-pointer flex items-center gap-2 text-sm font-semibold transition-colors duration-200 hover:text-white/70"
      >
        <span className="hidden lg:flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-all duration-200">
          <FontAwesomeIcon icon={faBars} />
        </span>

        <span className="flex lg:hidden text-white">
          <FontAwesomeIcon icon={faBars} />
        </span>

        <span className="hidden lg:inline">Menu</span>
      </button>

      {/* Modern Full-Screen Modal Menu */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 z-40 animate-in fade-in duration-300"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="animate-in slide-in-from-left duration-300 fixed left-0 top-0 h-screen w-80 bg-black border-r border-white/10 z-50 overflow-y-auto">
            {/* Close Button */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <span className="font-serif text-xl font-bold text-white">Menu</span>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="cursor-pointer p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Menu Items */}
            <div className="px-4 py-8 space-y-1">
              {/* Categories Section */}
              <div>
                <p className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-white/50 mb-4">Categories</p>
                <nav className="space-y-2">
                  {[
                    { label: "Home", href: "/" },
                    { label: "Pokémon", href: "/category/pokemon" },
                    { label: "One Piece", href: "/category/one-piece" },
                    { label: "Basketball", href: "/category/basketball" },
                    { label: "Other", href: "/category/other" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-3 py-3 text-base text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
              
              {/* Divider */}
              <div className="h-px bg-white/10 my-6" />
              
              {/* About & More Section */}
              <div>
                <p className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-white/50 mb-4">About</p>
                <nav className="space-y-2">
                  {[
                    { label: "About The Collectors Press", href: "/about" },
                    { label: "Write for us", href: "#" },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-3 py-3 text-base text-white hover:bg-white/5 rounded-lg transition-colors duration-200"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
              
              {/* Divider */}
              <div className="h-px bg-white/10 my-6" />
              
              {/* Subscribe Section */}
              <Link
                href="/subscribe"
                className="cursor-pointer block px-3 py-3 mt-4 text-base font-semibold text-black bg-[#f4b73f] hover:bg-[#f5c549] rounded-lg transition-colors duration-200 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Subscribe
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function SearchAction() {
  return (
    <Link href="/search" className="flex items-center gap-2 text-sm font-semibold">
      <span className="hidden lg:flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
        <FontAwesomeIcon icon={faSearch} />
      </span>

      <span className="flex lg:hidden text-white">
        <FontAwesomeIcon icon={faSearch} />
      </span>

      <span className="hidden lg:inline">Search</span>
    </Link>
  );
}
