// src/components/OpenRoute.tsx
import type { JSX } from 'react';
import { useCheckAuthQuery } from '../feature/auth/authApi';
import { Navigate } from 'react-router-dom';

const OpenRoute = ({ children }: { children: JSX.Element }) => {
  const { data } = useCheckAuthQuery();

  // if (isLoading) return <p>Loading...</p>;

  return data?.isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

export default OpenRoute;
