import React, { useState, useEffect } from "react";
import Card from "./Card";
import PublisherCard from "../Components/PublisherCard";

const CardWrappers = ({ data, type }) => {
  // rendering display cards by type
  const conditionRenderer = (type) => {
    if (type === "movies") {
      return data.movies.slice(5, 10).map((item) => {
        const { movie_id, movie_title, movie_img, vote_average, movie_genre } =
          item;
        return (
          <Card
            key={movie_id}
            id={movie_id}
            title={movie_title}
            img={movie_img}
            genre={movie_genre}
            genreNames={data.genres}
            rating={vote_average}
            type="movies"
          />
        );
      });
    } else if (type === "actors") {
      return data.actors.slice(5, 10).map((item) => {
        const { actor_id, actor_name, actor_img } = item;
        return (
          <Card
            key={actor_id}
            id={actor_id}
            title={actor_name}
            img={actor_img}
            type="actors"
          />
        );
      });
    } else {
      return data.companies.map((item) => {
        const { publisher_id, publisher_name, logo } = item;
        return (
          <PublisherCard
            key={publisher_id}
            id={publisher_id}
            title={publisher_name}
            img={logo}
          />
        );
      });
    }
  };
  return (
    <div className="w-full grid lg:grid-cols-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 px-5 gap-3 justify-center mb-10">
      {Object.entries(data).length === 0
        ? "Nothing was found"
        : conditionRenderer(type)}
    </div>
  );
};

export default CardWrappers;
