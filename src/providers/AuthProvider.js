import React, { createContext } from 'react';

export const AuthContext = createContext();

// Demo mode: auth disabled — always treat user as signed in
export const AuthProvider = ({ children }) => {
  const login = async () => {};
  const logout = () => {};

  return (
    <AuthContext.Provider value={{ authToken: 'demo', login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
