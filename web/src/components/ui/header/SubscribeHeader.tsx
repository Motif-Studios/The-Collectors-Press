import React from "react";
import {
  Header,
  HeaderTopBar,
  HeaderLeft,
  HeaderCenter,
  HeaderRight,
  SignInButton,
  AccountAction,
} from "./Header";

type SubscribeHeaderUser = {
  name: string;
};

type SubscribeHeaderProps = {
  user?: SubscribeHeaderUser | null;
};

export function SubscribeHeader({ user }: SubscribeHeaderProps) {
  return (
    <Header>
      <HeaderTopBar>
        <HeaderLeft />

        <HeaderCenter />

        <HeaderRight>
          {user ? (
            <AccountAction name={user.name} />
          ) : (
            <>
              <span className="hidden lg:inline text-sm font-semibold text-black">
                Already a subscriber?
              </span>

              <div className="hidden sm:block">
                <SignInButton />
              </div>
            </>
          )}
        </HeaderRight>
      </HeaderTopBar>
    </Header>
  );
}
