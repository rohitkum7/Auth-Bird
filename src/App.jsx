import { useEffect, useState } from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import LoginPage from "./app/login/page";
import Main from "./app/main/page";
import { Navigate, Route, Routes } from "react-router-dom";
import SignupPage from "./app/signup/page";
import HomePage from "./app/home/Home";
import { useAuthStore } from "./store/store";
import ForgotPasswordPage from "./app/forgotPassword/page";
import ResetPasswordPage from "./app/resetPassword/page";

function App() {
  const { isCheckingAuth, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route
            path="forgot-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route path="resetPassword" element={<ForgotPasswordPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
