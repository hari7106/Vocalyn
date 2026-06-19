"use client";

import { createContext, useContext } from "react";

export const UserDetailContext = createContext(null);

export const useUser = () => {
  const context = useContext(UserDetailContext);
  if (!context) {
    throw new Error("useUser must be used inside Provider");
  }
  return context;
};
