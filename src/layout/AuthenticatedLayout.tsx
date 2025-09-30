import React from "react";
import Sidebar from "./Sidebar";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-zinc-700 text-white w-screen">
      <Sidebar></Sidebar>
      {children}
    </div>
  );
}
