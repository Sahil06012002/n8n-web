import React, { useState } from "react";
import { ChevronLeft, House, icons, ChevronRight } from "lucide-react";
import { User } from "lucide-react";
import { Cloud } from "lucide-react";
import { Bell } from "lucide-react";
import SidebarItems from "../components/SidebarItems";

export default function Sidebar() {
  const [isExpended, setIsExpended] = useState(true);
  const sidebarItems = [
    {
      icon: <House />,
      title: "Overview",
    },
    {
      icon: <User />,
      title: "Personal",
    },
    {
      icon: <Cloud />,
      title: "Admin Panel",
    },
    {
      icon: <Bell />,
      title: "What's New",
    },
  ];

  function onToggleClick() {
    setIsExpended(!isExpended);
  }
  return (
    <div className="relative h-screen border-r-1 border-zinc-500 px-4">
      {sidebarItems.map((sidebarItem) => {
        return (
          <SidebarItems
            icon={sidebarItem.icon}
            title={sidebarItem.title}
            isExpended={isExpended}
          />
        );
      })}
      <button
        onClick={onToggleClick}
        className="absolute top-1/2 right-0 bg-stone-700 border-1 border-zinc-500 rounded-xl -translate-y-1/2 translate-x-1/2"
      >
        {isExpended ? (
          <ChevronLeft className="h-5 w-5" />
        ) : (
          <ChevronRight className="h-5 w-5" />
        )}
      </button>
    </div>
  );
}
