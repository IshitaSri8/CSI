import React from "react";
import arahas_logo from "../assets/arahas_logo.png";
import { Button } from "primereact/button";
const HeaderLogout = () => {
  return (
    <div className="flex align-items-center justify-content-between flex-row p-2 shadow-3">
      <img src={arahas_logo} className="h-2rem w-6rem" alt="logo" />
      <Button label="Logout" className="surface-500" />
    </div>
  );
};

export default HeaderLogout;
