import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/movie_trackr_logo.svg";
import useLogin from "../Custom/useLogin";
import { FaEye } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { loginUser, serverError } = useLogin();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("password");

  const handleDisplayPassword = () => {
    if (showPassword === "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();
    const success = await loginUser(password, email);

    if (success) {
      navigate("/");
    }
  };
  return (
    <section className="w-full xWide:max-w-[75rem] xWide:mx-auto text-white  min-w-[20rem] lg:min-w-0  min-h-screen bg-[black] flex justify-center items-center overflow-x-hidden ">
      <div className="relative w-full lg:w-[50%]  min-h-screen  flex justify-start items-center flex-col p-5 bg-[url(public/login-graphic.png)] lg:bg-none bg-cover bg-no-repeat  bg-center">
        <div className="absolute w-full h-full lg:hidden block bg-black opacity-[.7] top-0"></div>
        <div className="flex justify-start items-center text-[1.4rem] w-full  relative z-40">
          <img src={logo} alt="logo" className="w-14 h-14" />
          <h1 className="ml-3">Movie Trackr</h1>
        </div>

        {/* form */}
        <div className=" w-full h-full flex justify-center items-center flex-col lg:px-10 relative z-40">
          <div className="w-full">
            <h1 className="text-[clamp(1rem,3vw,1.6rem)] font-bold">
              Welcome Back
            </h1>
            <h2 className="text-[clamp(.8rem,3vw,1rem)] text-gray-400">
              Enter your details
            </h2>
          </div>
          <form
            className="flex justify-center items-center flex-col w-full gap-y-2 my-5 "
            onSubmit={handleForm}
          >
            <p className="text-red-500 w-full text-left">{serverError}</p>
            <div className="w-full">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className={`border border-gray-400 w-full outline-0 py-3 px-3 rounded-[.7rem] `}
                placeholder="johnbrown1@gmail.com"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="w-full">
              <label htmlFor="password">Password</label>
              <div className={`flex justify-center items-center relative `}>
                <input
                  type={showPassword}
                  name="password"
                  id="password"
                  className={`border border-gray-400 w-full outline-0 py-3 px-3 rounded-[.7rem] `}
                  value={password}
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    handleDisplayPassword();
                  }}
                  className="absolute z-20 right-5 cursor-pointer"
                  type="button"
                >
                  <FaEye />
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-red-900 font-semibold hover:brightness-95 cursor-pointer py-3 rounded-[.7rem] text-[clamp(.8rem,3vw,1.1rem)]"
            >
              Login In
            </button>
            <h1>
              Don't have an account?{" "}
              <Link to={"/register"} className="text-red-900">
                Login
              </Link>
            </h1>
            <Link to="/">Am just looking around</Link>
          </form>
        </div>
      </div>
      <div
        className={`w-[50%] justify-center items-center h-[100vh] relative  hidden lg:flex bg-cover bg-no-repeat  bg-center bg-[url(public/login-graphic.png)]`}
      >
        <div className="absolute top-[30%] flex justify-center z-40 text-white items-center flex-col max-w-[35rem]">
          <h1 className="text-[3.5rem] font-bold text-center  ">
            Keep Up with fellow movie Lovers!
          </h1>
          <h2 className="text-white">
            Keep track of all your watched movies in one spot
          </h2>
        </div>

        <div className="absolute w-full h-full  top-0 bg-black opacity-[.5]"></div>
      </div>
    </section>
  );
};

export default Register;
