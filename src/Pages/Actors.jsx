import React, { useEffect, useState } from "react";
import useActors from "../Custom/useActors";
import Spinner from "../Components/Spinner";
import ActorCard from "../Components/ActorCard";
import { useSearchParams } from "react-router-dom";
import { FaMagnifyingGlass, FaCaretLeft, FaCaretRight } from "react-icons/fa6";

const Actors = () => {
  const { isLoading, data, getActorsData, page, limit, goToPage, setSearch } =
    useActors();

  useEffect(() => {
    getActorsData();
    console.log(data);
  }, [isLoading]);

  const [numPages, setNumPages] = useState(5);
  const pages = Array.from({ length: numPages }, (_, index) => index + 1);

  // search
  const [searchString, setSearchString] = useState("");
  const [debouncedString, setDebouncedString] = useState("");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  useEffect(() => {
    getActorsData();
  }, [page, limit]);

  useEffect(() => {
    // really janky but works...
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
    <section className="text-white min-h-screen w-full flex justify-center items-center flex-col">
      <div className=" w-full   flex justify-center items-center my-10 px-4 mt-[9rem]">
        <div className="lg:w-[30%] outline-1 w-full px-4 flex justify-center items-center border rounded-[.7rem]">
          <input
            type="text"
            className="w-full py-2 outline-0"
            placeholder="search actors..."
            value={searchString}
            onChange={(e) => {
              setSearchString(e.target.value);
            }}
          />{" "}
          <FaMagnifyingGlass
            className="text-[1.5rem] mx-2"
            onClick={() => {
              setSearch(searchString);
            }}
          />
        </div>
      </div>
      <div className="w-full flex justify-center items-start min-h-screen">
        {isLoading ? (
          <div className="w-[90vw] ">
            <Spinner loading={isLoading} />
          </div>
        ) : Object.entries(data).length === 0 ? (
          <h1 className="text-[clamp(1rem,3vw,1.3rem)]">Nothing was found</h1>
        ) : (
          <div className="w-[90%] grid items-center lg:grid-cols-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-3 gap-y-4 justify-center mb-10">
            {data?.results?.map((item) => {
              const { actor_id, actor_name, actor_img } = item;
              return (
                <ActorCard
                  key={actor_id}
                  id={actor_id}
                  title={actor_name}
                  img={actor_img}
                  type="actors"
                />
              );
            })}
          </div>
        )}
      </div>

      <div className="flex text-white justify-evenly items-center w-screen">
        <div
          className="bg-red-900 flex justify-center items-center hover:brightness-125 px-5 py-1 rounded-[.7rem] cursor-pointer "
          onClick={() => {
            goToPage(data.previous.page);
          }}
        >
          <FaCaretLeft /> prev
        </div>
        <div className="lg:flex justify-center items-center gap-x-4 hidden ">
          {pages.map((num, index) => {
            if (index === 0 || index === pages.length - 1) {
              return (
                <span
                  key={index}
                  className="bg-red-900 px-5 py-1 rounded-[.7rem] cursor-pointer  hover:brightness-125"
                  onClick={() => {
                    goToPage(num);
                  }}
                >
                  {num}
                </span>
              );
            }
          })}
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

export default Actors;
