import React from "react";
import { Link } from "react-router-dom";

const PublisherCard = ({ id, title, img }) => {
  return (
    <Link
      to={`/publishers/${id}`}
      className="border rounded-[.7rem] relative overflow-hidden  lg:w-full h-[300px] hover:translate-y-[-10px] transition-transform hover:ease-in-out hover:duration-400"
    >
      <div
        className=" bg-white w-full h-full px-4  border bg-no-repeat bg-contain bg-center cursor-pointer"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${img})`,
        }}
      >
        <h1 className="font-bold w-full  text-[clamp(.8rem,3vw,.9rem)] absolute bottom-2 text-black">
          {title}
        </h1>
      </div>
    </Link>
  );
};

export default PublisherCard;
