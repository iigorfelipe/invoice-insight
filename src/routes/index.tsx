import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/home';
import UserDetails from '../pages/userDetail.tsx';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user/:idCliente" element={<UserDetails />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
