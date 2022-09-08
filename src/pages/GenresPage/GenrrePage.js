import axios from "axios";
import { useEffect, useState } from "react";
import Pagination2 from "../../components/Pagination/Pagination";
import LocalSearch from "../../components/Search/LocalSearch";
import SingleData from "../../components/SingleData/SingleData";
import Myloader from "react-spinners/ClipLoader";
import { css } from "@emotion/react";
import Genre from "../../components/Genres/Genre";
import useGenre from "../../components/Genres/UseGenre";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const Movies = () => {
  const [treadingContent, setTreadingContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [filterGenre, setFilterGenre] = useState([]);

  let [color, setColor] = useState("#ffffff");
  const genreforURL = useGenre(filterGenre);

  const fetchMovieApi = async () => {
    const { data } = await axios.get(
      ` 
      https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${page}&language=en-US&sort_by=popularity.desc&with_genres=${genreforURL}
      `
    );

    // eslint-disable-next-line
    setTreadingContent(data.results);
    // eslint-disable-next-line
    setNumOfPages(100);
    setIsLoading(true);
  };

  useEffect(() => {
    window.scroll(0, 0);

    fetchMovieApi();

    return () => {
      setTreadingContent();
    };
    // eslint-disable-next-line
  }, [page, isLoading, genreforURL]);

  return (
    <>
      <div
        style={{ marginTop: "0px", color: "white" }}
        className="TreadingHome"
      >
        <h3>Movies</h3>
      </div>

      <div className="all__genres ">
        <Genre
          media="movie"
          setFilterGenre={setFilterGenre}
          filterGenre={filterGenre}
          setTreadingContent={setTreadingContent}
          setPage={setPage}
          page={page}
        />
      </div>

      <div className="pag">
        <Pagination2
          setPage={setPage}
          numOfPages={numOfPages}
          media="movies"
          page={page}
          setIsLoading={setIsLoading}
          searchTerm={searchTerm}
          style={{ marginBottom: "10px" }}
        />
      </div>

      <div className="ListContent">
        {isLoading && treadingContent ? (
          treadingContent.map((n) => (
            <SingleData key={n.id} {...n} mediaType="movie" />
          ))
        ) : (
          // <ReactBootStrap.Spinner animation="border" variant="danger" />
          <div className="loading" style={{ height: "400px" }}>
            <Myloader color={color} size={80} />
          </div>
        )}
        {/* {treadingContent &&
          treadingContent.map((n) => (
            <SingleData key={n.id} {...n} mediaType="movie" />
          ))} */}

        {searchTerm && !treadingContent && <h2>NO Series Found </h2>}
      </div>
      <Pagination2
        setPage={setPage}
        numOfPages={numOfPages}
        media="movies"
        searchTerm={searchTerm}
        setIsLoading={setIsLoading}
        page={page}
      />
    </>
  );
};

export default Movies;
