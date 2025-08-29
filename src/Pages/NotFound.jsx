import React from "react";
import { Link } from "react-router-dom";
import { FaFaceSadCry } from "react-icons/fa6";

const NotFound = () => {
  return (
    <div className="w-full bg-black text-white min-h-screen  gap-y-4  flex justify-center items-center flex-col">
      <h1 className="text-[clamp(1rem,3vw,2rem)]">Opps</h1>
      <FaFaceSadCry className="text-[5rem] text-red-900" />
      <h1 className="text-[clamp(1rem,3vw,2rem)]">Page Not Found</h1>
      <Link
        to={"/"}
        className="text-[clamp(1rem,3vw,1.1rem)] bg-red-900 hover:brightness-150 text-white px-5 py-2 rounded-[.7rem] cursor-pointer"
      >
        Go Back
      </Link>
    </div>
  );
};

export default NotFound;
