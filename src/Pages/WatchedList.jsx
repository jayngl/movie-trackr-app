import React, { useEffect, useState } from "react";
import useWatchedList from "../Custom/useWatchedList";
import MovieCard from "../Components/MovieCard";
import Spinner from "../Components/Spinner";

const WatchedList = () => {
  const { getWatchedList, isLoading, data } = useWatchedList();

  useEffect(() => {
    getWatchedList();
    console.log(data);
  }, [isLoading]);

  return (
    <section className="text-white pt-24 relative min-h-screen  w-full flex justify-center items-center flex-col">
      {isLoading ? (
        <Spinner loading={isLoading} />
      ) : Object.entries(data).length === 0 ? (
        "No Watched Movies Yet"
      ) : (
        <>
          <h1 className="my-5 text-[clamp(1rem,3vw,1.2rem)]">
            My Watched List
          </h1>

          <div className="w-full grid lg:grid-cols-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-3 justify-center mb-10">
            {data?.result?.map((movie) => (
              <MovieCard
                key={movie.movie_id}
                id={movie.movie_id}
                title={movie.movie_title}
                img={movie.movie_img}
                type={"movies"}
                genre={movie.movie_genre}
                rating={movie.vote_average}
                isWatched={true}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default WatchedList;
