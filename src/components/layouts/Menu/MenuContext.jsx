// context/MenuContext.js
import React, { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export function useMenu() {
  return useContext(MenuContext);
}

export const MenuProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MenuContext.Provider value={{ isOpen, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};
