import React from "react";
import Link from "next/link";
import {
  Header,
  HeaderTopBar,
  HeaderLeft,
  HeaderCenter,
  HeaderRight,
  AccountAction,
} from "./Header";

type StudioHeaderUser = {
  name: string;
};

type StudioHeaderProps = {
  user: StudioHeaderUser;
};

export function StudioHeader({ user }: StudioHeaderProps) {
  return (
    <Header>
      <HeaderTopBar>
        <HeaderLeft>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-black"
          >
            Home
          </Link>
        </HeaderLeft>

        <HeaderCenter />

        <HeaderRight>
          <AccountAction name={user.name} />
        </HeaderRight>
      </HeaderTopBar>
    </Header>
  );
}
