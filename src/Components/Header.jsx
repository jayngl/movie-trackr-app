import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBars, FaClipboardList, FaXmark } from "react-icons/fa6";
import { RiMovie2AiFill } from "react-icons/ri";
import logo from "/movie_trackr_logo.svg";

const Header = () => {
  const activeLink = ({ isActive }) => {
    return isActive
      ? "bg-red-900 px-2 py-1 rounded-[.7rem]"
      : "px-2 py-1 hover:text-red-900 border-white border rounded-[.7rem] bg-[rgba(255,255,255,0.2)]";
  };

  const [showNav, setShowNav] = useState(false);

  return (
    <section className="bg-transparent flippedGradient absolute top-0  z-50 transition-colors duration-500 text-white font-bold w-full px-3  lg:px-4 py-3 flex justify-between lg:justify-evenly  items-center">
      <Link to="/" className="" title="home">
        <div
          className="  w-14 h-14 hover:brightness-75 "
          role="button"
          tabIndex={0}
        >
          <img src={logo} alt="logo" className="w-full h-full" />
        </div>
      </Link>

      <div className="lg:flex justify-center items-center gap-x-10 hidden ">
        <NavLink to="/movies" className={activeLink}>
          Movies
        </NavLink>
        <NavLink to="/publishers" className={activeLink}>
          Publishers
        </NavLink>
        <NavLink to="/actors" className={activeLink}>
          Actors
        </NavLink>
      </div>

      <div
        className={`justify-center w-full lg:hidden top-0 gap-y-5 text-center py-4 fixed bg-red-900 items-center flex-col gap-x-10 ${
          showNav ? "flex" : "hidden"
        } `}
      >
        <FaXmark
          onClick={() => {
            setShowNav(false);
          }}
        />
        <NavLink
          to="/movies"
          className={
            "w-full  hover:text-red-100 hover:border-white py-5  hover:bg-[rgba(255,255,255,0.2)]"
          }
        >
          Movies
        </NavLink>
        <NavLink
          to="/publishers"
          className={
            " w-full  hover:text-red-100 hover:border-white py-5  hover:bg-[rgba(255,255,255,0.2)]"
          }
        >
          Publishers
        </NavLink>
        <NavLink
          to="/actors"
          className={
            "w-full  hover:text-red-100 hover:border-white py-5  hover:bg-[rgba(255,255,255,0.2)]"
          }
        >
          Actors
        </NavLink>
      </div>

      <Link
        to="/watched"
        className=" text-[1rem] flex justify-center items-center hover:text-red-900 hover:translate-y-[-2px] transition-transform border-white border rounded-[.7rem] bg-[rgba(255,255,255,0.2)] p-1 "
      >
        <FaClipboardList title="watched-list" className="mr-1" />
        My List
      </Link>
      {/* </div> */}
      <FaBars
        className=" lg:hidden text-[1.4rem] cursor-pointer"
        onClick={() => {
          setShowNav(!showNav);
        }}
      />
    </section>
  );
};

export default Header;
