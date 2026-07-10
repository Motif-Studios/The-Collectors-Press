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
  isSubscriber: boolean;
};

export function SubscribeHeader({ user, isSubscriber }: SubscribeHeaderProps) {
  return (
    <Header>
      <HeaderTopBar>
        <HeaderLeft />

        <HeaderCenter />

        <HeaderRight>
          {user ? (
            <AccountAction name={user.name} isSubscriber={isSubscriber}/>
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
