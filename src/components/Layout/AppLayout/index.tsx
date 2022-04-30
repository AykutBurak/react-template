import React from "react";
import { Wrapper, WrapperVariant } from "components/Wrapper";
import { NavBar } from "./NavBar";

interface AppLayoutProps {
  variant?: WrapperVariant;
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, variant }) => {
  return (
    <>
      <NavBar />
      <Wrapper variant={variant}>{children}</Wrapper>
    </>
  );
};
