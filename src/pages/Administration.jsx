import React from "react";
import admin from "assets/Report/Admin.svg";
import { Card } from "primereact/card";

const Administration = () => {
  return (
    <div className="flex p-3">
      <Card>
        <div className="flex">
          <div className="flex flex-column align-items-start gap-2">
            <p className="text-xl font-medium text p-0 m-0">Administration</p>
            <p className="text-4xl font-bold text-secondary2 p-0 m-0">80</p>
          </div>
          <div className="flex align-items-start justify-content-end ml-5">
            <img src={admin} alt="admin" className="w-4rem" />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Administration;
