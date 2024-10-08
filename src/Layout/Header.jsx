import React, { useState } from "react";
import { Menubar } from "primereact/menubar";
import { Button } from "primereact/button";
import Arahas from "assets/arahas_logo.png";
import { useNavigate, useLocation } from "react-router-dom";
import CitizenDialog from "../components/landingPage/CitizenDialog";
import GovernmentDialog from "../components/landingPage/GovernmentDialog";

const Header = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Get the current route
  const [citizenDialogVisible, setCitizenDialogVisible] = useState(false);
  const [governmentDialogVisible, setGovernmentDialogVisible] = useState(false);

  // Function to check if the menu item is active
  const isActive = (path) => location.pathname === path;

  const itemRenderer = (item) => (
    <div
      className={`flex align-items-center p-menuitem-link }`}
      onClick={item.command}
    >
      <span
        className={`${item.icon}  ${
          isActive(item.path) ? "icon-active" : "text-600"
        }`}
      />
      <p
        className={`ml-2 mr-4 my-2 text-lg font-medium p-0 ${
          isActive(item.path) ? "text-active" : "text-600"
        }`}
      >
        {item.label}
      </p>
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
      label: "CSI for Citizens",
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
    {
      label: "Resources",
      icon: "pi pi-receipt",
      template: itemRenderer,
      command: () => {
        const link = document.createElement("a");
        link.href = "/sample.pdf";
        link.download = "sample.pdf"; // Force download
        link.click();
      },
      // command: () => {
      //   window.open("/example.pptx", "_blank"); // Opens the PPT file in a new tab
      // },
    },
  ];

  // Conditionally render the Sign in button only for '/citizens' and '/government'
  const showSignInButton =
    location.pathname === "/citizens" || location.pathname === "/government";

  // Handle the "Sign in" button click based on the path
  const handleSignInClick = () => {
    if (location.pathname === "/citizens") {
      setCitizenDialogVisible(true);
    } else if (location.pathname === "/government") {
      setGovernmentDialogVisible(true);
    }
  };

  const start = (
    <img className="mr-auto w-3 ml-1" src={Arahas} alt="Arahas Logo" />
  );

  const end = showSignInButton ? (
    <Button
      label="Sign in"
      icon="pi pi-user"
      className="bg-theme p-ml-auto"
      onClick={handleSignInClick}
    />
  ) : null; // Show button only for specific routes

  return (
    <>
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

      {/* Citizen Sign-In Dialog */}
      <CitizenDialog
        visible={citizenDialogVisible}
        onHide={() => setCitizenDialogVisible(false)}
      />

      {/* Government Sign-In Dialog */}
      <GovernmentDialog
        visible={governmentDialogVisible}
        onHide={() => setGovernmentDialogVisible(false)}
      />
    </>
  );
};

export default Header;