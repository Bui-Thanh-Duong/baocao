import { Routes, Route } from 'react-router-dom';
import Login from './Login';

const RouteComponent = () => (
    <Routes>
        <Route path="/login" element={<Login />} />
    </Routes>
);

export default RouteComponent;