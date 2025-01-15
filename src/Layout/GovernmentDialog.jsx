import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import signin_ani from "assets/animations/signin.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import pathConstants from "pathConstants"; // Adjust based on your file structure
import { useUser } from "components/context/UserContext"; // Adjust based on your file structure

const GovernmentDialog = ({ visible, onHide }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [username, setUsername] = useState(""); // Username input state
  const [password, setPassword] = useState(""); // Password input state
  const [message, setMessage] = useState(""); // Message to display
  const { setUsername: setUserInContext } = useUser(); // Use context to set username

  const users = [
    {
      username: "admin",
      password: "1234",
    },
    {
      username: "user1",
      password: "user123",
    },
    {
      username: "user2",
      password: "user456",
    },
  ];

  const handleSignIn = async () => {
    // Check if the entered username and password match the hardcoded credentials
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      setMessage("Login successful!");
      setUserInContext(username); // Set username in context
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
