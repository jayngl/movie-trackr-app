import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import React from "react";
import { ToastContainer } from "react-toastify";

const Mainlayout = () => {
  return (
    <div className="w-screen min-h-screen min-w-[20rem] xWide:max-w-[75rem] relative xWide:mx-auto bg-[#121212]">
      <Header />
      <ToastContainer />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Mainlayout;
