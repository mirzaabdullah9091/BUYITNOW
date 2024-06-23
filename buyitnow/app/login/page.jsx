import Login from "@/components/auth/Login";
import React from "react";
import { Suspense } from "react";
const LoginPage = () => {
  return   <Suspense>
  <Login />
  </Suspense>;
};

export default LoginPage;