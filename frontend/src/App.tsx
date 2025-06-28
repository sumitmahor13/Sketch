import { lazy, Suspense, useEffect } from "react";
import type { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loader from "./components/common/Loader";
import OpenRoute from "./routes/OpenRoute";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import { useCheckAuthQuery } from "./feature/auth/authApi";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "./feature/auth/authSlice";
const Home = lazy(() => import("./pages/Home"));
const Register: FC = lazy(() => import("./pages/Register"));
const Login: FC = lazy(() => import("./pages/Login"));

function App() {
  const dispatch = useDispatch();
  const { data, isLoading, isError } = useCheckAuthQuery();

    useEffect(() => {
      if (data?.user) {
        dispatch(setUser(data?.user));
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
          <Route path="/login" element={<OpenRoute><Login /></OpenRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
