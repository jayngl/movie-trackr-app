import React from "react";
import { Link } from "react-router-dom";
import GenreCard from "./GenreCard";
import { FaStar } from "react-icons/fa6";
import person from "/person.svg";

const ActorCard = ({ id, title, img, type, rating }) => {
  const image =
    img === null ? person : `https://image.tmdb.org/t/p/original${img}`;
  return (
    <Link to={`/${type}/${id}`}>
      <div
        className=" w-full md:max-w-[300px] relative h-[300px] hover:translate-y-[-10px] transition-transform hover:ease-in-out hover:duration-400 drop-shadow-2xl rounded-[.7rem] bg-no-repeat bg-cover bg-center cursor-pointer"
        style={{
          backgroundImage: `url(${image})`,
        }}
      >
        <div className="absolute bottom-0 w-full gradient h-[30%] gap-y-2 flex justify-center items-start flex-col">
          <div className="flex justify-between items-center flex-col w-full">
            <h1 className="text-white ">{title}</h1>
            <div className="text-white font-bold text-[clamp(.8rem,3vw,.9rem)] flex justify-center items-center bg-[rgba(255,255,255,0.2)] border rounded-[.7rem] p-0.5">
              {rating} <FaStar />
            </div>
          </div>
          <div className="flex text-[.7rem] rounded-[.7rem] gap-x-1 justify-center items-center mb-3"></div>
        </div>
      </div>
    </Link>
  );
};

export default ActorCard;
