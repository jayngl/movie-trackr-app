import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FaStar,
  FaLanguage,
  FaCheck,
  FaCalendar,
  FaXmark,
} from "react-icons/fa6";
import GenreCard from "../Components/GenreCard";
import PublisherCard from "../Components/PublisherCard";
import ActorCard from "../Components/ActorCard";
import Spinner from "../Components/Spinner";
import RateCard from "../Components/RateCard";
import useSingleMovie from "../Custom/useSingleMovie";
import useWatchedList from "../Custom/useWatchedList";
import { toast } from "react-toastify";

const SingleMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isWatched, setIsWatched] = useState(false);
  const { isMovieWatched, addToWatched, removeFromWatched } = useWatchedList();
  const { isLoading, data, getMovie } = useSingleMovie();

  // Fetch movie details
  useEffect(() => {
    getMovie(parseInt(id));
  }, [id]);

  // Check if movie is watched
  const check = async () => {
    const result = await isMovieWatched(id);

    setIsWatched(result);
  };
  useEffect(() => {
    check();
  }, [id, isWatched]);

  // Handle Add/Remove Watched
  const handleClick = async () => {
    try {
      if (!isWatched) {
        const success = await addToWatched(id);
        if (success.added) {
          setIsWatched(true);
          toast.success("Movie added to watched list");
        }
      } else {
        const success = await removeFromWatched(id);
        if (success.removed) {
          setIsWatched(false);
          toast.info("Movie removed from watched list");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
      navigate("/login");
    }
  };

  return (
    <div className="text-white w-full min-h-screen relative top-0   bg-black">
      {isLoading ? (
        <Spinner loading={isLoading} />
      ) : data?.movie?.length === 0 ? (
        <h1 className="min-h-full w-full">No Details found</h1>
      ) : (
        <div className="min-h-screen w-full">
          {/* Movie Section */}
          {data?.movie?.map((movie) => {
            const {
              movie_id,
              movie_title,
              movie_description,
              movie_img,
              vote_average,
              movie_language,
              movie_genre,
              movie_backdrop,
              release_date,
            } = movie;

            return (
              <section
                className="relative text-white min-h-screen"
                key={movie_id}
              >
                <div className="absolute w-full h-full top-0 gradient"></div>
                <div
                  className="w-full h-[500px] bg-center bg-cover bg-no-repeat"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie_backdrop})`,
                  }}
                >
                  <div className="absolute left-2 lg:left-[10%] z-30 flex justify-center items-start flex-col gap-y-4 top-15 lg:top-20 px-3 py-3 max-w-[40rem]">
                    <h1 className="text-[clamp(1.2rem,3vw,2rem)] font-bold">
                      {movie_title}
                    </h1>

                    <div className="flex justify-center text-[clamp(.6rem,3vw,1.2rem)] gap-x-5 gap-y-2 items-start flex-col w-full font-bold">
                      <div className="flex justify-center items-center gap-x-3">
                        <div className="border px-2 py-1 rounded-[.7rem] flex justify-center items-center">
                          {vote_average} <FaStar className="ml-2" />
                        </div>
                        <div className="bg-[rgba(255,255,255,0.2)] px-2 py-1 rounded-[.7rem] flex justify-center items-center">
                          {movie_language.toUpperCase()}{" "}
                          <FaLanguage className="ml-2" />
                        </div>
                        <div className="bg-[rgba(255,255,255,0.2)] px-2 py-1 rounded-[.7rem] flex justify-center items-center">
                          {new Date(release_date).getFullYear()}{" "}
                          <FaCalendar className="ml-2" />
                        </div>
                      </div>

                      <div className="flex justify-center items-center gap-x-3">
                        {data?.genres &&
                          movie_genre?.map((genre, index) => (
                            <GenreCard
                              genre={genre}
                              key={index}
                              allGenres={data.genres}
                            />
                          ))}
                      </div>
                    </div>

                    <p className="text-[clamp(.8rem,3vw,1.1rem)]">
                      {movie_description}
                    </p>

                    <div className="flex justify-center items-center gap-x-3">
                      My Rating:{" "}
                      <div className="flex justify-center items-center text-[1.5rem] gap-x-2">
                        <RateCard movieId={id} isWatched={isWatched} />
                      </div>
                    </div>

                    <div
                      className="flex justify-center cursor-pointer items-center w-full gap-x-3"
                      onClick={handleClick}
                    >
                      <div
                        className={`flex w-full justify-center items-center ${
                          isWatched
                            ? "bg-red-700"
                            : "bg-[rgba(255,255,255,0.2)]"
                        } hover:brightness-95 rounded-[.7rem] px-3 py-3`}
                      >
                        {isWatched ? (
                          <FaXmark className="border border-red-500 text-black rounded-full p-1 text-[1.3rem] mr-2 bg-white font-bold" />
                        ) : (
                          <FaCheck className="border border-red-500 text-black rounded-full p-1 text-[1.3rem] mr-2 bg-white font-bold" />
                        )}
                        <span className="text-[clamp(.9rem,3vw,1.2rem)]">
                          {isWatched ? "Remove from Watched" : "Add As Watched"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="w-[200px] hidden lg:block h-[300px] absolute right-[10%] rounded-[.7rem] top-42 bg-center bg-cover bg-no-repeat"
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie_img})`,
                  }}
                ></div>
              </section>
            );
          })}

          {/* Actors Section */}
          <h1 className="w-full ml-5 mt-32 text-[1.7rem]">Top Actors</h1>
          <section className="w-full mt-10 grid items-center lg:grid-cols-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-3 justify-center">
            {isLoading ? (
              <Spinner loading={isLoading} />
            ) : (
              data?.actors?.map((actor) => {
                const { actor_id, actor_name, actor_character, actor_img } =
                  actor;
                return (
                  <ActorCard
                    key={actor_id}
                    id={actor_id}
                    title={actor_name}
                    img={actor_img}
                    type="actors"
                    rating={actor_character}
                  />
                );
              })
            )}
          </section>

          {/* Publishers Section */}
          <h1 className="w-full ml-5 mt-5 text-[1.7rem]">Publisher/s</h1>
          <section className="w-full mt-10 grid items-center lg:grid-cols-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-3 justify-center">
            {isLoading ? (
              <Spinner loading={isLoading} />
            ) : (
              data?.publishers?.map((publisher) => {
                const { publisher_id, logo, publisher_name } = publisher;
                return (
                  <PublisherCard
                    key={publisher_id}
                    id={publisher_id}
                    title={publisher_name}
                    img={logo}
                  />
                );
              })
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default SingleMovie;
