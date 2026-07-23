import React from "react";
import {
  Header,
  HeaderTopBar,
  HeaderLeft,
  HeaderCenter,
  HeaderRight,
  MenuAction,
  SearchAction,
  SubscribeButton,
  AccountAction,
} from "./Header";

type AccountHeaderUser = {
  name: string;
};

type AccountHeaderProps = {
  user: AccountHeaderUser;
  isSubscriber?: boolean;
};

export function AccountHeader({
  user,
  isSubscriber = false,
}: AccountHeaderProps) {
  return (
    <Header>
      <HeaderTopBar>
        <HeaderLeft>
          <MenuAction />
          <SearchAction />
        </HeaderLeft>

        <HeaderCenter />

        <HeaderRight>
          {!isSubscriber ? <SubscribeButton /> : null}
          <AccountAction name={user.name} />
        </HeaderRight>
      </HeaderTopBar>
    </Header>
  );
}