import React, { useEffect, useState } from "react";
import PublisherCard from "../Components/PublisherCard";
import usePublishers from "../Custom/usePublishers";
import { FaMagnifyingGlass, FaCaretRight, FaCaretLeft } from "react-icons/fa6";
import Spinner from "../Components/Spinner";
import { useSearchParams } from "react-router-dom";

const Publishers = () => {
  const {
    isLoading,
    data,
    getPublisherData,
    page,
    limit,
    goToPage,
    setSearch,
  } = usePublishers();

  useEffect(() => {
    getPublisherData();
    console.log(data);
  }, [page, limit]);

  const [numPages, setNumPages] = useState(0);
  const pages = Array.from({ length: numPages }, (_, index) => index + 1);

  useEffect(() => {
    if (data?.count?.[0]?.["COUNT(*)"]) {
      setNumPages(Math.ceil(data.count[0]["COUNT(*)"] / 20));
    }
  }, [data]);

  // search
  const [searchString, setSearchString] = useState("");
  const [debouncedString, setDebouncedString] = useState("");
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

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
    <section className="text-white w-full min-h-screen flex justify-center items-center flex-col">
      <div className=" w-full   flex justify-center items-center my-10 px-4 mt-[9rem]">
        <div className="lg:w-[30%] outline-1 w-full px-4 flex justify-center items-center border rounded-[.7rem]">
          <input
            type="text"
            className="w-full py-2 outline-0"
            placeholder="search publishers..."
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
      <div className="min-h-screen w-full flex justify-center items-center">
        {isLoading ? (
          <div className="w-[90%] min-h-screen ">
            <Spinner loading={isLoading} />
          </div>
        ) : Object.entries(data).length !== 0 ? (
          <div className="w-[90%] grid items-center min-h-screen lg:grid-cols-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-3 justify-center mb-10">
            {data?.results?.map((item) => {
              const { publisher_id, publisher_name, logo } = item;
              return (
                <PublisherCard
                  key={publisher_id}
                  id={publisher_id}
                  title={publisher_name}
                  img={logo}
                />
              );
            })}
          </div>
        ) : (
          <h1 className="w-screen  flex justify-center items-start text-[clamp(1rem,3vw,1.3rem)] min-h-screen">
            Nothing was found
          </h1>
        )}
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
        <div className=" justify-center items-center gap-x-4 hidden lg:flex">
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

export default Publishers;
