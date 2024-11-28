import { Outlet } from 'react-router-dom';
import Header from './containers/Header/header';
import Menu from './containers/menu/menu';
import Footer from './containers/footer/footer';
import { ContextProvider } from './containers/Header/Context';
import './containers/css/style.css'; // Đảm bảo file tồn tại

function App() {
  
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