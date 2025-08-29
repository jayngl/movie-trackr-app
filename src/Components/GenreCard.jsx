import React, { useEffect, useState } from "react";

const GenreCard = ({ genre, allGenres, type = "slider" }) => {
  const [genreName, setGenreName] = useState("");
  const handleGenres = (id) => {
    return allGenres
      ?.filter((genre) => {
        return genre.genre_id === id;
      })
      .map((items) => {
        return items.genre;
      });
  };

  useEffect(() => {
    setGenreName(handleGenres(genre));
  }, [genre]);
  return (
    <div className="text-white font-bold">
      {type === "slider" ? (
        <div className="px-2 py-1  bg-[rgba(255,255,255,0.2)]  rounded-[.7rem]">
          {genreName}
        </div>
      ) : (
        <div className=" bg-[rgba(255,255,255,0.2)] text-[clamp(.5rem,3vw,.6rem)] whitespace-nowrap  rounded-[.7rem]">
          {genreName}
        </div>
      )}
    </div>
  );
};

export default GenreCard;
