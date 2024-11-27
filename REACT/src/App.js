import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './containers/Header/header';
import Menu from './containers/menu/menu';
import Footer from './containers/footer/footer';
import { ContextProvider } from './containers/Header/Context';
import axios from 'axios';
import './containers/css/style.css';
import { Link } from 'react-router-dom';

function App() {
  const [message, setMessage] = useState('');  // State để lưu thông điệp từ API

  // Gọi API từ Node.js khi component được mount
  useEffect(() => {
    axios.get('http://localhost:3000/api/hello')
      .then(response => {
        console.log('Response from API:', response);  // Kiểm tra phản hồi từ API
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Có lỗi xảy ra:', error);  // Kiểm tra lỗi
      });

  }, []);
  
  return (
    <ContextProvider>
      <div>
        <Header />
        <div className='header'>
          <Menu />
        </div>
        <div className='outlet'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </ContextProvider>
  );
}

export default App;
