import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page"));
  const limit = parseInt(searchParams.get("limit"));
  const searchQuery = searchParams.get("q");
  const genre = searchParams.get("genre");

  const getMoviesData = async () => {
    try {
      const res = await axios.get(
        `https://movie-trackr-28ca8d8b6755.herokuapp.com/movies`,
        {
          params: {
            q: searchQuery,
            page: Number.isInteger(page) ? page : 1,
            limit: Number.isInteger(limit) ? limit : 20,
            genre: genre,
          },
        }
      );

      const result = res.data === null ? {} : res.data;
      setData(result);
    } catch (error) {
      if (error.code === "ERR_NETWORK") {
        toast.error("aw snap! Resource not found, try again later");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const goToPage = (newPage) => {
    setSearchParams({ page: newPage, limit: 20 });
  };

  const setSearch = (searchString) => {
    setSearchParams((prev) => {
      const params = Object.fromEntries(prev.entries());
      if (searchString.trim() === "") {
        // Remove 'q' from URL when input is cleared
        delete params.q;
      } else {
        params.q = searchString.trim();
      }
      params.page = 1; // reset page
      return params;
    });
  };

  const setGenre = (genreID) => {
    setSearchParams({ genre: genreID });
  };
  useEffect(() => {
    getMoviesData();
  }, [searchParams]);
  return {
    isLoading,
    data,
    getMoviesData,
    page,
    limit,
    goToPage,
    setSearch,
    setGenre,
  };
};

export default useMovies;
