import { Outlet } from 'react-router-dom';
import Header from './containers/Header/header';
import Footer from './containers/footer/footer';
import { ContextProvider } from './containers/Header/Context';
import './containers/css/style.css';

function App() {
  
  return (
    <ContextProvider>
      <div>
        <Header />
        <div className='outlet'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </ContextProvider>
  );
}

export default App;