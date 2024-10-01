import React from "react";
import { useState, useEffect, useRef } from "react";
import styles from "./TextArea.module.css";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Chip } from "@mui/material";
import User from "../../../assets/Chatbot/user.svg";
import Bot from "../../../assets/Chatbot/chat.svg";
import { steps } from "../Steps";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import LoadingChip from "./LoadingChip";
import sendClientDetails from "../chatbot Functions/sendClientDetails";
 
const TextArea = ({ active, props }) => {
  const [chats, setChats] = useState([steps[1]]);
  const [formDisabled, setFormDisabled] = useState(false);
  const [clientDetails, setClientDetails] = useState({});
  const divRef = useRef(null);
  const inputRef = useRef(null);
 
  const errorMessage = {
    message: "Sorry, some error has occurred. Please try again later.",
    id: "error",
    trigger: {
      default: -1,
    },
    action: 0,
  };
 
  useEffect(() => {
    if (!formDisabled) {
      inputRef.current.focus();
    }
  }, [formDisabled]);
 
  useEffect(() => {
    // Scroll to the end of the div
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [chats]);
 
  const showChats = () => {
    return chats.map((chat, index) => {
      const isBot = chat.id === "bot";
      const chatContainerClass = isBot
        ? styles.botChatContainer
        : styles.userChatContainer;
 
      const temp =
        isBot && typeof chat.message === "string"
          ? chat.message.split(".")
          : [chat.message];
 
      const values = chat.values;
      const valueList = values
        ? values.map((value, idx) => (
            <form
              onSubmit={handleReply}
              style={{
                padding: "1%",
              }}
              key={"values" + idx}
            >
              <input type="hidden" name="values" value={value} />
              <button
                type="submit"
                disabled={chats[chats.length - 1].index !== chat.index}
                style={{ padding: 0, border: "none", background: "none" }}
              >
                <Chip
                  label={value}
                  clickable={chats[chats.length - 1].index === chat.index}
                  color={"default"}
                  variant="outlined"
                  className={styles.messageChip}
                />
              </button>
            </form>
          ))
        : null;
 
      return (
        <div className={chatContainerClass} key={"chatContainer" + index}>
          <div className={isBot ? styles.bot : styles.transparent}>
            <img
              src={Bot}
              alt="bot avatar"
              style={{ width: "auto", height: "38px" }}
            />
          </div>
 
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, ease: [0, 0.71, 0.2, 1.01] }}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            {temp.map((singleChat, idx) => (
              <Chip
                label={singleChat}
                color="default"
                className={clsx(styles.messageChip, {
                  [styles.botMessageChip]: isBot, // Apply new class for bot messages
                })}
                key={`chip-${idx}`}
              />
            ))}
 
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                width: "100%",
                gap: "1%",
                justifyContent: "center",
              }}
            >
              {valueList}
            </div>
          </motion.div>
          <div className="flex bg-green-100"></div>
          <div
            className={
              !isBot && chats[index - 1].id !== "user"
                ? styles.user
                : styles.transparent
            }
          >
            <img
              src={User}
              alt="user avatar"
              style={{ width: "auto", height: "35px" }}
            />
          </div>
        </div>
      );
    });
  };
 
  const handleReply = async (e) => {
    e.preventDefault();
    const replyMessage = e.target.elements.reply
      ? e.target.elements.reply.value.trim()
      : e.target.elements.values.value.trim();
 
    if (replyMessage && replyMessage !== " ") {
      setChats((chats) => [...chats, { message: replyMessage, id: "user" }]);
      setTimeout(() => messageProvider(replyMessage), 300);
 
      // Collecting client details based on bot prompts
      const currentStep = chats[chats.length - 1];
 
      switch (currentStep.index) {
        case 1: // Name
          setClientDetails((prev) => ({ ...prev, name: replyMessage }));
          break;
        case 4: // Email
          setClientDetails((prev) => ({ ...prev, email: replyMessage }));
          break;
        case 6: // Phone
          setClientDetails((prev) => ({ ...prev, phone: replyMessage }));
          break;
        case 8: // State
          console.log("Setting state:", replyMessage); // Log the input
          setClientDetails((prev) => ({ ...prev, state: replyMessage }));
          break;
        case 9: // City
          console.log("Setting city:", replyMessage); // Log the input
          setClientDetails((prev) => ({ ...prev, city: replyMessage }));
          break;
        default:
          break;
      }
 
      // Log the current client details for debugging
      console.log("Current client details:", clientDetails);
 
      if (e.target.elements.reply) e.target.elements.reply.value = "";
    }
  };
 
  const updateBotChat = (newReply) => {
    setChats((chats) => [...chats.slice(0, -1), newReply]);
  };
 
  const messageProvider = async (reply) => {
    const tempChat = {
      message: <LoadingChip />,
      id: "bot",
    };
 
    const triggerElement = chats.length - 1;
    let triggerValue;
    let addChat;
 
    // Determine the appropriate action based on user reply
    if (chats[triggerElement].check) {
      if (
        chats[triggerElement].check instanceof RegExp &&
        chats[triggerElement].check.test(reply)
      ) {
        triggerValue = "approved";
      }
    } else {
      triggerValue = reply.toLowerCase().split(" ")[0];
    }
 
    const trigger = chats[triggerElement].trigger[triggerValue]
      ? chats[triggerElement].trigger[triggerValue]
      : chats[triggerElement].trigger.default;
 
    addChat = steps[trigger] || errorMessage; // Ensure valid step exists
 
    setChats((chats) => [...chats, tempChat]);
 
    if (addChat) {
      switch (addChat.action) {
        case -1:
          // Send client details to the backend
          const dataSent = await sendClientDetails(clientDetails);
          setFormDisabled(true);
          if (!dataSent) addChat = errorMessage;
          break;
        default:
          break;
      }
 
      setFormDisabled(
        addChat.values || addChat.id === "error" || addChat.action === -1
      );
 
      setTimeout(() => {
        updateBotChat(addChat);
        // Removed the redundant state and city updates from here
      }, 700);
    } else {
      setFormDisabled(false);
    }
  };
 
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: "green", fontSize: "1px" }}
    >
      <div
        ref={divRef}
        className={clsx(styles.textArea, { [styles.flex]: active })}
      >
        {showChats()}
      </div>
 
      <form
        onSubmit={handleReply}
        className={clsx(styles.form, { [styles.flex]: active })}
        style={{ borderColor: formDisabled ? "red" : "orange" }}
      >
        <input
          autoFocus
          type="text"
          disabled={formDisabled}
          name="reply"
          className={styles.reply}
          ref={inputRef}
        />
        <button
          type="submit"
          disabled={formDisabled}
          className={styles.replyButton}
        >
          <SendRoundedIcon />
        </button>
      </form>
    </div>
  );
};
 
TextArea.propTypes = {};
 
export default TextArea;
 