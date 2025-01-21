import React, { useState } from "react";
import MyChatBot from "react-chatbotify";
import chatIcon from "../../assets/Chatbot/Chatbot.svg";
import "./Landing.css";

const FAQChatbot = () => {
  const [form, setForm] = useState({});
  const [unansweredQuestions, setUnansweredQuestions] = useState([
    "What is CSI?",
    "How is the CSI score calculated?",
    "What are the benefits of CSI?",
    "Can you provide me with some recent statistics?",
    "How can I improve my city's CSI score?",
  ]);

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
      storageKey: "faq_settings",
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

  const flow = {
    start: {
      message: "Hello there! What is your name?",
      function: (params) => setForm({ ...form, name: params.userInput }),
      path: "ask_questions",
    },
    ask_questions: {
      message: (params) =>
        `Nice to meet you ${params.userInput}. What would you like to know about CSI?`,
      options: unansweredQuestions, // Display only unanswered questions
      function: (params) => {
        const userQuestion = params.userInput;
        let responseMessage;

        switch (userQuestion) {
          case "What is CSI?":
            responseMessage =
              "The City Sustainability Index (CSI) assesses the environmental, social, and economic sustainability of cities. It guides urban policy decisions.";
            break;
          case "How is the CSI score calculated?":
            responseMessage =
              "The CSI score is based on indicators like air quality, waste management, water quality, and citizen engagement.";
            break;
          case "What are the benefits of CSI?":
            responseMessage =
              "CSI helps improve city planning, promote sustainability, and enhance the quality of life by managing resources better.";
            break;
          case "Can you provide me with some recent statistics?":
            responseMessage =
              "Recent stats indicate cities with higher CSI scores have better environmental management systems.";
            break;
          case "How can I improve my city's CSI score?":
            responseMessage =
              "You can participate in local environmental activities, support sustainable policies, and encourage recycling.";
            break;
          default:
            responseMessage = "I'm sorry, I didn't understand that question.";
        }

        params.injectMessage(responseMessage); // Send the response message

        // Remove the answered question from unansweredQuestions
        setUnansweredQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question !== userQuestion)
        );

        // Check if there are any unanswered questions left
        if (unansweredQuestions.length > 1) {
          return "thank_you"; // Proceed to thank you step
        } else {
          return "end"; // End the chat if no more questions
        }
      },
    },
    thank_you: {
      message: "Thank you! Would you like to ask another question?",
      options: (params) => {
        if (unansweredQuestions.length > 0) {
          return unansweredQuestions; // Show remaining questions
        } else {
          return ["End chat"]; // Option to end chat
        }
      },
      function: (params) => {
        if (params.userInput === "End chat") {
          return "end"; // End the chat
        } else {
          return "ask_questions"; // Go back to ask more questions
        }
      },
    },
    end: {
      message: "Thank you for using Arahas Ecobot. Have a great day!",
      path: "start", // Reset or restart if needed
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

export default FAQChatbot;
