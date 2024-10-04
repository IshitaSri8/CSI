import React from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import Arahas from "../../assets/arahas_logo.png";
import { useNavigate, useLocation } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Get the current route

  // Function to check if the menu item is active
  const isActive = (path) => location.pathname === path;

  const itemRenderer = (item) => (
    <div
      className={`flex align-items-center p-menuitem-link }`}
      onClick={item.command}
    >
      <span
        className={`${item.icon}  ${
          isActive(item.path) ? "icon-active" : "text-theme"
        }`}
      />
      <h1
        className={`ml-2 mr-4 my-3 text-lg p-0 ${
          isActive(item.path) ? "text-active" : "text-grey"
        }`}
      >
        {item.label}
      </h1>
    </div>
  );

  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      template: itemRenderer,
      path: "/",
      command: () => navigate("/"),
    },
    {
      label: "CSI for citizens",
      icon: "pi pi-cog",
      template: itemRenderer,
      path: "/citizens",
      command: () => navigate("/citizens"),
    },
    {
      label: "CSI for Government",
      icon: "pi pi-envelope",
      template: itemRenderer,
      path: "/government",
      command: () => navigate("/government"),
    },
    {
      label: "About Us",
      icon: "pi pi-info-circle",
      template: itemRenderer,
      // path: "/aboutus",
      command: () => {
        window.location.href = "https://arahas.com/"; // External redirect
      },
    },
    {
      label: "Our Work",
      icon: "pi pi-envelope",
      template: itemRenderer,
      // path: "/ourwork",
      command: () => {
        window.location.href = "https://ayodhya.arahas.com/"; // External redirect
      },
    },
  ];

  const start = (
    <img className="mr-auto w-3 ml-1" src={Arahas} alt="Arahas Logo" />
  );

  const end = (
    <Button label="Sign in" icon="pi pi-user" className="bg-theme p-ml-auto" />
  );

  return (
    <Menubar
      model={items}
      start={start}
      end={end}
      className="flex sec-theme align-items-center "
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 1000,
      }}
    />
  );
};

export default Header;
