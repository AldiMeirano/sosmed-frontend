import { Route, Routes } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import LandingPage from "./pages/Landing";
import Login from "./pages/Login";
import Navbar from "./Components/Navbar";
import NotFound from "./pages/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./redux/slices/userSlice";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "./utils/Url";
import { Profiler } from "react";
import Profile from "./pages/Profile";
import OtherProfile from "./pages/OtherProfile";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const keepLogin = async () => {
    const token = localStorage.getItem("rano_tweet");
    if (token) {
      const { data } = await axios.get(baseUrl + "/users/keeplogin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(loginAction(data.data));
    }
  };
  useEffect(() => {
    keepLogin();
  }, []);
  return (
    <>
      <Navbar />
      <Routes>
        {!user.id ? (
          <>
            <Route element={<Register />} path="/register" />
            <Route element={<Login />} path="/login" />
          </>
        ) : null}
        {user?.id ? <Route element={<Profile />} path="/profile" /> : null}
        <Route element={<OtherProfile />} path="/profile/:id" />
        <Route element={<LandingPage />} path="/" />
        <Route element={<NotFound />} path="*" />
      </Routes>
    </>
  );
}

export default App;
