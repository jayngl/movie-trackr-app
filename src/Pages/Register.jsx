import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/movie_trackr_logo.svg";
import useRegister from "../Custom/useRegister";
import { FaEye } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { registerUser, serverError } = useRegister();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("password");
  let allErrors = [];

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const userRegex = /^(?=.*[0-9])(?=.*[^0-9]).+$/;

  const handleDisplayPassword = () => {
    if (showPassword === "password") {
      setShowPassword("text");
    } else {
      setShowPassword("password");
    }
  };

  const handleForm = async (e) => {
    allErrors = [];
    setUsernameError("");
    setPasswordError("");
    setEmailError("");
    e.preventDefault();
    if (username.length < 6 || username.length > 30) {
      setUsernameError(
        (prev) => (prev += `Username must be between 6 - 30 characters \n`)
      );

      allErrors.push("Username must be between 6 - 30 characters");
    }

    if (password.length < 8) {
      setPasswordError(`Password must be greater than 8 characters`);
      allErrors.push("Password must be greater than 8 characters");
    }

    if (!emailRegex.test(email)) {
      setEmailError(`Please enter Valid Email`);
      allErrors.push("Please enter Valid Email");
    }

    if (!userRegex.test(username)) {
      setUsernameError(
        (prev) =>
          (prev += `Username must contain a uneque character or a number \n`)
      );
      allErrors.push("Username must contain a uneque character or a number");
    }

    if (allErrors.length === 0) {
      const success = await registerUser(username, password, email);

      if (success) {
        navigate("/");
      }
      // console.log(allErrors, serverError);
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
            <h1 className="text-[clamp(1rem,3vw,1.6rem)] font-bold">Welcome</h1>
            <h2 className="text-[clamp(.8rem,3vw,1rem)] text-gray-400">
              Create an account
            </h2>
          </div>
          <form
            method={"post"}
            className="flex justify-center items-center flex-col w-full gap-y-2 my-5 "
            onSubmit={handleForm}
          >
            <p className="text-red-500 w-full text-left">{serverError}</p>

            <div className="w-full">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                className={`border  w-full outline-0 py-3 px-3 rounded-[.7rem] ${
                  username === ""
                    ? "border-gray-400"
                    : usernameError === ""
                    ? "border-green-500"
                    : "border-red-500"
                }`}
                placeholder="johnbrown1"
                value={username}
                required
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <pre className="text-red-500">{usernameError}</pre>
            </div>
            <div className="w-full">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                className={`border border-gray-400 w-full outline-0 py-3 px-3 rounded-[.7rem] ${
                  email === ""
                    ? "border-gray-400"
                    : emailError === ""
                    ? "border-green-500"
                    : "border-red-500"
                }`}
                placeholder="johnbrown1@gmail.com"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <pre className="text-red-500">{emailError}</pre>
            </div>
            <div className="w-full">
              <label htmlFor="password">Password</label>
              <div className={`flex justify-center items-center relative `}>
                <input
                  type={showPassword}
                  name="password"
                  id="password"
                  className={`border border-gray-400 w-full outline-0 py-3 px-3 rounded-[.7rem] ${
                    password === ""
                      ? "border-gray-400"
                      : passwordError === ""
                      ? "border-green-500"
                      : "border-red-500"
                  }`}
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
              <pre className="text-red-500">{passwordError}</pre>
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-red-900 font-semibold hover:brightness-95 cursor-pointer py-3 rounded-[.7rem] text-[clamp(.8rem,3vw,1.1rem)]"
            >
              Sign up
            </button>
            <h1>
              Already have an account?{" "}
              <Link to={"/login"} className="text-red-900">
                Login
              </Link>
            </h1>
          </form>
        </div>
      </div>
      <div
        className={`w-[50%] justify-center items-center h-[100vh] relative  hidden lg:flex bg-cover bg-no-repeat  bg-center bg-[url(public/login-graphic.png)]`}
        // style={{ backgroundImage: `url(${LoginBg})` }}
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
