"use client";

import { createContext, useContext, useState, useEffect } from "react";
import {
  getUser,
  signInWithGoogle,
  signOutWithGoogle,
} from "../actions/googleAction";

const UserContext = createContext({
  user: { name: "", image: "", email: "" },
  login: async () => {},
  logout: async () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUser(userData);
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, login: signInWithGoogle, logout: signOutWithGoogle }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
