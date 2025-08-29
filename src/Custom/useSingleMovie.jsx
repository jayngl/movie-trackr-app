import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const useSingleMovie = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const getMovie = async (id) => {
    try {
      const res = await axios.get(
        `https://movie-trackr-28ca8d8b6755.herokuapp.com/movies/${id}`
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

  return { isLoading, data, getMovie };
};

export default useSingleMovie;
