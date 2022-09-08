import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Genres.css";

const Genre = ({
  media,
  setFilterGenre,
  setPage,
  genreTitle,
  setGenreTitle,
  setTreadingContent,
  treadingContent,
  handleRedirect,
}) => {
  const [getGenre, setGetGenre] = useState([]);
  const navigate = useHistory();
  // let location = useLocation();

  const fetchGenres = async () => {
    try {
      if (media) {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/genre/${media}/list?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        );
        // eslint-disable-next-line
        setGetGenre(data.genres);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleFilter = (genre) => {
    setFilterGenre([genre]);
    setPage(1);
    setGenreTitle(genre);
    if (media === "tv") {
      navigate.push(`/${media}=series${genre.id}-Category`);
    } else if (media === "movie") {
      navigate.push(`/${media}-${genre.name}-Category`);
    } else if (!media) {
      navigate.push("/all-movies");
    }
  };

  useEffect(() => {
    fetchGenres();
    return () => {
      setGetGenre();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="dropdown" style={{ position: "relative " }}>
        <Link
          className="btn btn-secondary dropdown-toggle mybtn"
          to="#"
          role="button"
          id="dropdownMenuLink"
          data-toggle="dropdown"
          aria-expanded="false"
        >
          Filter By:{" "}
        </Link>

        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          <div className="title__genre">Categories</div>

          <div className="category__content">
            <p className="dropdown-item3" onClick={handleFilter}>
              all {media === "movie" ? "Movies" : "Tv series"}
            </p>
            {getGenre &&
              getGenre.map((genre) => (
                <p
                  key={genre.id}
                  onClick={() => handleFilter(genre)}
                  className="dropdown-item2"
                >
                  {genre.name}
                </p>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Genre;
