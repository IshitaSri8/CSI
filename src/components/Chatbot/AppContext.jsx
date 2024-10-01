import React from "react";
import { createContext, useState, useContext } from "react";
import { steps } from "./Steps";
 
const AppContext = createContext();
 
export const AppProvider = ({ children }) => {
  const [chats, setChats] = useState([steps[1]]);
  const [formDisabled, setFormDisabled] = useState(false);
  const [clientDetails, setClientDetails] = useState([]);
 
  return (
    <AppContext.Provider
      value={{
        chats,
        setChats,
        formDisabled,
        setFormDisabled,
        clientDetails,
        setClientDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
 
export const useAppContext = () => {
  return useContext(AppContext);
};