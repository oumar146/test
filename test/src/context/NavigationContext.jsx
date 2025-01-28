import React, { createContext, useContext, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [pathname, setPathname] = useState('/dashboard');

  const navigate = useNavigate();
  const contextValue = useMemo(() => ({
    pathname,
    setPathname: (path) => {
      setPathname(path);
      navigate(path); // Effectue la navigation
    },
  }), [pathname, navigate]);

  return (
    <NavigationContext.Provider value={contextValue}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);

  return context;
};
