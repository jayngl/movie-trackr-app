import React from "react";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-full min-h-[10rem] mt-10 py-5 text-white  gap-y-5 flex justify-center items-center flex-col bg-red-900">
      <div className="flex justify-center items-center text-[2rem] gap-x-8">
        <a
          href="https://github.com/jayngl"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="hover:scale-125 transition-all  duration-500 hover:text-black" />
        </a>
        <a
          href="https://www.linkedin.com/in/jordain-crosse-7525021a1/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {" "}
          <FaLinkedin className="hover:scale-125 transition-all  duration-500 hover:text-black" />
        </a>

        <a
          href="https://jordain-crosse.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGlobe className="hover:scale-125 transition-all  duration-500 hover:text-black" />
        </a>
      </div>
      <div className="flex justify-center items-center gap-x-10 lg:flex-row flex-col gap-y-5">
        <Link to={"/"} className="hover:underline">
          Home
        </Link>
        <Link to={"/movies"} className="hover:underline">
          Movies
        </Link>
        <Link to={"/publishers"} className="hover:underline">
          Publishers
        </Link>
        <Link to={"/actors"} className="hover:underline">
          Actors
        </Link>
        <Link to={"/mylist"} className="hover:underline">
          My List
        </Link>
      </div>
      <div className="w-full text-[clamp(.8rem,3vw,1.2rem)] text-center">
        Designed and developed by: Jordain Crosse | 2025
      </div>
    </div>
  );
};

export default Footer;
