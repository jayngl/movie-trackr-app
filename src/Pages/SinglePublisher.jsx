import React, { useEffect, useState } from "react";
import useSinglePublisher from "../Custom/useSinglePublisher";
import { useParams } from "react-router-dom";
import Spinner from "../Components/Spinner";
import MovieCard from "../Components/MovieCard";

const SinglePublisher = () => {
  const { id } = useParams();

  const { isLoading, data, getSinglePublisherData } = useSinglePublisher();

  useEffect(() => {
    getSinglePublisherData(id);
  }, [id]);
  return (
    <section className="text-white bg-black w-full min-h-screen flex justify-start flex-col items-center">
      {isLoading ? (
        <Spinner loading={isLoading} />
      ) : data.length === 0 ? (
        <h1 className="mt-20 h-screen w-full flex justify-center items-center text-[clamp(1rem,3vw,1.3rem)]">
          Nothing was found
        </h1>
      ) : (
        <div className="w-full">
          <div className="w-full">
            <div
              className="w-full h-[400px] relative  bg-center bg-no-repeat bg-contain bg-white"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${data[0].logo})`,
              }}
            ></div>
            <h1 className="w-full text-center my-3 text-[1.7rem]">
              {data[0].publisher_name}
            </h1>
          </div>{" "}
          <div className="w-full mt-10 grid items-center lg:grid-cols-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-3 justify-center">
            {data[0].movies.map((movie) => {
              const {
                movie_id,
                movie_genre,
                movie_title,
                vote_average,
                movie_img,
              } = movie;
              return (
                <MovieCard
                  key={movie_id}
                  id={movie_id}
                  title={movie_title}
                  img={movie_img}
                  genreNames={data[1]}
                  type={"movies"}
                  genre={movie_genre}
                  rating={vote_average}
                />
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
};

export default SinglePublisher;
