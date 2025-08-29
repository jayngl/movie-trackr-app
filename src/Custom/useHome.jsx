import React, { useState } from "react";
import axios from "axios";

const useHome = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [isRecLoading, setIsRecLoading] = useState(true);

  const token = JSON.parse(localStorage.getItem("token"));

  const getHomeData = async () => {
    try {
      const res = await axios.get(
        "https://movie-trackr-28ca8d8b6755.herokuapp.com/"
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getAiRecommendations = async () => {
    try {
      const res = await axios.get(
        `https://movie-trackr-28ca8d8b6755.herokuapp.com/user/getAiRecommendations`,
        {
          headers: {
            authorization: token,
          },
        }
      );

      setAiRecommendations(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsRecLoading(false);
    }
  };

  return {
    isLoading,
    data,
    getHomeData,
    getAiRecommendations,
    aiRecommendations,
    isRecLoading,
  };
};

export default useHome;
