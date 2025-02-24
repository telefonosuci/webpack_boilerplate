import React, { createContext, useState, useContext } from 'react';

// Creiamo il contesto
export const ThemeContext = createContext();

// Creiamo un provider che gestisce lo stato
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};