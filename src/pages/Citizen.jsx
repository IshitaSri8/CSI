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

const Citizen = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [visible, setVisible] = useState(false); // Dialog visibility state
  const [phone, setPhone] = useState(""); // Phone number input state
  const [otp, setOtp] = useState(""); // OTP input state
  const [message, setMessage] = useState(""); // Message to display

  const checkPhoneNumber = async () => {
    try {
      console.log(phone);
      const response = await axios.post("http://localhost:8009/check/phone", {
        phone,
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

  return (
    <div className="flex flex-column w-full">
      {/* Header */}
      <Header />

      {/* Add top padding to avoid overlap with fixed header */}
      <div>
        <div className="flex flex-column gap-1 mt-8 align-items-center p-4">
          <h1 className="text-4xl text-theme">
            City Sustainability Index for Citizens
          </h1>
          <div className="flex align-items-center justify-content-center w-full flex-row gap-1">
            <h1 className="text-lg"> Already a registered citizen?</h1>
            <Button
              label="Sign in"
              className="bg-theme"
              onClick={() => setVisible(true)}
            />
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
                className="h-15rem w-20rem m-0 p-0 "
              />
              {/* Phone input using react-phone-input-2 */}
              <div className="flex align-items-center justify-content-center flex-column">
                <h1 className="text-2xl mb-4 m-0 p-0 text-theme">Sign In</h1>
                <PhoneInput
                  placeholder="Enter Phone Number"
                  value={phone}
                  onChange={setPhone} // Directly use the setter function
                  country="in" // Set default country to India
                  className="phone-input"
                  style={{ margin: "1rem ", width: "100%" }} // Style for the input
                />
                <input
                  type="text"
                  placeholder="Enter OTP (Sample: 1234)"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  style={{
                    marginBottom: "1rem",
                    width: "100%",
                    padding: "8px",
                  }}
                />
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
