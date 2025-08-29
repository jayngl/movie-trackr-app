import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const useWatchedList = () => {
  const url = "https://movie-trackr-28ca8d8b6755.herokuapp.com/user";
  const token = JSON.parse(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  // get user watched list
  const getWatchedList = async () => {
    try {
      const res = await axios.get(url + "/watchedList", {
        headers: {
          authorization: token,
        },
      });

      // console.log(res.status);
      setData(res.data);
    } catch (error) {
      if (error.response.status === 401) {
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // check if movie is in watched list
  const isMovieWatched = async (id) => {
    const res = await axios.get(`${url}/isWatched/${id}`, {
      headers: { authorization: token },
    });
    return res.data;
  };

  const addToWatched = async (id) => {
    try {
      const res = await axios.post(
        `${url}/addMovie`,
        { id },
        { headers: { authorization: token } }
      );
      return res.data;
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeFromWatched = async (id) => {
    try {
      const res = await axios.delete(`${url}/removeMovie`, {
        data: { id },
        headers: { authorization: token },
      });
      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const addMovieRating = async (rating, movieId) => {
    try {
      const res = await axios.patch(
        `${url}/rateMovie`,
        { rating: rating, id: movieId },
        {
          headers: { authorization: token },
        }
      );

      toast(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const getMovieRating = async (movieId) => {
    try {
      const res = await axios.get(`${url}/movieRating/${movieId}`, {
        headers: { authorization: token },
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getWatchedList,
    isLoading,
    data,
    isMovieWatched,
    addToWatched,
    removeFromWatched,
    addMovieRating,
    getMovieRating,
  };
};

export default useWatchedList;
