// src/components/PrivateRoute.tsx
import type { JSX } from 'react';
import { useCheckAuthQuery } from '../feature/auth/authApi';
import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  children: JSX.Element;
  allowedRoles?: string[]; 
};

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { data, isLoading, isFetching } = useCheckAuthQuery();

  if (isLoading || isFetching ) return <p>Loading...</p>;

  const isLoggedIn = data?.isAuthenticated;
  const userRole = data?.user?.role;

  //check is user logged in or not
  if(!isLoggedIn) return <Navigate to="/login"/>

  //check for role
  if(allowedRoles && !allowedRoles.includes(userRole)) return <Navigate to="/"/>

  return children;
};

export default PrivateRoute;
