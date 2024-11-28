import React, { createContext, useState, useEffect } from 'react';

const Context = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : { auth: false, username: '' };
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const loginContext = (username) => {
    const newUser = { username, auth: true };
    setUser(newUser);
  };

  const logoutContext = () => {
    console.log("Logging out...");
    setUser({ username: '', auth: false });
    localStorage.removeItem('user');
  
    console.log("User after logout:", user);
  };
   
  
  return (
    <Context.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
