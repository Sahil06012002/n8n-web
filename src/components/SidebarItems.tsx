import { icons } from "lucide-react";
import React, { type ReactNode } from "react";

interface SidebarItemsProps {
  icon: ReactNode;
  title: string;
  isExpended: boolean;
}
export default function SidebarItems(props: SidebarItemsProps) {
  return (
    <div className="mx-2 my-5 flex gap-2">
      {props.icon}
      {props.isExpended ? <div>{props.title}</div> : <div></div>}
    </div>
  );
}
