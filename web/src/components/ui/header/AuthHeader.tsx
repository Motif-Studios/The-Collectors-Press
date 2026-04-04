import React from "react";
import {
  Header,
  HeaderTopBar,
  HeaderLeft,
  HeaderCenter,
  HeaderRight,
} from "./Header";

export function AuthHeader() {
  return (
    <Header user={null} isSubscriber={false}>
      <HeaderTopBar>
        <HeaderLeft>{null}</HeaderLeft>
        <HeaderCenter />
        <HeaderRight>{null}</HeaderRight>
      </HeaderTopBar>
    </Header>
  );
}
