import { SetStateAction } from "react";

export interface NavItem {
  key: string;
  href: string;
  icon: React.ReactNode;
}

export interface SidebarContentProps {
  mobile?: boolean;
  locale: string;
  setMobileOpen: (value: SetStateAction<boolean>) => void;
}
