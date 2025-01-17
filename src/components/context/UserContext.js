// UserContext.js
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [citizenDetails, setCitizenDetails] = useState({});

  return (
    <UserContext.Provider
      value={{ username, setUsername, citizenDetails, setCitizenDetails }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
