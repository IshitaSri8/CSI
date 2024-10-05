import { Button } from "primereact/button";
import React, { useState } from "react";
import { Card } from "primereact/card";
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
import citizen_bg_img from "../assets/Citizen/citizen_bg.png";

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
      const response = await axios.post("http://localhost:8009/check/phone", {
        phone: formattedPhone, // Send formatted phone without country code
      });
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
  const CardImageLeft = ({
    cardTitle,
    cardBody,
    cardBackgroundImage,
    cardImage,
  }) => {
    <Card className="w-full">
      <div className="flex align-items-center justify-content-center flex-row">
        <div className="card1 flex align-items-center justify-content-center">
          <img src></img>
        </div>
      </div>
    </Card>;
  };
  return (
    <div className="flex flex-column w-full">
      {/* Header */}
      <Header />

      {/* Add top padding to avoid overlap with fixed header */}
      <div>
        <div className="flex flex-column gap-1 align-items-center justify-content-end citizen_bg bg-no-repeat w-full h-screen">
          <div
            className="border-round-xl m-0 mb-5 p-0"
            style={{
              background:
                "linear-gradient(to right, rgba(242, 103, 33, 0.8), rgba(247, 164, 122, 0.8))",
              width: "65rem",
            }}
          >
            <h1 className="text-5xl text-third-theme text-center">
              Explore Your City’s Sustainability Performance With Arahas’s CSI
            </h1>
            <div className="flex align-items-center justify-content-center w-full flex-row gap-1">
              <h1 className="text-lg"> Already a registered citizen?</h1>
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
      </div>
    </div>
  );
};

export default Citizen;
