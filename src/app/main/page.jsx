import React from "react";
import Navbar from "../navbar/Navbar";
import LoginPage from "../login/page";
import { Outlet } from "react-router-dom";
import KoiFish from "../Animation/KoiFish";

const Main = () => {
  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <div className="flex-shrink-0">
        <Navbar />
      </div>
      <div className="flex-grow overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
