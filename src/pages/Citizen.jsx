import { Button } from "primereact/button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/landingPage/Header";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import Chatbot from "../components/Citizen/Chatbot";
import signin_ani from "../assets/animations/signin.json";
import Lottie from "lottie-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { MuiOtpInput } from "mui-one-time-password-input";
import "../components/Citizen/Citizen.css";
import Laptop from "../assets/laptop.png";
import { Tag } from "primereact/tag";
import Card1 from "../assets/card1.png";
import Card2 from "../assets/card2.png";
import Card3 from "../assets/card3.png";
import Screen from "../assets/screen.png";
import SpaIcon from "@mui/icons-material/Spa";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import Diversity3Icon from "@mui/icons-material/Diversity3";

const Citizen = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [visible, setVisible] = useState(false); // Dialog visibility state
  const [phone, setPhone] = useState(""); // Phone number input state
  const [otp, setOtp] = useState(""); // OTP input state
  const [message, setMessage] = useState(""); // Message to display

  const checkPhoneNumber = async () => {
    try {
      // Remove the country code (first two characters)
      const formattedPhone = phone.startsWith("91") ? phone.slice(2) : phone;

      console.log(formattedPhone); // Log the formatted phone number without country code
      const response = await axios.post(
        "https://api-csi.arahas.com/check/phone",
        {
          phone: formattedPhone, // Send formatted phone without country code
        }
      );
      console.log(response);
      setMessage(response.data.message);

      // Check if the user is registered
      if (response.data.register) {
        // Open the chatbot for registration
        setVisible(false); // Close the dialog

        // Logic to open the chatbot
        // You may need to set a state that triggers the chatbot to open here
      } else {
        // User is registered, ask for OTP
        if (otp === "1234") {
          // Sample OTP check
          navigate("/kyc"); // Navigate to KYC page
        } else {
          setMessage("Invalid OTP. Please try again.");
        }
      }
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Error checking phone number");
      }
    }
  };

  return (
    <div className="flex flex-column w-full">
      {/* Header */}
      <Header />

      <div className="flex flex-column gap-1 align-items-center justify-content-end citizen_bg bg-no-repeat h-screen">
        <div
          className="border-round-xl m-0 mb-5 p-0"
          style={{
            // backgroundColor: "rgba(247, 164, 122, 0.7)",
            background:
              "linear-gradient(to left, rgba(91, 152, 164, 0.8), rgba(15, 75, 87, 0.8))",
            width: "65rem",
          }}
        >
          <h1 className="text-5xl text-white text-center font-medium">
            Explore Your City’s Sustainability Performance With Arahas
          </h1>
          <div className="flex align-items-center justify-content-center w-full flex-row">
            <p className="text-lg text-white mr-2">
              {" "}
              Already a registered citizen?
            </p>
            <Button
              label="Sign in"
              className="bg-theme"
              onClick={() => setVisible(true)}
            />
          </div>
        </div>

        {/* Dialog for entering phone number and OTP */}
        <Dialog
          visible={visible}
          style={{ width: "50rem", textAlign: "center" }}
          onHide={() => setVisible(false)}
        >
          <div className="flex align-items-center justify-content-center flex-row gap-4 ">
            <Lottie
              animationData={signin_ani}
              loop={true}
              className="h-15rem m-0 p-0"
              style={{ width: "50rem" }}
            />
            {/* Phone input using react-phone-input-2 */}
            <div className="flex align-items-center justify-content-center flex-column">
              <h1 className="text-2xl mb-4 m-0 p-0 text-theme">Sign In</h1>
              <PhoneInput
                placeholder="Enter Phone Number"
                value={phone}
                onChange={setPhone} // Directly use the setter function
                country="in" // Set default country to India
                className="phone-input font-semibold"
                style={{ margin: "1rem ", width: "100%" }} // Style for the input
              />

              <div className="w-full">
                <p className=".text-sec-theme text-base font-semibold text-left mt-2 m-0  p-0">
                  Enter OTP
                </p>
                <MuiOtpInput
                  value={otp}
                  onChange={(newValue) => setOtp(newValue)}
                  className="pt-2 mb-4" // Receive value directly
                />
              </div>
              <Button
                label="Submit"
                onClick={checkPhoneNumber}
                className="bg-theme"
              />
              {message && <p>{message}</p>}
            </div>
          </div>
        </Dialog>

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
                overall CSI score into three dimensions—
              </p>
              <br />
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
              <br />
              <p className="text-white text-xl">
                providing clarity on the city’s strengths and areas needing
                improvement.
              </p>
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
