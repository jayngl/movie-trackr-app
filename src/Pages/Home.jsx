import React, { useState, useEffect } from "react";
import useHome from "../Custom/useHome";
import ImageSlide from "../Components/ImageSlider";
import CardWrappers from "../Components/CardWrappers";
import { HiDotsHorizontal } from "react-icons/hi";
import Spinner from "../Components/Spinner";
import { Link } from "react-router-dom";
import MovieCard from "../Components/MovieCard";

const Home = () => {
  const {
    isLoading,
    data,
    getHomeData,
    getAiRecommendations,
    aiRecommendations,
    isRecLoading,
  } = useHome();

  useEffect(() => {
    getHomeData();
    getAiRecommendations();
  }, []);

  return (
    <section className=" w-full  min-h-screen flex justify-center items-center flex-col">
      {isLoading ? (
        <Spinner loading={isLoading} />
      ) : Object.entries(data).length === 0 ? (
        <div className="text-white text-[clamp(1rem,3vw,1.3rem)]">
          Nothing was found
        </div>
      ) : (
        <>
          <ImageSlide
            slideImages={data?.movies}
            genres={data?.genres}
            isLoading={isLoading}
          />
          <div className="bg-[#121212] w-[90%] flex justify-center items-center flex-col">
            {/* ai rec */}
            <div className="lg:px-2 flex justify-center items-center flex-col w-full">
              <div className="flex justify-between items-center px-4 py-5 w-full text-white">
                <h1 className="text-[clamp(.8rem,3vw,1.5rem)] font-bold">
                  Ai Recommendations
                </h1>
                <Link
                  to={"/watched"}
                  className="flex justify-center items-center"
                >
                  <HiDotsHorizontal className="text-[2rem] hover:text-red-500 cursor-pointer" />
                </Link>
              </div>
              <div className="w-full grid lg:grid-cols-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-3 justify-center mb-10">
                {isRecLoading ? (
                  <div className="w-screen flex justify-center items-center">
                    <Spinner loading={isRecLoading} />
                  </div>
                ) : aiRecommendations.length === 0 ? (
                  <h1 className="text-white  w-[100vw]">
                    No Recommendations Yet
                  </h1>
                ) : (
                  aiRecommendations?.map((movie) => (
                    <MovieCard
                      key={movie.movie_id}
                      id={movie.movie_id}
                      title={movie.movie_title}
                      img={movie.movie_img}
                      type={"movies"}
                      rating={movie.vote_average}
                    />
                  ))
                )}
              </div>
            </div>

            {/* movies */}
            <div className="lg:px-2 flex justify-center items-center flex-col w-full">
              <div className="flex justify-between items-center px-4 py-5 w-full text-white">
                <h1 className="text-[clamp(.8rem,3vw,1.5rem)] font-bold">
                  Movies
                </h1>
                <Link
                  to={"/movies"}
                  className="flex justify-center items-center"
                >
                  <HiDotsHorizontal className="text-[2rem] hover:text-red-500 cursor-pointer" />
                </Link>
              </div>

              <CardWrappers data={data} type={"movies"} />
            </div>

            {/* actors */}
            <div className="lg:px-4 w-full">
              <div className="flex justify-between items-center px-4 py-5 text-white">
                <h1 className="text-[clamp(.8rem,3vw,1.5rem)] font-bold ">
                  Actors
                </h1>
                <Link
                  to={"/actors"}
                  className="flex justify-center items-center"
                >
                  <HiDotsHorizontal className="text-[2rem] hover:text-red-500 cursor-pointer" />
                </Link>
              </div>

              <CardWrappers data={data} type={"actors"} />
            </div>
            {/* companies */}
            <div className="lg:px-4 pb-10 w-full">
              <div className="flex justify-between items-center px-4 py-5 text-white">
                <h1 className="text-[clamp(.8rem,3vw,1.5rem)] font-bold ">
                  Companies
                </h1>
                <Link
                  to={"/publishers"}
                  className="flex justify-center items-center"
                >
                  <HiDotsHorizontal className="text-[2rem] hover:text-red-500 cursor-pointer" />
                </Link>
              </div>

              <CardWrappers data={data} type={"companies"} />
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Home;
