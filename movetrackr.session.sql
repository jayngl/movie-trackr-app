--@block

CREATE TABLE User(
    users_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    user_password VARCHAR(60) NOT NULL,
    user_email VARCHAR(255) UNIQUE NOT NULL
    
)

--@block

CREATE TABLE Watched_Movies(
    watched_id INT PRIMARY KEY AUTO_INCREMENT,
    users_id INT,
    movie_id INT ,
    personal_rating INT,
    date_added DATE,
    FOREIGN KEY(movie_id) REFERENCES Movies(movie_id),
    FOREIGN KEY(users_id) REFERENCES User(users_id)

)

--@block


CREATE TABLE Movies(
    movie_id INT PRIMARY KEY,
    movie_title TEXT,
    movie_description TEXT,
    movie_img TEXT,
    popularity DECIMAL(8,2),
    release_date DATE,
    vote_average DECIMAL(3,1),
    movie_language VARCHAR(3),
    movie_genre JSON,
    movie_backdrop TEXT,
    movie_production TEXT,
    movie_runtime INT

)

--@block


CREATE TABLE Genres(
    genre_id INT PRIMARY KEY,
    genre TEXT
)

CREATE TABLE Movie_Casts(
    movie_id INT ,
    actor_id INT ,
    actor_name TEXT,
    actor_job TEXT,
    actor_popularity DECIMAL(8,2),
    actor_character VARCHAR(255),
    actor_img TEXT,
    FOREIGN KEY(movie_id) REFERENCES Movies(movie_id),
    FOREIGN KEY(actor_id) REFERENCES Actors(actor_id),
    PRIMARY KEY(movie_id, actor_id)
    
)


CREATE TABLE Actors(
    actor_id INT PRIMARY KEY,
    actor_img TEXT,
    actor_name VARCHAR(255),
    known_for TEXT
)


CREATE TABLE Movie_Publisher(
    publisher_id INT,
    movie_id INT,
    PRIMARY KEY (movie_id, publisher_id),
    FOREIGN KEY (publisher_id) REFERENCES Publishers (publisher_id),
    FOREIGN KEY (movie_id) REFERENCES Movies (movie_id)
    
)

CREATE TABLE Publishers(
    publisher_id INT  PRIMARY KEY,
    headquarters TEXT,
    homepage TEXT,    
    logo  TEXT,
    publisher_name TEXT,
    country VARCHAR(2)
)



--@block

ALTER TABLE movies 
DROP COLUMN movie_production,
DROP COLUMN movie_runtime;


--@block
SELECT movie_id  FROM movies; 

--@block

CREATE TABLE actor_details(
    actor_id INT PRIMARY KEY,
    actor_name VARCHAR(255),
    biography TEXT,
    birthday DATE,
    place_of_birth TEXT,
    popularity DECIMAL(5,3),
    profile_path TEXT,

    FOREIGN KEY (actor_id) REFERENCES actors(actor_id)
)

--@block

ALTER TABLE Movie_Casts 
DROP actor_popularity,
DROP actor_job;

--@block

ALTER TABLE publishers 
ADD UNIQUE(publisher_id);

--@block
ALTER TABLE publishers
DROP COLUMN headquarters,
DROP COLUMN homepage;

--@block
SELECT * 
FROM actor_details 
WHERE actor_id = 116