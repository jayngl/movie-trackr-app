import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const usePublishers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page"));
  const limit = parseInt(searchParams.get("limit"));
  const searchQuery = searchParams.get("q");

  const getPublisherData = async () => {
    try {
      const res = await axios.get(
        "https://movie-trackr-28ca8d8b6755.herokuapp.com/publishers",
        {
          params: {
            q: searchQuery,
            page: Number.isInteger(page) ? page : 1,
            limit: Number.isInteger(limit) ? limit : 20,
          },
        }
      );

      setData(res.data);
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
        delete params.q;
      } else {
        params.q = searchString.trim();
      }
      params.page = 1; // reset page
      return params;
    });
  };

  useEffect(() => {
    getPublisherData();
  }, [searchParams]);

  return {
    isLoading,
    data,
    getPublisherData,
    page,
    limit,
    goToPage,
    setSearch,
  };
};

export default usePublishers;
