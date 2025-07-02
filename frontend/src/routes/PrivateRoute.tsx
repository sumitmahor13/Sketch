// src/components/PrivateRoute.tsx
import type { JSX } from 'react';
import { useCheckAuthQuery } from '../feature/auth/authApi';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { data, isLoading } = useCheckAuthQuery();

  // if (isLoading) return <p>Loading...</p>;

  return data?.isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
