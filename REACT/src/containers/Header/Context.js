import React, { createContext, useState, useEffect } from 'react';

const Context = createContext();

const ContextProvider = ({ children }) => {
  // Lấy thông tin người dùng từ LocalStorage khi khởi tạo
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : { auth: false, username: '' };
  });

  // Lưu thông tin vào LocalStorage mỗi khi user thay đổi
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  // Hàm login: Lưu thông tin đăng nhập vào context và LocalStorage
  const loginContext = (username) => {
    const newUser = { username, auth: true };
    setUser(newUser); // Cập nhật trạng thái user
  };

  // Hàm logout: Xóa thông tin khỏi context và LocalStorage
  const logoutContext = () => {
    setUser({ username: '', auth: false });
    localStorage.removeItem('user'); // Xóa thông tin từ LocalStorage
  };

  return (
    <Context.Provider value={{ user, loginContext, logoutContext }}>
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
