import { lazy, Suspense } from "react";
import type { FC } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loader from "./components/common/Loader";
const Home = lazy(() => import("./pages/Home"));
const Register: FC = lazy(() => import("./pages/Register"));
const Login: FC = lazy(() => import("./pages/Login"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
