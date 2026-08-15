import React from "react";
import { Sidebar } from "../Bars/Sidebar";

const SIDEBAR_WIDTH = 280;

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#EFF0F6]">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Page Content */}
      <main
        style={{
          marginLeft: `${SIDEBAR_WIDTH}px`,
          minHeight: "100vh",
        }}
        className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6"
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
