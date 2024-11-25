import { Routes, Route } from 'react-router-dom';
import Login from '../containers/pages/Login.js';

const RouteComponent = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
  </Routes>
);

export default RouteComponent;