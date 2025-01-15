import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import signin_ani from "assets/animations/signin.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import pathConstants from "pathConstants";

const GovernmentDialog = ({ visible, onHide }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [username, setUsername] = useState(""); // Username input state
  const [password, setPassword] = useState(""); // Password input state
  const [message, setMessage] = useState(""); // Message to display

   const defaultUsername = "admin"; 
   const defaultPassword = "2024";

  const handleSignIn = async () => {
    // Check if the entered username and password match the hardcoded credentials
    if (username === defaultUsername && password === defaultPassword) {
      setMessage("Login successful!");
      navigate(pathConstants.KYC); // Navigate to the KYC page upon successful login
    } else {
      setMessage("Invalid username or password. Please try again.");
    }
  };

  return (
    <Dialog
      visible={visible}
      style={{ width: "40rem", textAlign: "center" }}
      onHide={onHide}
    >
      <div className="flex align-items-center justify-content-center flex-row gap-2">
        <Lottie
          animationData={signin_ani}
          loop={true}
          className="h-15rem m-0 p-0"
          style={{ width: "20rem" }}
        />

        {/* Username and Password input fields */}
        <div className="flex align-items-center justify-content-center flex-column">
          <h1 className="text-2xl mb-6 m-0 p-0 text-theme">Sign In</h1>

          {/* Username input */}
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update state with input value
            className="p-inputtext w-full mb-3"
            style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
          />

          {/* Password input */}
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update state with input value
            className="p-inputtext w-full mb-3"
            style={{ width: "100%", padding: "0.5rem", fontSize: "1rem" }}
          />

          {/* Submit Button */}
          <Button label="Submit" onClick={handleSignIn} className="bg-theme" />

          {/* Display message */}
          {message && <p>{message}</p>}
        </div>
      </div>
    </Dialog>
  );
};

export default GovernmentDialog;
