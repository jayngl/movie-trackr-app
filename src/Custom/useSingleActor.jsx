import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const useSingleActor = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  const getActor = async (id) => {
    try {
      const res = await axios.get(
        `https://movie-trackr-28ca8d8b6755.herokuapp.com/actors/${id}`
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

  return { isLoading, data, getActor };
};

export default useSingleActor;
