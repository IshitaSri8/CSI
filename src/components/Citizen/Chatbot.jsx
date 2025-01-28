import React, { useState, useEffect } from "react";
import MyChatBot from "react-chatbotify";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import chatIcon from "../../assets/Chatbot/Chatbot.svg";
import "../landingPage/Landing.css";
import axios from "axios";
import { useUser } from "components/context/UserContext";

const Chatbot = () => {
  const { setCitizenDetails } = useUser();
  const [form, setForm] = useState({});
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]); // State for filtered cities
  const navigate = useNavigate();

  const submitFormData = async (formData) => {
    try {
      const response = await axios.post(
        "https://api-csi.arahas.com/new/register",
        formData
      );

      if (response.status === 201) {
        console.log("User Registration Successful");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(
        `http://localhost:8010/check-email?email=${email}`
      );
      return response.data.exists;
    } catch (error) {
      console.error("Error checking email existence:", error);
      return false;
    }
  };

  const settings = {
    isOpen: false,
    tooltip: {
      mode: "CLOSE",
      text: "New User? Register Here!",
    },
    botBubble: { showAvatar: false },
    general: {
      primaryColor: "#166c7d",
      secondaryColor: "#166c7d",
      fontFamily: "DM Sans",
      embedded: false,
      desktopEnabled: true,
    },
    header: {
      title: "Arahas Ecobot",
      avatar: chatIcon,
      fontFamily: "DM Sans",
    },
    userBubble: {
      animate: true,
    },
    chatHistory: {
      storageKey: "concepts_settings",
      disabled: true,
    },
  };

  const styles = {
    headerStyle: {
      background: "#166c7d",
      color: "#ffffff",
      fontSize: "2rem",
    },
    chatWindowStyle: {
      backgroundColor: "#f2f2f2",
      fontFamily: "DM Sans",
      fontSize: "0.5rem",
    },
    chatInput: {
      allowNewline: true,
    },
  };

  const fetchStates = async () => {
    const headers = new Headers();
    headers.append(
      "X-CSCAPI-KEY",
      "ZHhIQXNCQ21lTGhub0J4Mk9wRHVNS1FNVWVLNmhkajIyRjdHOWJJSA=="
    );

    try {
      const response = await fetch(
        "https://api.countrystatecity.in/v1/countries/IN/states",
        { headers }
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        data.sort((a, b) => a.name.localeCompare(b.name));
        setStates(data);
      } else {
        console.error("Unexpected response format for states:", data);
      }
    } catch (error) {
      console.log("Error fetching states:", error);
    }
  };

  const fetchCities = async (stateCode) => {
    const headers = new Headers();
    headers.append(
      "X-CSCAPI-KEY",
      "ZHhIQXNCQ21lTGhub0J4Mk9wRHVNS1FNVWVLNmhkajIyRjdHOWJJSA=="
    );

    try {
      const response = await fetch(
        `https://api.countrystatecity.in/v1/countries/IN/states/${stateCode}/cities`,
        { headers }
      );

      const data = await response.json();

      if (Array.isArray(data)) {
        data.sort((a, b) => a.name.localeCompare(b.name));
        setCities(data);
        setFilteredCities(data); // Initialize filtered cities with all cities
      } else {
        console.error("Unexpected response format for cities:", data);
      }
    } catch (error) {
      console.log("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  const flow = {
    start: {
      message: "Hello there! What is your name?",
      function: (params) => setForm({ ...form, name: params.userInput }),
      path: "ask_email",
    },

    ask_email: {
      message: (params) => `Please enter your email address.`,
      function: (params) => setForm({ ...form, email: params.userInput }),
      path: async (params) => {
        const emailRegex = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        const email = params.userInput;

        if (!emailRegex.test(email)) {
          await params.injectMessage("Invalid Email Address!");
          return "ask_email"; // Reask the email question
        }

        const exists = await checkEmailExists(email);
        if (exists) {
          await params.injectMessage(
            "User already exists! Please sign in using your credentials."
          );
          return "thank_you"; // End flow or redirect to sign-in
        }

        return "ask_phone"; // Proceed to the next step if email is valid
      },
    },

    ask_phone: {
      message: "Please enter your phone number (10 digits):",
      function: (params) => setForm({ ...form, phone: params.userInput }),
      path: async (params) => {
        const phone = params.userInput;
        const phoneRegex =
          /^(?:(?:\+|0{0,2})91(\s*|[-])?|[0]?)?([6789]\d{2}([-]?)\d{3}([-]?)\d{4})$/;

        if (!phoneRegex.test(phone)) {
          await params.injectMessage(
            "Invalid phone number! Please enter a valid 10-digit phone number."
          );
          return "ask_phone"; // Reask the phone number question
        }

        return "ask_state"; // Proceed to the next step if the phone number is valid
      },
    },

    ask_state: {
      message: "Which state are you in?",
      options: states.map((state) => state.name), // Display states as options
      function: async (params) => {
        const selectedState = states.find(
          (state) => state.name === params.userInput
        );

        setForm({ ...form, state: selectedState.name });

        return "ask_city_range"; // Proceed to ask for city range after selecting state
      },
    },

    ask_city_range: {
      message: "Select a range of alphabets for city names:",
      options: ["A-F", "G-L", "M-R", "S-Z"],
      function: (params) => {
        setForm({ ...form });
      },
      path: (params) => {
        return "filter_cities"; // Proceed to filter cities based on selected range
      },
    },

    filter_cities: {
      message: (params) => {
        let rangeStart;
        let rangeEnd;

        switch (params.userInput) {
          case "A-F":
            rangeStart = "A";
            rangeEnd = "F";
            break;
          case "G-L":
            rangeStart = "G";
            rangeEnd = "L";
            break;
          case "M-R":
            rangeStart = "M";
            rangeEnd = "R";
            break;
          case "S-Z":
            rangeStart = "S";
            rangeEnd = "Z";
            break;
          default:
            break;
        }

        // Filter cities based on selected range
        const filtered = cities.filter(
          (city) =>
            city.name.charAt(0).toUpperCase() >= rangeStart &&
            city.name.charAt(0).toUpperCase() <= rangeEnd
        );

        setFilteredCities(filtered); // Update filtered cities

        return `Please select a city from ${rangeStart} to ${rangeEnd}:`;
      },
      path: "ask_city", // Proceed to ask city after filtering
    },

    ask_city: {
      message: "Which city are you in?",
      options: (params) => filteredCities.map((city) => city.name), // Display filtered cities as options
      function: (params) => {
        setForm({ ...form, city: params.userInput });
      },
      path: "kyc", // Proceed to KYC step after selecting city
    },

    kyc: {
      message: "Want to know more about your city?",
      options: ["Yes", "No"],
      function: async (params) => {
        console.log(form);
        setCitizenDetails(form);
        await submitFormData(form);
        if (params.userInput.toLowerCase() === "yes") {
          navigate("/citizen/kyc"); // Redirect to KYC page if user says Yes
        }
      },
      path: (params) => {
        if (params.userInput.toLowerCase() === "no") {
          return "thank_you"; // Proceed to Thank You message if No
        }
      },
    },

    thank_you: {
      message: "Have a great day ahead.",
      path: "start", // Reset the flow if needed
    },
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        zIndex: 1000,
        fontSize: "2rem",
      }}
    >
      <MyChatBot settings={settings} flow={flow} styles={styles} />
    </div>
  );
};

export default Chatbot;
