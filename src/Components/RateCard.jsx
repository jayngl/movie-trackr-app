import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { FaStar } from "react-icons/fa6";
import useWatchedList from "../Custom/useWatchedList";
import { toast } from "react-toastify";
const RateCard = ({ movieId, isWatched }) => {
  const [value, setValue] = useState(0);
  const [rateCount, setRateCount] = useState(0);

  const { addMovieRating, getMovieRating } = useWatchedList();

  const fetchUserRating = async () => {
    // check if user is authorized
    const userRating = await getMovieRating(movieId);
    setRateCount(userRating);
    setValue(userRating);
  };

  useEffect(() => {
    fetchUserRating();
  }, [movieId, isWatched]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Rating
        name="ten-star-rating"
        value={value}
        max={10} // 10 stars
        onChange={async (event, rating) => {
          setRateCount((prev) => prev + 1);

          if (rateCount > 0) {
            toast("You can only rate once");
            return;
          }
          setValue(rating);
          await addMovieRating(rating, movieId);
          toast(`You rated ${rating} stars!`);
        }}
        icon={<FaStar style={{ color: "#FFD700" }} />} // gold star
        emptyIcon={<FaStar style={{ color: "#ccc" }} />} // grey empty star
        size="large"
      />
    </div>
  );
};

export default RateCard;
