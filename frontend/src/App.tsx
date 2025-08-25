import { lazy, Suspense, useEffect } from "react";
import type { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loader from "./components/common/Loader";
import OpenRoute from "./routes/OpenRoute";
import PrivateRoute from "./routes/PrivateRoute";
import UserDashboard from "./pages/UserDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { useCheckAuthQuery } from "./feature/auth/authApi";
import { useDispatch } from "react-redux";
import { clearUser, setAuth, setUser } from "./feature/auth/authSlice";
import ForgetPassword from "./pages/auth/ForgetPassword";
import VerifyOTP from "./pages/auth/VerifyOTP";
import ResetPassword from "./pages/auth/ResetPassword";

const Home = lazy(() => import("./pages/Home"));
const Register: FC = lazy(() => import("./pages/auth/Register"));
const Login: FC = lazy(() => import("./pages/auth/Login"));
const Cart: FC = lazy(() => import("./pages/Cart"))
const Profile: FC = lazy(() => import("./pages/Profile"))

function App() {
  const dispatch = useDispatch();
  const { data, isError } = useCheckAuthQuery();

    useEffect(() => {
      if (data?.user) {
        dispatch(setUser(data?.user));
        dispatch(setAuth(data?.isAuthenticated));
      } else if (isError) {
        dispatch(clearUser());
      }
  }, [data, isError]);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<OpenRoute><Register /></OpenRoute>} />
          <Route path="/verify-otp" element={<OpenRoute><VerifyOTP /></OpenRoute>} />
          <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />
          <Route path="/forget-password" element={<OpenRoute><ForgetPassword /></OpenRoute>} />
          <Route path="/reset-password/:token" element={<OpenRoute><ResetPassword /></OpenRoute>} />
          <Route path="/dashboard" element={<PrivateRoute allowedRoles={['user']}><UserDashboard/></PrivateRoute>}/>
          <Route path="/admin/dashboard" element={<PrivateRoute allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>}/>
          <Route path="/cart" element={<PrivateRoute allowedRoles={['user']}><Cart /></PrivateRoute>}/>
          <Route path="/profile" element={<PrivateRoute allowedRoles={['user', 'admin']}><Profile /></PrivateRoute>}/>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
