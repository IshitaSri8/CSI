import React from "react";
import Header from "Layout/Header";
import Laptop from "../assets/laptop.png";
import { Tag } from "primereact/tag";
import Screen from "../assets/screen.png";
import SpaIcon from "@mui/icons-material/Spa";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import kyc from "../assets/kyc.png";
import crc from "../assets/Citizen/Report Card.png";
import indicator from "../assets/indicator.png";
import government from "../assets/Citizen/csi for gov.png";
import report_ss from "assets/report_ss.png";
import trend_ss from "assets/trend_ss.png";
import kyc_ss from "assets/kyc_ss.png";
import indicator_ss from "assets/aqi_ss.png";
const Government = () => {
  return (
    <div className="flex flex-column w-full">
      {/* Header */}
      <Header />
      <div className="flex flex-column gap-1 align-items-center justify-content-center h-auto w-screen">
        <img src={government} alt="government" className="w-screen " />
        <div
          className="border-round-xl m-0 mb-5 p-0"
          style={{
            // backgroundColor: "rgba(247, 164, 122, 0.7)",
            background:
              "linear-gradient(to left, rgba(91, 152, 164, 0.8), rgba(15, 75, 87, 0.8))",
            width: "65rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, 160%)",
          }}
        >
          <h1 className="text-4xl text-white font-medium text-center">
            Strengthen Your City's Sustainability Leadership
          </h1>
        </div>
      </div>

      <div className="flex flex-column px-4 align-items-center justify-content-center">
        {/*First Card*/}
        <div className="flex w-full m-4">
          {/* Image Column */}
          <div style={{ flex: "60%", position: "relative" }}>
            <img
              src={kyc}
              alt="Main"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "10px 0 0 10px",
              }}
            />
            <img
              src={Laptop}
              alt="Small"
              style={{
                width: "37rem",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-70%, -50%)",
              }}
            />
            <img
              src={kyc_ss}
              alt="Small"
              style={{
                width: "30rem",
                position: "absolute",
                height: "19rem",
                top: "50%",
                left: "50%",
                transform: "translate(-75%, -55%)",
              }}
            />
          </div>
          {/* Text Column */}
          <div
            className="flex align-items-center justify-content-center p-8"
            style={{
              flex: "40%",
              background: "linear-gradient(to left, #1F8297, #166C7D, #003940)",
              borderRadius: "0 10px 10px 0",
            }}
          >
            <div>
              <p className="text-white text-4xl">Know Your City</p>
              <p className="text-white text-xl">
                Access in-depth information about your city’s demographics and
                current state in critical areas such as water, waste, housing,
                and more. This feature allows officials to get a clear picture
                of where the city stands.
              </p>
            </div>
          </div>
        </div>

        {/*Second Card*/}
        <div className="w-full flex mx-4">
          <div
            className="flex align-items-center justify-content-center p-8"
            style={{
              flex: "40%",
              background: "linear-gradient(to left, #1F8297, #166C7D, #003940)",
              borderRadius: "10px 0 0 10px",
            }}
          >
            <div>
              <p className="text-white text-4xl">City Report Card</p>
              <p className="text-white text-xl mb-1">
                Gain a comprehensive view of the city’s performance with
                detailed city report. This report card allows officials to track
                overall and dimension-specific performance via Nature, Society
                and Administration.
              </p>
              <br />
              {/* <Tag
                className="mr-2 p-2"
                style={{ backgroundColor: "#A1C4CB", color: "#00403C" }}
                icon="pi pi-microsoft"
                value="Dashboard"
              ></Tag>
              <Tag
                className="mr-2 p-2"
                style={{ backgroundColor: "#A1C4CB", color: "#00403C" }}
                icon="pi pi-file-word"
                value="Recommendations"
              ></Tag>
              <Tag
                className="mr-2 p-2"
                style={{ backgroundColor: "#A1C4CB", color: "#00403C" }}
                icon="pi pi-file"
                value="Report"
              ></Tag> */}
            </div>
          </div>

          <div style={{ flex: "60%", position: "relative" }}>
            <img
              src={crc}
              alt="Main"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "0 10px 10px 0",
              }}
            />
            <img
              src={Laptop}
              alt="Small"
              style={{
                width: "37rem",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            <img
              src={report_ss}
              alt="Small"
              style={{
                width: "30rem",
                position: "absolute",
                height: "19rem",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -55%)",
              }}
            />
          </div>
        </div>

        {/*Third Card*/}
        <div className="flex w-full m-4">
          {/* Image Column */}
          <div style={{ flex: "60%", position: "relative" }}>
            <img
              src={indicator}
              alt="Main"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "10px 0 0 10px",
              }}
            />
            <img
              src={Laptop}
              alt="Small"
              style={{
                width: "37rem",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
            <img
              src={indicator_ss}
              alt="Small"
              style={{
                width: "30rem",
                position: "absolute",
                height: "19rem",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -55%)",
              }}
            />
          </div>
          {/* Text Column */}
          <div
            className="flex align-items-center justify-content-center p-8"
            style={{
              flex: "40%",
              background: "linear-gradient(to left, #1F8297, #166C7D, #003940)",
              borderRadius: "0 10px 10px 0",
            }}
          >
            <div>
              <p className="text-white text-4xl">Indicator Performance</p>
              <Tag
                className="mr-2 p-2"
                style={{ backgroundColor: "#5B98A4", color: "#00403C" }}
              >
                <SpaIcon
                  style={{
                    fontSize: "1rem",
                    marginRight: "0.5rem",
                    color: "#00403C",
                  }}
                />
                Nature
              </Tag>
              <Tag
                className="mr-2 p-2"
                style={{ backgroundColor: "#5B98A4", color: "#00403C" }}
              >
                <Diversity3Icon
                  style={{
                    fontSize: "1rem",
                    marginRight: "0.5rem",
                    color: "#00403C",
                  }}
                />
                Society
              </Tag>
              <Tag
                className="mr-2 p-2"
                style={{ backgroundColor: "#5B98A4", color: "#00403C" }}
              >
                <AccountBalanceIcon
                  style={{
                    fontSize: "1rem",
                    marginRight: "0.5rem",
                    color: "#00403C",
                  }}
                />
                Administration
              </Tag>
              <p className="text-white text-xl">
                Dive deeper into the data by viewing the performance of
                individual indicators within each dimension. This feature helps
                government authorities pinpoint specific areas that need
                attention or improvement.
              </p>
              <Tag
                className="mr-2 p-2"
                style={{ backgroundColor: "#A1C4CB", color: "#00403C" }}
                icon="pi pi-microsoft"
                value="Dashboard"
              ></Tag>
              <Tag
                className="mr-2 p-2"
                style={{ backgroundColor: "#A1C4CB", color: "#00403C" }}
                icon="pi pi-file-word"
                value="Recommendations"
              ></Tag>
              <Tag
                className="mr-2 p-2"
                style={{ backgroundColor: "#A1C4CB", color: "#00403C" }}
                icon="pi pi-file"
                value="Report"
              ></Tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Government;
