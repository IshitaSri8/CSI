import React from "react";
import Header from "../components/landingPage/Header";
import Chatbot from "../components/Citizen/Chatbot";
import Laptop from "../assets/laptop.png";
import { Tag } from "primereact/tag";
import Card1 from "../assets/card1.png";
import Card2 from "../assets/card2.png";
import Card3 from "../assets/card3.png";
import Screen from "../assets/screen.png";
import SpaIcon from "@mui/icons-material/Spa";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import citizen from "../assets/citizen_bg.jpg";

const Citizen = () => {
  return (
    <div className="flex flex-column w-full overflow-x-hidden">
      {/* Header */}
      <Header />

      <div className="flex flex-column gap-1 align-items-center justify-content-center h-auto w-screen">
        <img src={citizen} alt="citizen" className="w-screen " />
        <div
          className="border-round-xl m-0 mb-5 p-0"
          style={{
            // backgroundColor: "rgba(247, 164, 122, 0.7)",
            background:
              "linear-gradient(to left, rgba(91, 152, 164, 0.8), rgba(15, 75, 87, 0.8))",
            width: "70rem",
            position: "absolute",
            top: "65%",
            left: "50%",
            transform: "translate(-50%, 160%)",
          }}
        >
          <h1 className="text-5xl text-white text-center font-medium">
            Explore Your City’s Sustainability Performance With Arahas' CSI
          </h1>
          {/* <div className="flex align-items-center justify-content-center w-full flex-row">
            <p className="text-lg text-white mr-2">
              {" "}
              Already a registered citizen?
            </p>
            <Button
              label="Sign in"
              className="bg-theme"
              onClick={() => setVisible(true)}
            />
          </div> */}
        </div>

        {/* Chatbot component */}
        <Chatbot />
      </div>

      <div className="flex flex-column px-4 align-items-center justify-content-center">
        {/*First Card*/}
        <div className="flex w-full m-4">
          {/* Image Column */}
          <div style={{ flex: "60%", position: "relative" }}>
            <img
              src={Card1}
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
              src={Screen}
              alt="Small"
              style={{
                width: "30rem",
                position: "absolute",
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
                Get an overview of your city's demographics, including
                population, infrastructure, and services. Learn how your city
                performs in key areas like water management, waste disposal,
                housing, and more.
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
              <p className="text-white text-4xl">CSI Score</p>
              <p className="text-white text-xl mb-1">
                View your city's sustainability performance with an
                easy-to-understand report card. This section breaks down the
                overall CSI score into three dimensions— Nature, Society, and
                Administration providing clarity on the city’s strengths and
                areas needing improvement.
              </p>

              {/* <Tag
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
              </Tag> */}
              <br />
              <p className="text-white text-xl"></p>
            </div>
          </div>

          <div style={{ flex: "60%", position: "relative" }}>
            <img
              src={Card2}
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
              src={Screen}
              alt="Small"
              style={{
                width: "30rem",
                position: "absolute",
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
              src={Card3}
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
              src={Screen}
              alt="Small"
              style={{
                width: "30rem",
                position: "absolute",
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
              <p className="text-white text-4xl">City Trends</p>
              <p className="text-white text-xl">
                Discover how your city has progressed over time. This feature
                allows you to explore past trends in sustainability, showing
                whether improvements have been made in key areas over months or
                years.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Citizen;
