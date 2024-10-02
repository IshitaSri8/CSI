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
    <a
      className={`flex align-items-center p-menuitem-link  ${
        isActive(item.path) ? "text-active" : "text-theme"
      }`}
      onClick={item.command}
    >
      <span className={`${item.icon} text-theme`} />
      <span className="mx-2 text-theme font-semibold text-lg">
        {item.label}
      </span>
    </a>
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
      path: "/aboutus",
      command: () => navigate("/aboutus"),
    },
    {
      label: "Our Work",
      icon: "pi pi-envelope",
      template: itemRenderer,
      path: "/ourwork",
      command: () => navigate("/ourwork"),
    },
  ];

  const start = (
    <img className="mr-auto w-3" src={Arahas} alt="Arahas Logo" />
  );

  const end = (
    <Button label="Sign in" icon="pi pi-user" className="bg-theme p-ml-auto" />
  );

  return (
    <Menubar
      model={items}
      start={start}
      end={end}
      className="flex p-shadow-3 bg-white gap-8"
      style={{ position: "fixed", top: 0, width: "100%", zIndex: 1000 }}
    />
  );
};

export default Header;
