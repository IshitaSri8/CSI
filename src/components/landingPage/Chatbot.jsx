import React, { useState, useEffect } from "react";
import MyChatBot from "react-chatbotify";
import chatIcon from "../../assets/chat.svg";

const Chatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [form, setForm] = useState({});
  const [states, setStates] = useState([]); // Ensure states is initialized as an empty array
  const [cities, setCities] = useState([]);

  const settings = {
    isOpen: true,
    tooltip: {
      mode: "CLOSE",
      text: "Hey, How Can I help You Today?",
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

      // Ensure data is an array before setting it
      if (Array.isArray(data)) {
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
        console.log(data);
        setCities(data);
      } else {
        console.error("Unexpected response format for cities:", data);
      }
    } catch (error) {
      console.log("Error fetching cities:", error);
    }
  };

  useEffect(() => {
    fetchStates(); // Fetch states when component mounts
  }, []);

  const flow = {
    start: {
      message: "Hello there! What is your name?",
      function: (params) => setForm({ ...form, name: params.userInput }),
      path: "ask_email",
    },
    ask_email: {
      message: (params) =>
        `Nice to meet you ${params.userInput}, Please enter your email address.`,
      function: (params) => setForm({ ...form, email: params.userInput }),
      path: async (params) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const email = params.userInput;

        if (!emailRegex.test(email)) {
          await params.injectMessage("Please enter a valid email address.");
          return "ask_email"; // Reask the email question
        }

        return "ask_phone"; // Proceed to the next step if email is valid
      },
    },
    ask_phone: {
      message: "Please enter your phone number (10 digits):",
      function: (params) => setForm({ ...form, phone: params.userInput }),
      path: async (params) => {
        const phone = params.userInput;
        const phoneRegex = /^\d{10}$/;

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
      function: (params) => {
        const selectedState = states.find(
          (state) => state.name === params.userInput
        );
        if (selectedState) {
          setForm({ ...form, state: selectedState.name });
          fetchCities(selectedState.iso2); // Fetch cities for the selected state
        }
      },
      path: async (params) => {
        return "ask_city";
      },
    },
    ask_city: {
      message: "Which city are you in?",
      options: cities.map((city) => city.name), // Display cities if available
      function: (params) => {
        setForm({ ...form, city: params.userInput });
      },
      path: async (params) => {
        return "ask_questions"; // Proceed to questions after selecting a city
      },
    },
    ask_questions: {
      message: "What do you want to know about CSI?",
      options: [
        "What is the CSI Score of my City?",
        "What is CSI?",
        "What are the benefits of CSI?",
        "Can you provide me with some recent statistics?",
        "How is the CSI score calculated?",
        "What actions can I take to improve my city's CSI score?",
      ],
      function: (params) => {
        const userQuestion = params.userInput;
        let responseMessage;

        switch (userQuestion) {
          case "What is the CSI Score of my City?":
            responseMessage = "The CSI Score of your city is 56.";
            break;
          case "What is CSI?":
            responseMessage =
              "The City Sustainability Index (CSI) is a framework that assesses the environmental, social, and economic sustainability of cities. It helps in understanding urban health and guiding policy decisions.";
            break;
          case "What are the benefits of CSI?":
            responseMessage =
              "The benefits of CSI include informed decision-making for urban planning, enhanced citizen engagement, and improved quality of life through better resource management and environmental protection.";
            break;
          case "Can you provide me with some recent statistics?":
            responseMessage =
              "Sure! Recent statistics show that cities with higher CSI scores have better waste management systems and lower pollution levels.";
            break;
          case "How is the CSI score calculated?":
            responseMessage =
              "The CSI score is calculated based on various indicators including air quality, water quality, waste management, and citizen engagement.";
            break;
          case "What actions can I take to improve my city's CSI score?":
            responseMessage =
              "You can improve your city's CSI score by participating in local environmental initiatives, promoting recycling, and supporting sustainable policies.";
            break;
          default:
            responseMessage = "I'm sorry, I didn't understand that question.";
        }

        params.injectMessage(responseMessage); // Send the response message
        return "thank_you"; // Proceed to thank you message after answering
      },
    },
    thank_you: {
      message:
        "Thank you for providing your details! How can I assist you further?",
      path: "start", // Reset flow or redirect as needed
    },
  };

  return (
    <div>
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
    </div>
  );
};

export default Chatbot;