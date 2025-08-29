import React, { useEffect, useState } from "react";
import { Slide } from "react-slideshow-image";
import { Link } from "react-router-dom";
import "react-slideshow-image/dist/styles.css";
import { FaInfo, FaStar, FaLanguage, FaCalendar } from "react-icons/fa6";
import Spinner from "./Spinner";
import GenreCard from "./GenreCard";

const spanStyle = {
  padding: "0 10px",
  color: "#ffff",
  position: "absolute",
  bottom: "2rem",
  maxWidth: "40rem",
};

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "cover",
  minHeight: "100vh",
  position: "relative",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

const ImageSlider = ({ slideImages, genres, isLoading }) => {
  return (
    <div className="slide-container w-full">
      {slideImages && slideImages.length > 0 ? (
        <Slide
          duration={3000}
          transitionDuration={500}
          autoplay={true}
          arrows={true}
          infinite={true}
        >
          {isLoading ? (
            <Spinner loading={isLoading} />
          ) : (
            slideImages.map((slideImage, index) => (
              <div key={index}>
                <div
                  style={{
                    ...divStyle,
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${slideImage.movie_backdrop})`,
                  }}
                >
                  <span
                    style={spanStyle}
                    className="z-30 flex left-0 w-full lg:left-[35px] justify-center items-start flex-col gap-y-4"
                  >
                    <h1 className="text-[clamp(1.6rem,3vw,2rem)] font-bold">
                      {slideImage.movie_title}
                    </h1>

                    <div className="flex justify-center gap-x-5 gap-y-2 items-start flex-col w-full font-bold">
                      <div className="flex justify-center items-center gap-x-3">
                        <div className="border px-2 py-1 rounded-[.7rem] flex justify-center items-center">
                          {slideImage.vote_average} <FaStar className="ml-2" />
                        </div>
                        <div className=" bg-[rgba(255,255,255,0.2)] px-2 py-1 rounded-[.7rem] flex justify-center items-center">
                          {slideImage.movie_language.toUpperCase()}{" "}
                          <FaLanguage className="ml-2" />
                        </div>
                        <div className=" bg-[rgba(255,255,255,0.2)] px-2 py-1 rounded-[.7rem] flex justify-center items-center">
                          {new Date(slideImage.release_date).getFullYear()}
                          <FaCalendar className="ml-2" />
                        </div>
                      </div>

                      <div className="flex justify-center items-center gap-x-2 text-[clamp(.6rem,3vw,1rem)]">
                        {genres &&
                          slideImage.movie_genre?.map((genre, index) => {
                            return (
                              <GenreCard
                                genre={genre}
                                key={index}
                                allGenres={genres}
                              />
                            );
                          })}
                      </div>
                    </div>
                    <p className="text-[clamp(.9rem,3vw,1.1rem)]">
                      {slideImage.movie_description.length > 216
                        ? slideImage.movie_description.substring(0, 216) + "..."
                        : slideImage.movie_description}
                    </p>
                    <div className="flex justify-center items-center text-[clamp(.8rem,3vw,1.1rem)] w-full gap-x-1 lg:gap-x-3 font-bold">
                      <Link
                        to={`/movies/${slideImage.movie_id}`}
                        className=" w-full"
                      >
                        <div className="flex justify-center items-center lg:flex-row flex-col  bg-red-900 hover:brightness-95 rounded-[.7rem] lg:px-3 lg:py-3 py-1">
                          <FaInfo className="border rounded-full p-1  mr-2 bg-[rgba(255,255,255,0.2)] font-bold" />
                          <span className="">Read More</span>
                        </div>
                      </Link>
                    </div>
                  </span>
                  <div
                    className="w-[200px] h-[300px] absolute z-50 right-30 bottom-10 bg-red-100 bg-center lg:block hidden bg-no-repeat bg-cover shadow-2xl rounded-[.7rem]"
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/original${slideImage.movie_img})`,
                    }}
                  ></div>
                </div>
                <div className="w-full h-[21rem] gradient absolute bottom-0"></div>
              </div>
            ))
          )}
        </Slide>
      ) : (
        <Spinner loading={isLoading} />
      )}
    </div>
  );
};

export default ImageSlider;
