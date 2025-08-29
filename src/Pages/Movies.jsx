import React, { useEffect, useState } from "react";
import useMovies from "../Custom/useMovies";
import MovieCard from "../Components/MovieCard";
import Spinner from "../Components/Spinner";
import { useSearchParams } from "react-router-dom";
import { MdTheaterComedy } from "react-icons/md";
import { MdAnimation } from "react-icons/md";
import { GiFilmProjector } from "react-icons/gi";
import { GiDramaMasks } from "react-icons/gi";
import { MdFamilyRestroom } from "react-icons/md";
import { RiKnifeBloodFill } from "react-icons/ri";
import { PiDetectiveFill } from "react-icons/pi";
import { TbUfo } from "react-icons/tb";
import { LuSwords } from "react-icons/lu";
import { RiCactusFill } from "react-icons/ri";

import {
  FaMagnifyingGlass,
  FaCaretRight,
  FaCaretLeft,
  FaFilter,
  FaSquareXmark,
  FaGlobe,
  FaHandFist,
  FaCompass,
  FaGhost,
  FaGun,
  FaWandMagicSparkles,
  FaHourglass,
  FaMusic,
  FaHeart,
  FaSkull,
} from "react-icons/fa6";

const Movies = () => {
  const {
    isLoading,
    data,
    getMoviesData,
    page,
    limit,
    goToPage,
    setSearch,
    setGenre,
  } = useMovies();
  const [numPages, setNumPages] = useState(0);
  const pages = Array.from({ length: numPages }, (_, index) => index + 1);

  const [showFilterOptions, setShowFilterOptions] = useState(false);
  // const [genreIcon, setGenreIcon] = useState(null);

  const getGenreIcon = (genre) => {
    let genreIcon = "";
    switch (genre) {
      case "all":
        genreIcon = <FaGlobe />;
        break;

      case "Adventure":
        genreIcon = <FaHandFist />;
        break;

      case "Fantasy":
        genreIcon = <FaWandMagicSparkles />;
        break;

      case "Animation":
        genreIcon = <MdAnimation />;
        break;

      case "Drama":
        genreIcon = <GiDramaMasks />;
        break;

      case "Horror":
        genreIcon = <FaGhost />;
        break;

      case "Action":
        genreIcon = <FaGun />;
        break;

      case "Comedy":
        genreIcon = <MdTheaterComedy />;
        break;

      case "History":
        genreIcon = <FaHourglass />;
        break;

      case "Western":
        genreIcon = <RiCactusFill />;
        break;

      case "Thriller":
        genreIcon = <FaSkull />;
        break;

      case "Crime":
        genreIcon = <RiKnifeBloodFill />;
        break;

      case "Documentary":
        genreIcon = <GiFilmProjector />;
        break;

      case "Science Fiction":
        genreIcon = <TbUfo />;
        break;

      case "Mystery":
        genreIcon = <PiDetectiveFill />;
        break;

      case "Music":
        genreIcon = <FaMusic />;
        break;

      case "Romance":
        genreIcon = <FaHeart />;
        break;

      case "Family":
        genreIcon = <MdFamilyRestroom />;
        break;

      case "War":
        genreIcon = <LuSwords />;
        break;
    }
    return genreIcon;
  };

  // search
  const [searchString, setSearchString] = useState("");
  const [debouncedString, setDebouncedString] = useState("");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    getMoviesData();
  }, [page, limit]);

  useEffect(() => {
    if (data?.count?.[0]?.["COUNT(*)"]) {
      setNumPages(Math.ceil(data.count[0]["COUNT(*)"] / 20));
    }
  }, [data]);

  // implemented debouncing for querying db
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedString(searchString);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchString]);

  useEffect(() => {
    setSearch(debouncedString);
  }, [debouncedString]);

  return (
    <section className="text-white relative min-h-screen  w-full flex justify-center items-center flex-col">
      <div className=" w-full  gap-x-5 flex justify-center flex-row items-center my-10 px-4 mt-[9rem]">
        <div
          className="lg:w-[30%] w-full px-2 outline-1 flex justify-center items-center border rounded-[.7rem]"
          role="search"
          tabIndex={0}
        >
          <input
            type="text"
            className="w-[90%] py-2 outline-0"
            placeholder="search movie..."
            value={searchString}
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
          />{" "}
          <FaMagnifyingGlass
            className="text-[1.5rem] cursor-pointer ml-2  w-[10%]"
            onClick={() => {
              setSearch(searchString);
            }}
          />
        </div>

        <FaFilter
          className="text-[1.5rem] cursor-pointer"
          onClick={() => {
            setShowFilterOptions(!showFilterOptions);
          }}
        />
      </div>
      <div className="flex justify-center  items-start w-full min-h-screen">
        <div
          className={` w-full lg:w-[20%] rounded-[.7rem] bg-red-900 h-full  ${
            showFilterOptions ? "block" : "hidden"
          }   fixed left-0 z-30 top-[85px] text-white`}
        >
          <div className="w-full flex justify-end items-center pr-5 py-2">
            <FaSquareXmark
              className="text-[1.7rem]"
              onClick={() => {
                setShowFilterOptions(false);
              }}
            />
          </div>
          <div
            className={`flex h-[500px] justify-start w-full overflow-y-scroll  py-3 gap-y-5  items-center flex-col    gap-x-3 `}
          >
            <div className=" font-bold flex justify-center items-center gap-x-2">
              Genres <FaFilter />
            </div>
            <h1
              className="w-full flex justify-center items-center hover:bg-white hover:text-red-900 cursor-pointer py-4 "
              onClick={() => {
                setGenre("all");
              }}
            >
              <span className="text-left w-[50%]">
                {getGenreIcon("all")}All
              </span>
            </h1>
            {data?.genres?.map((genre) => (
              <h1
                key={genre.genre_id}
                className="w-full flex justify-center items-center  hover:bg-white hover:text-red-900 cursor-pointer py-4 "
                onClick={() => {
                  setGenre(genre.genre_id);
                }}
              >
                <span className="text-left w-[50%] block">
                  {getGenreIcon(genre.genre)} {genre.genre}
                </span>
              </h1>
            ))}
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          {isLoading ? (
            <div className="w-full ">
              <Spinner loading={isLoading} />
            </div>
          ) : Array.isArray(data?.results) && data.results.length > 0 ? (
            <div className="w-[90%] min-h-screen grid items-center lg:grid-cols-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-3 justify-center mb-10">
              {data?.results?.map((item) => {
                const {
                  movie_id,
                  movie_title,
                  movie_img,
                  vote_average,
                  movie_genre,
                } = item;
                return (
                  <MovieCard
                    key={movie_id}
                    id={movie_id}
                    title={movie_title}
                    img={movie_img}
                    genre={movie_genre}
                    genreNames={data?.genres}
                    rating={vote_average}
                    type={"movies"}
                  />
                );
              })}
            </div>
          ) : (
            <h1 className="w-[90vw] justify-center text-[clamp(1rem,3vw,1.3rem)] items-center flex h-full text-center">
              {" "}
              Nothing found for:{" "}
              <span className="text-red-500   ml-5 mb-1"> {query}</span>
            </h1>
          )}
        </div>
      </div>
      <div className="flex text-white justify-evenly items-center w-full">
        <div
          className="bg-red-900 flex justify-center items-center hover:brightness-125 px-5 py-1 rounded-[.7rem] cursor-pointer "
          onClick={() => {
            goToPage(data.prevous.page);
          }}
        >
          <FaCaretLeft /> prev
        </div>
        <div className="lg:flex justify-center items-center gap-x-4 hidden">
          {pages.map((num, index) => (
            <span
              key={index}
              className="bg-red-900 px-5 py-1 rounded-[.7rem] cursor-pointer  hover:brightness-125"
              onClick={() => {
                goToPage(num);
              }}
            >
              {num}
            </span>
          ))}
        </div>
        <div
          className="bg-red-900  flex justify-center items-center hover:brightness-125 px-5 py-1 rounded-[.7rem] cursor-pointer "
          onClick={() => {
            goToPage(data.next.page <= 5 ? data.next.page : 5);
          }}
        >
          next <FaCaretRight />
        </div>
      </div>
    </section>
  );
};

export default Movies;
