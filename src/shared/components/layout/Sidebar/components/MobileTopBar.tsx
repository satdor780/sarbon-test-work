"use client";

import { Bell, Menu, User } from "lucide-react";

interface MobileTopBarProps {
  onMenuClick: () => void;
}

export function MobileTopBar({ onMenuClick }: MobileTopBarProps) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-white border-b border-border flex items-center px-4 gap-3">
        <button
          onClick={onMenuClick}
          className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent transition-colors"
        >
          <Menu size={20} />
        </button>
        <div className="flex-1" />
        <button className="relative text-muted-foreground hover:text-foreground transition-colors">
          <Bell size={18} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
          <User size={14} />
        </div>
      </header>
      {/* Spacer */}
      <div className="h-14" />
    </>
  );
}
