import React, { useEffect } from "react";
import useSingleActor from "../Custom/useSingleActor";
import { useParams } from "react-router-dom";
import actors_bg from "/actors_bg.jpg";
import { FaStar } from "react-icons/fa6";
import Spinner from "../Components/Spinner";
import MovieCard from "../Components/MovieCard";

const SingleActor = () => {
  const { id } = useParams();
  const { isLoading, data, getActor } = useSingleActor();

  useEffect(() => {
    getActor(id);
    console.log(data);
  }, [id]);
  return (
    <section className="text-white w-full min-h-screen">
      {isLoading ? (
        <Spinner loading={isLoading} />
      ) : Object.entries(data).length !== 0 ? (
        <div>
          <div
            className="h-[30rem] w-full relative bg-center bg-cover bg-no-repeat"
            style={{ backgroundImage: `url(${actors_bg})` }}
          >
            <div className="w-full h-[20rem] rotate-180 bottom-0 flippedGradient absolute"></div>
            <div
              className=" w-full lg:w-[300px] h-[400px] rounded-[.7rem] bg-center bg-contain bg-no-repeat absolute  top-[80%] right-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${data?.results?.profile_path})`,
              }}
            ></div>
          </div>
          <div className="mt-32 flex justify-center items-center flex-col px-10">
            <h1 className="text-[clamp(1rem,3vw,1.8rem)]">
              {data?.results?.actor_name}
            </h1>
            <div className="flex font-bold gap-y-3 text-[clamp(.7rem,3vw,.9rem)] py-4 w-full lg:max-w-[70%] justify-center items-center flex-col lg:flex-row gap-x-10">
              <h2 className="border w-full text-center  bg-[rgba(255,255,255,0.2)] rounded-[.7rem] px-2">
                Place of birth: {data?.results?.place_of_birth}
              </h2>
              <h2 className="border w-full text-center bg-[rgba(255,255,255,0.2)] rounded-[.7rem] px-2 flex justify-center items-center">
                Popularity: {data?.results?.popularity}
                <FaStar className="ml-3" />
              </h2>
            </div>
            <p className="text-[clamp(1rem,3vw,1.3rem)] max-w-[60rem]">
              {data?.results?.biography}
            </p>
          </div>
          <h1 className="ml-10 text-[clamp(1.1rem,3vw,1.7rem)] my-5">Movies</h1>
          <div className="w-[90%]  grid items-center lg:grid-cols-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-3 justify-center my-10">
            {data?.movies?.length === 0 ? (
              <h1>nothing found</h1>
            ) : (
              data?.movies?.map((movie) => (
                <MovieCard
                  key={movie.movie_id}
                  id={movie.movie_id}
                  title={movie.movie_title}
                  img={movie.movie_img}
                  type={"movies"}
                  genre={movie.movie_genre}
                  rating={movie.vote_average}
                  genreNames={data?.genres}
                />
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="w-screen  min-h-screen  flex justify-center items-center">
          <h1 className="text-[clamp(1rem,3vw,1.3rem)]">Nothing was Found</h1>
        </div>
      )}
    </section>
  );
};

export default SingleActor;
