import React, { useState } from "react";
import MyChatBot from "react-chatbotify";
import chatIcon from "../../assets/Chatbot/Chatbot.svg";
import "./Landing.css";
import { useEffect } from "react";

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
      fontFamily: "Montserrat",
      embedded: false,
      desktopEnabled: true,
    },
    header: {
      title: "Arahas Ecobot",
      avatar: chatIcon,
      fontFamily: "Montserrat",
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
      fontFamily: "Montserrat",
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
      path: "greeting",
    },
    greeting: {
      message: (params) =>
        `Nice to meet you ${params.userInput}. Would you like to know about CSI?`,
      options: ["Yes", "No"],
      path: (params) => {
        if (params.userInput.toLowerCase() === "yes") {
          return "ask_questions"; // Redirect to KYC page if user says Yes
        } else {
          return "end"; // Proceed to Thank You message if No
        }
      },
    },
    ask_questions: {
      options: unansweredQuestions, // Display only unanswered questions
      function: (params) => {
        const userQuestion = params.userInput;
        let responseMessage;

        switch (userQuestion) {
          case "What is CSI?":
            responseMessage =
              "CSI is a comprehensive solution designed to empower cities with the tools to evaluate and enhance their sustainability performance while addressing pressing issues.";
            break;
          case "How is the CSI score calculated?":
            responseMessage =
              "The CSI score is based on various indicators like air quality, waste management, citizen engagement, transparency and accountability, etc. which come under NSA dimensions.";
            break;
          case "What are the benefits of CSI?":
            responseMessage =
              "CSI contributes to improved city planning, promotes sustainability, and enhances quality of life by enabling better resource management.";
            break;
          case "Can you provide me with some recent statistics?":
            responseMessage =
              "Recent statistics indicate that cities with higher CSI scores have better environmental management systems.";
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
        setUnansweredQuestions((prevQuestions) => {
          const updatedQuestions = prevQuestions.filter(
            (question) => question !== userQuestion
          );

          // Check if there are any unanswered questions left
          return updatedQuestions; // Update state with remaining questions
        });

        // Determine path based on remaining questions
        const remainingQuestions = unansweredQuestions.filter(
          (question) => question !== userQuestion
        );
        return remainingQuestions;
      },
      path: (params) => {
        const remainingQuestions = unansweredQuestions.filter(
          (question) => question !== params.userInput
        );

        return remainingQuestions.length > 0 ? "thank_you" : "end";
      },
    },
    thank_you: {
      message: "Thank you! Would you like to ask another question?",
      options: (params) => {
        if (unansweredQuestions.length > 0) {
          return ["Continue"]; // Show remaining questions
        } else {
          return ["End chat"]; // Option to end chat
        }
      },
      path: (params) => {
        if (params.userInput === "End chat") {
          return "end"; // End the chat
        } else {
          return "ask_questions"; // Go back to ask more questions
        }
      },
    },
    end: {
      message: "Thank you for using Arahas Ecobot. \nHave a great day!",
      chatDisabled: true,
      path: "start", // Reset or restart if needed
    },
  };

  useEffect(() => {
    console.log(unansweredQuestions); // This will log the updated state whenever it changes
  }, [unansweredQuestions]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 10,
        right: 10,
        zIndex: 1000,
        fontSize: "2rem",
      }}
    >
      <MyChatBot settings={settings} flow={flow} styles={styles} />
    </div>
  );
};

export default FAQChatbot;
