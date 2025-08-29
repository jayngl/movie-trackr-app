import React, { useState } from "react";
import axios from "axios";

const useSinglePublisher = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const getSinglePublisherData = async (id) => {
    try {
      const res = await axios.get(
        `https://movie-trackr-28ca8d8b6755.herokuapp.com/publishers/${id}`
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, data, getSinglePublisherData };
};

export default useSinglePublisher;
